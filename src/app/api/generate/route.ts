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
    // Handle both JSON and FormData requests
    const contentType = request.headers.get('content-type') || '';
    let toolSlug: string;
    let input: string = '';
    let modelId = 'gpt-3.5-turbo';
    let imageFile: File | undefined;

    console.log('Content-Type:', contentType);

    if (contentType.includes('multipart/form-data')) {
      // Handle file upload
      try {
        const formData = await request.formData();
        console.log('FormData received, entries:', formData.keys());
        
        toolSlug = formData.get('toolSlug') as string;
        input = formData.get('input') as string || '';
        modelId = formData.get('modelId') as string || 'gpt-3.5-turbo';
        imageFile = formData.get('file') as File | undefined;
        
        console.log('Parsed FormData - toolSlug:', toolSlug, 'input:', input, 'hasFile:', !!imageFile);
      } catch (formDataError) {
        console.error('FormData parsing error:', formDataError);
        return NextResponse.json(
          { error: 'Failed to parse form data. Please try again.' },
          { status: 400 }
        );
      }
    } else {
      // Handle JSON request
      try {
        const body = await request.json();
        toolSlug = body.toolSlug;
        input = body.input || '';
        modelId = body.modelId || 'gpt-3.5-turbo';
      } catch (jsonError) {
        console.error('JSON parsing error:', jsonError);
        return NextResponse.json(
          { error: 'Failed to parse request data. Please try again.' },
          { status: 400 }
        );
      }
    }

    // Validate input
    if (!toolSlug) {
      return NextResponse.json(
        { error: 'Tool slug is required' },
        { status: 400 }
      );
    }

    // For image tools that process existing images, file is required
    const imageProcessingTools = ['background-remover', 'image-enhancer'];
    if (imageProcessingTools.includes(toolSlug) && !imageFile) {
      return NextResponse.json(
        { error: 'Image file is required for this tool' },
        { status: 400 }
      );
    }

    // For AI image generator, prompt is required (not file)
    if (toolSlug === 'ai-image-generator' && !input) {
      return NextResponse.json(
        { error: 'Prompt is required for AI image generation' },
        { status: 400 }
      );
    }

    // For non-image tools, input is required
    if (!imageProcessingTools.includes(toolSlug) && !input) {
      return NextResponse.json(
        { error: 'Input is required' },
        { status: 400 }
      );
    }

    // Validate input length for text tools
    if (input && input.length > 10000) {
      return NextResponse.json(
        { error: 'Input too long. Maximum 10,000 characters allowed.' },
        { status: 400 }
      );
    }

    // Validate file size for image tools
    if (imageFile) {
      const maxSize = 15 * 1024 * 1024; // 15MB
      if (imageFile.size > maxSize) {
        return NextResponse.json(
          { error: 'File too large. Maximum 15MB allowed.' },
          { status: 400 }
        );
      }

      if (!imageFile.type.startsWith('image/')) {
        return NextResponse.json(
          { error: 'Invalid file type. Please upload an image.' },
          { status: 400 }
        );
      }
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
    const prompt = tool.prompt.replace('{input}', input || '');

    // Generate content using selected AI model
    const generatedContent = await generateContentWithModel(prompt, modelId, toolSlug, imageFile);

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
