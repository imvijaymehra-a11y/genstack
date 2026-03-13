import { NextRequest, NextResponse } from 'next/server';
import { generateContent } from '@/lib/openai';
import { getToolBySlug } from '@/lib/tools';

export async function POST(request: NextRequest) {
  try {
    const { toolSlug, input } = await request.json();

    // Test 1: Check OpenAI API Key
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === '') {
      return NextResponse.json({
        error: 'OpenAI API key is missing',
        solution: 'Add OPENAI_API_KEY to .env.local'
      }, { status: 500 });
    }

    // Test 2: Check Tool
    const tool = getToolBySlug(toolSlug || 'blog-generator');
    if (!tool) {
      return NextResponse.json({
        error: 'Tool not found',
        availableTools: ['blog-generator', 'email-generator', 'social-media-post']
      }, { status: 404 });
    }

    // Test 3: Generate Content
    console.log('Testing OpenAI generation...');
    const testPrompt = tool.prompt.replace('{input}', input || 'test input');
    const generatedContent = await generateContent(testPrompt);

    return NextResponse.json({
      success: true,
      testResults: {
        apiKey: '✓ Present',
        tool: '✓ Found',
        generation: '✓ Working',
        toolName: tool.name,
        prompt: testPrompt,
        generatedContent: generatedContent.substring(0, 200) + '...'
      }
    });

  } catch (error) {
    console.error('Debug generation error:', error);
    
    return NextResponse.json({
      error: 'Generation test failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      troubleshooting: [
        'Check OpenAI API key is valid',
        'Check OpenAI billing/quota',
        'Check internet connection',
        'Verify OpenAI service status'
      ]
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'POST to test generation',
    usage: 'POST with { toolSlug: "blog-generator", input: "test content" }',
    environment: {
      hasOpenAIKey: !!process.env.OPENAI_API_KEY,
      openAIKeyLength: process.env.OPENAI_API_KEY?.length || 0
    }
  });
}
