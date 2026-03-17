import { NextRequest, NextResponse } from 'next/server';
import { getToolBySlug } from '@/lib/tools';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { toolSlug, input } = await request.json();

    if (!toolSlug || !input) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const tool = getToolBySlug(toolSlug);
    if (!tool) {
      return NextResponse.json(
        { success: false, error: 'Invalid tool' },
        { status: 400 }
      );
    }

    // Create prompt based on tool type
    let prompt = '';
    switch (toolSlug) {
      case 'blog-generator':
        prompt = `Generate a comprehensive blog post about: ${input}\n\nMake it engaging, informative, and well-structured with an introduction, body paragraphs, and conclusion. Include relevant examples and insights.`;
        break;
      case 'seo-title-generator':
        prompt = `Generate 10 SEO-optimized titles for: ${input}\n\nMake them catchy, include relevant keywords, and follow best practices for click-through rates. Format as a numbered list.`;
        break;
      case 'product-description-generator':
        prompt = `Generate compelling product descriptions for: ${input}\n\nFocus on benefits, features, and unique selling points. Make it persuasive and conversion-focused.`;
        break;
      case 'youtube-script-generator':
        prompt = `Generate a YouTube video script about: ${input}\n\nInclude an engaging hook, main content with key points, and a call-to-action. Format with timestamps for different sections.`;
        break;
      case 'ad-copy-generator':
        prompt = `Generate persuasive ad copy for: ${input}\n\nCreate multiple variations (headline, body, CTA) for different platforms. Make it compelling and action-oriented.`;
        break;
      default:
        prompt = `Generate high-quality content about: ${input}`;
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a professional content generator. Create high-quality, engaging, and well-structured content that meets the user\'s specific needs.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 2000,
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content || '';

    return NextResponse.json({
      success: true,
      content: content.trim(),
    });

  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to generate content. Please try again.' 
      },
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
