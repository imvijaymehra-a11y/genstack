import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export async function generateContent(prompt: string): Promise<string> {
  try {
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

    return completion.choices[0]?.message?.content || 'Sorry, I could not generate content. Please try again.';
  } catch (error) {
    console.error('OpenAI API Error:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('insufficient quota')) {
        throw new Error('API quota exceeded. Please check your OpenAI billing.');
      }
      if (error.message.includes('invalid api_key')) {
        throw new Error('Invalid API key. Please check your OpenAI configuration.');
      }
      if (error.message.includes('rate_limit_exceeded')) {
        throw new Error('Rate limit exceeded. Please try again in a moment.');
      }
    }
    
    throw new Error('Failed to generate content. Please try again later.');
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
