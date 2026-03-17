import { NextRequest, NextResponse } from 'next/server';
import { getToolBySlug } from '@/lib/tools';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { toolSlug, input } = body;

    if (!toolSlug || !input) {
      return NextResponse.json(
        { error: 'Tool slug and input are required' },
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

    // Replace {input} placeholder in prompt
    const prompt = tool.prompt.replace('{input}', input);

    // Generate content using OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 2000,
      temperature: 0.7,
    });

    const generatedContent = completion.choices[0]?.message?.content || '';

    return NextResponse.json({
      success: true,
      content: generatedContent,
      tool: tool.name,
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
