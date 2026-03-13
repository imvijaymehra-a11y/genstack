import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getUserPlan, getUserUsage } from '@/lib/supabase';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      );
    }

    // Check user from auth
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Invalid token', details: authError?.message },
        { status: 401 }
      );
    }

    // Check user in database
    const userPlan = await getUserPlan(user.id);
    const userUsage = await getUserUsage(user.id);

    return NextResponse.json({
      success: true,
      auth: {
        id: user.id,
        email: user.email,
        created_at: user.created_at
      },
      database: {
        exists: !!userPlan,
        plan: userPlan,
        usage: userUsage
      }
    });

  } catch (error) {
    console.error('Debug auth error:', error);
    return NextResponse.json(
      { error: 'Debug failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Auth debug endpoint - POST with { token: "your-jwt-token" }',
    environment: {
      hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasSupabaseAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY
    }
  });
}
