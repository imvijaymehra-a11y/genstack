import { NextRequest, NextResponse } from 'next/server';
import { generateContentWithModel } from '@/lib/multi-ai';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const results = {
    timestamp: new Date().toISOString(),
    providers: {} as Record<string, any>,
    supabase: {} as any,
    summary: {
      total: 0,
      working: 0,
      failed: 0
    }
  };

  // Test all AI models
  const testModels = [
    { id: 'free-generator', name: 'Free Generator', provider: 'Local' },
    { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', provider: 'OpenAI' },
    { id: 'gpt-4', name: 'GPT-4', provider: 'OpenAI' },
    { id: 'claude-3-sonnet', name: 'Claude 3 Sonnet', provider: 'Anthropic' },
    { id: 'claude-3-opus', name: 'Claude 3 Opus', provider: 'Anthropic' },
    { id: 'gemini-pro', name: 'Gemini Pro', provider: 'Google' },
    { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash', provider: 'Google' },
    { id: 'llama-3-8b-8192', name: 'Llama 3 8B', provider: 'Groq' },
    { id: 'mixtral-8x7b-32768', name: 'Mixtral 8x7B', provider: 'Groq' },
    { id: 'gemma-2b-it-927', name: 'Gemma 2B', provider: 'Groq' }
  ];

  for (const model of testModels) {
    results.summary.total++;
    
    try {
      console.log(`Testing ${model.name}...`);
      const startTime = Date.now();
      
      const content = await generateContentWithModel(
        "Write a simple hello message in 10 words or less.",
        model.id,
        'test'
      );
      
      const responseTime = Date.now() - startTime;
      
      results.providers[model.id] = {
        name: model.name,
        provider: model.provider,
        status: 'working',
        content: content.substring(0, 100),
        responseTime: `${responseTime}ms`,
        error: null
      };
      
      results.summary.working++;
      console.log(`✅ ${model.name} - Working (${responseTime}ms)`);
      
    } catch (error) {
      results.providers[model.id] = {
        name: model.name,
        provider: model.provider,
        status: 'failed',
        content: null,
        responseTime: null,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
      
      results.summary.failed++;
      console.log(`❌ ${model.name} - Failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Test Supabase connection and configuration
  try {
    console.log('Testing Supabase connection...');
    
    // Test 1: Basic connection
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    );
    
    const startTime = Date.now();
    const { data, error } = await supabase.from('users').select('count').limit(1);
    const responseTime = Date.now() - startTime;
    
    if (error) {
      throw error;
    }
    
    // Test 2: Service role key
    const adminSupabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    );
    
    const { data: adminData, error: adminError } = await adminSupabase.from('users').select('count').limit(1);
    
    if (adminError) {
      throw adminError;
    }
    
    results.supabase = {
      status: 'working',
      connection: '✅ Connected',
      anonKey: '✅ Valid',
      serviceKey: '✅ Valid',
      responseTime: `${responseTime}ms`,
      error: null
    };
    
    console.log(`✅ Supabase - Working (${responseTime}ms)`);
    
  } catch (error) {
    results.supabase = {
      status: 'failed',
      connection: '❌ Failed',
      anonKey: '❌ Invalid or missing',
      serviceKey: '❌ Invalid or missing',
      responseTime: null,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
    
    console.log(`❌ Supabase - Failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }

  // Check environment variables
  const envCheck = {
    NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    OPENAI_API_KEY: !!process.env.OPENAI_API_KEY,
    ANTHROPIC_API_KEY: !!process.env.ANTHROPIC_API_KEY,
    GOOGLE_AI_API_KEY: !!process.env.GOOGLE_AI_API_KEY,
    GROQ_API_KEY: !!process.env.GROQ_API_KEY
  };

  results.environment = envCheck;

  // Generate recommendations
  const recommendations = [];
  
  if (results.summary.failed > 0) {
    recommendations.push(`${results.summary.failed} AI models failed. Check API keys and provider status.`);
  }
  
  if (results.supabase.status === 'failed') {
    recommendations.push('Supabase connection failed. Check your database configuration.');
  }
  
  if (!envCheck.OPENAI_API_KEY) {
    recommendations.push('OpenAI API key is missing. Add OPENAI_API_KEY to .env.local');
  }
  
  if (!envCheck.ANTHROPIC_API_KEY) {
    recommendations.push('Anthropic API key is missing. Add ANTHROPIC_API_KEY to .env.local');
  }
  
  if (!envCheck.GOOGLE_AI_API_KEY) {
    recommendations.push('Google AI API key is missing. Add GOOGLE_AI_API_KEY to .env.local');
  }
  
  if (!envCheck.GROQ_API_KEY) {
    recommendations.push('Groq API key is missing. Add GROQ_API_KEY to .env.local');
  }

  results.recommendations = recommendations;

  return NextResponse.json(results);
}
