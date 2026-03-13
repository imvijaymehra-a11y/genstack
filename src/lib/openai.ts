import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export async function generateContent(prompt: string): Promise<string> {
  try {
    // Validate API key first
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === '') {
      throw new Error('OpenAI API key is not configured');
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful AI assistant that generates high-quality content based on user requests. Always provide well-structured, engaging, and accurate responses."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 2000,
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    if (!completion.choices[0]?.message?.content) {
      throw new Error('No content generated from OpenAI');
    }

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    
    if (error instanceof Error) {
      // API Key Issues
      if (error.message.includes('401') || error.message.includes('invalid api_key')) {
        throw new Error('Invalid OpenAI API key. Please check your configuration.');
      }
      
      // Billing/Quota Issues
      if (error.message.includes('402') || error.message.includes('insufficient_quota')) {
        throw new Error('OpenAI billing issue. Please check your OpenAI account billing.');
      }
      
      // Rate Limiting
      if (error.message.includes('429') || error.message.includes('rate_limit_exceeded')) {
        throw new Error('OpenAI rate limit exceeded. Please try again in a moment.');
      }
      
      // Model Issues
      if (error.message.includes('model_not_found')) {
        throw new Error('OpenAI model not available. Please try again later.');
      }
      
      // Network Issues
      if (error.message.includes('ENOTFOUND') || error.message.includes('ECONNREFUSED')) {
        throw new Error('Network error. Please check your internet connection.');
      }
    }
    
    throw new Error('Content generation failed. Please try again later.');
  }
}

export async function generateImagePrompt(description: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert at creating detailed AI image generation prompts. Create descriptive prompts that include style, composition, lighting, and specific details for AI image models like Midjourney, DALL-E, or Stable Diffusion."
        },
        {
          role: "user",
          content: `Create a detailed AI image generation prompt for: ${description}. Include artistic style, composition, lighting, mood, and specific elements. Make it suitable for high-quality AI image generation.`
        }
      ],
      max_tokens: 500,
      temperature: 0.8,
    });

    return completion.choices[0]?.message?.content || 'Could not generate image prompt.';
  } catch (error) {
    console.error('Image prompt generation error:', error);
    throw new Error('Failed to generate image prompt.');
  }
}
