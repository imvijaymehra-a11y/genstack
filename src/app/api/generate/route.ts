import { NextRequest, NextResponse } from 'next/server';
import { getToolBySlug } from '@/lib/tools';
import { generateContentWithModel } from '@/lib/multi-ai';
import { canUserGenerate, recordUsage, getUserPlan } from '@/lib/supabase';
import { createClient } from '@supabase/supabase-js';

// Rate limiting storage (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

// Rate limiting middleware
function checkRateLimit(userId: string, limit: number = 10): { allowed: boolean; resetTime?: number } {
  const now = Date.now();
  const userLimit = rateLimitStore.get(userId);
  
  if (!userLimit || now > userLimit.resetTime) {
    // Reset or create new limit
    rateLimitStore.set(userId, { count: 1, resetTime: now + 24 * 60 * 60 * 1000 });
    return { allowed: true };
  }
  
  if (userLimit.count >= limit) {
    return { allowed: false, resetTime: userLimit.resetTime };
  }
  
  userLimit.count++;
  return { allowed: true };
}

export async function POST(request: NextRequest) {
  try {
    const { toolSlug, input, modelId = 'gpt-3.5-turbo' } = await request.json();

    // Validate input
    if (!toolSlug || !input) {
      return NextResponse.json(
        { error: 'Tool slug and input are required' },
        { status: 400 }
      );
    }

    // Validate input length
    if (input.length > 10000) {
      return NextResponse.json(
        { error: 'Input too long. Maximum 10,000 characters allowed.' },
        { status: 400 }
      );
    }

    // Get the tool configuration
    const tool = getToolBySlug(toolSlug);
    if (!tool) {
      return NextResponse.json(
        { error: 'Tool not found' },
        { status: 404 }
      );
    }

    // Get user from session
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization required' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Invalid authentication' },
        { status: 401 }
      );
    }

    // Check database usage limits
    const { canGenerate, reason } = await canUserGenerate(user.id);
    if (!canGenerate) {
      // If user not found in database, create them immediately
      if (reason === 'User not found') {
        console.log('Creating missing user in database:', user.email);
        try {
          // Use regular client with user's token for RLS policies
          const userSupabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL || '',
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
            {
              global: {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              }
            }
          );
          
          // Try with user's token first (respects RLS)
          let insertError = null;
          try {
            const { error: userInsertError } = await userSupabase
              .from('users')
              .insert({
                id: user.id,
                email: user.email,
                plan: 'free',
                created_at: new Date().toISOString()
              });
            insertError = userInsertError;
          } catch (err) {
            insertError = err;
          }
          
          // If user token fails, try with service role
          if (insertError) {
            console.log('User token failed, trying service role...');
            const { createClient } = await import('@supabase/supabase-js');
            const adminSupabase = createClient(
              process.env.NEXT_PUBLIC_SUPABASE_URL || '',
              process.env.SUPABASE_SERVICE_ROLE_KEY || ''
            );
            
            const { error: adminInsertError } = await adminSupabase
              .from('users')
              .insert({
                id: user.id,
                email: user.email,
                plan: 'free',
                created_at: new Date().toISOString()
              });
            
            if (adminInsertError) {
              console.error('Admin insert failed:', adminInsertError);
              throw adminInsertError;
            }
          }
          
          console.log('User created successfully in database');
        } catch (createError) {
          console.error('Failed to create user:', createError);
          // Don't fail the request - continue with free model
          console.log('Continuing with free model due to user creation failure');
        }
      } else {
        return NextResponse.json(
          { error: reason || 'Usage limit exceeded' },
          { status: 429 }
        );
      }
    }

    // Get user's plan for rate limiting
    const userPlan = await getUserPlan(user.id) || 'free';
    const dailyLimit = userPlan === 'pro' ? 1000 : 10; // Pro users get higher rate limit
    const rateLimitCheck = checkRateLimit(user.id, dailyLimit);
    if (!rateLimitCheck.allowed) {
      const resetTime = new Date(rateLimitCheck.resetTime!);
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded. Please try again later.',
          resetTime: resetTime.toISOString()
        },
        { status: 429 }
      );
    }

    // Replace {input} placeholder in prompt
    const prompt = tool.prompt.replace('{input}', input);

    // Generate content using selected AI model
    const generatedContent = await generateContentWithModel(prompt, modelId, toolSlug);

    // Record usage
    try {
      await recordUsage(user.id, toolSlug);
    } catch (usageError) {
      console.error('Failed to record usage:', usageError);
      // Don't fail the request if usage recording fails
    }

    return NextResponse.json({
      success: true,
      content: generatedContent,
      tool: tool.name,
      usage: {
        tool: toolSlug,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Generation API Error:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
