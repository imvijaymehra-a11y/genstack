import { NextResponse } from 'next/server';

export async function GET() {
  const results = {
    timestamp: new Date().toISOString(),
    status: 'simple-test',
    message: 'Basic API test - checking environment variables',
    environment: {
      NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      OPENAI_API_KEY: !!process.env.OPENAI_API_KEY,
      ANTHROPIC_API_KEY: !!process.env.ANTHROPIC_API_KEY,
      GOOGLE_AI_API_KEY: !!process.env.GOOGLE_AI_API_KEY,
      GROQ_API_KEY: !!process.env.GROQ_API_KEY
    },
    apiKeys: {
      openai: process.env.OPENAI_API_KEY ? 'Present' : 'Missing',
      anthropic: process.env.ANTHROPIC_API_KEY ? 'Present' : 'Missing',
      google: process.env.GOOGLE_AI_API_KEY ? 'Present' : 'Missing',
      groq: process.env.GROQ_API_KEY ? 'Present' : 'Missing'
    },
    recommendations: []
  };

  // Add recommendations based on what's missing
  if (!process.env.OPENAI_API_KEY) {
    results.recommendations.push('Add OPENAI_API_KEY to .env.local');
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    results.recommendations.push('Add ANTHROPIC_API_KEY to .env.local');
  }
  if (!process.env.GOOGLE_AI_API_KEY) {
    results.recommendations.push('Add GOOGLE_AI_API_KEY to .env.local');
  }
  if (!process.env.GROQ_API_KEY) {
    results.recommendations.push('Add GROQ_API_KEY to .env.local');
  }

  // Check if all API keys are present
  const allKeysPresent = 
    process.env.OPENAI_API_KEY &&
    process.env.ANTHROPIC_API_KEY &&
    process.env.GOOGLE_AI_API_KEY &&
    process.env.GROQ_API_KEY;

  results.summary = {
    allKeysPresent,
    totalProviders: 4,
    readyProviders: results.apiKeys.openai === 'Present' ? 1 : 0 +
                      results.apiKeys.anthropic === 'Present' ? 1 : 0 +
                      results.apiKeys.google === 'Present' ? 1 : 0 +
                      results.apiKeys.groq === 'Present' ? 1 : 0
  };

  return NextResponse.json(results);
}
