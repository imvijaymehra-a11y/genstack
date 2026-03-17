import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: 'API is working',
    timestamp: new Date().toISOString(),
    env: {
      hasOpenAI: !!process.env.OPENAI_API_KEY,
      hasGroq: !!process.env.GROQ_API_KEY,
      hasAnthropic: !!process.env.ANTHROPIC_API_KEY,
      hasGemini: !!process.env.GOOGLE_GEMINI_API_KEY,
    }
  });
}

export async function POST(request: NextRequest) {
  try {
    const { test } = await request.json();
    
    return NextResponse.json({
      success: true,
      message: 'Test endpoint working',
      received: test
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
