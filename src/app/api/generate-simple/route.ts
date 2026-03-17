import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { toolSlug, input } = await request.json();

    if (!toolSlug || !input) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create prompt based on tool type
    let prompt = '';
    switch (toolSlug) {
      case 'blog-generator':
        prompt = `Write a comprehensive blog post about: ${input}. Include an engaging title, introduction, main content with headings, and conclusion. Make it informative and well-structured.`;
        break;
      case 'seo-title-generator':
        prompt = `Generate 10 SEO-optimized titles for: ${input}. Make them catchy, include relevant keywords, and follow best practices for click-through rates. Format as a numbered list.`;
        break;
      case 'product-description-generator':
        prompt = `Write compelling product descriptions for: ${input}. Focus on benefits, features, and unique selling points. Make it persuasive and conversion-focused.`;
        break;
      case 'youtube-script-generator':
        prompt = `Create a YouTube video script about: ${input}. Include an engaging hook, main content with key points, and a call-to-action. Format with timestamps for different sections.`;
        break;
      case 'ad-copy-generator':
        prompt = `Generate persuasive ad copy for: ${input}. Create multiple variations (headline, body, CTA) for different platforms. Make it compelling and action-oriented.`;
        break;
      default:
        prompt = `Generate high-quality content about: ${input}`;
    }

    // Use Groq API directly
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama2-70b-4096',
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
      }),
    });

    if (!groqResponse.ok) {
      const errorData = await groqResponse.text();
      console.error('Groq API error:', errorData);
      throw new Error(`Groq API error: ${groqResponse.status}`);
    }

    const groqData = await groqResponse.json();
    const content = groqData.choices?.[0]?.message?.content || '';

    if (!content) {
      throw new Error('No content generated');
    }

    return NextResponse.json({
      success: true,
      content: content.trim(),
    });

  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: `Failed to generate content: ${error.message}` 
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
