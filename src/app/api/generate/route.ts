import { NextRequest, NextResponse } from 'next/server';
// import { getToolBySlug } from '@/lib/tools';
import OpenAI from 'openai';

// Initialize multiple API providers
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const anthropic = {
  apiKey: process.env.ANTHROPIC_API_KEY,
};

const gemini = {
  apiKey: process.env.GOOGLE_GEMINI_API_KEY,
};

const groq = {
  apiKey: process.env.GROQ_API_KEY,
};

export async function POST(request: NextRequest) {
  try {
    const { toolSlug, input } = await request.json();

    if (!toolSlug || !input) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Define tools directly instead of importing
    const validTools = ['blog-generator', 'seo-title-generator', 'product-description-generator', 'youtube-script-generator', 'ad-copy-generator'];
    
    if (!validTools.includes(toolSlug)) {
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

    // Try different API providers with fallback
    let content = '';
    let lastError = null;

    // Try OpenAI first
    try {
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
      content = completion.choices[0]?.message?.content || '';
    } catch (openaiError) {
      console.error('OpenAI failed:', openaiError);
      lastError = openaiError;
      
      // Try Groq as fallback (faster and often has credits)
      if (groq.apiKey) {
        try {
          const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${groq.apiKey}`,
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
          
          const groqData = await groqResponse.json();
          content = groqData.choices?.[0]?.message?.content || '';
        } catch (groqError) {
          console.error('Groq failed:', groqError);
          lastError = groqError;
        }
      }
    }

    if (!content) {
      throw lastError || new Error('All API providers failed');
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
