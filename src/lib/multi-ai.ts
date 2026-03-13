import { AIModel } from './ai-models';

// OpenAI Generation
export async function generateWithOpenAI(prompt: string, modelId: string): Promise<string> {
  const { default: OpenAI } = await import('openai');
  
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
  });

  try {
    const completion = await openai.chat.completions.create({
      model: modelId,
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
    });

    return completion.choices[0]?.message?.content || 'Content generation failed. Please try again.';
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('OpenAI generation failed. Please check your API key and billing.');
  }
}

// Anthropic Claude Generation
export async function generateWithClaude(prompt: string, modelId: string): Promise<string> {
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY || '',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: modelId,
        max_tokens: 2000,
        messages: [
          {
            role: "user",
            content: `You are a helpful AI assistant that generates high-quality content. ${prompt}`
          }
        ]
      })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error?.message || 'Claude API error');
    }

    return data.content[0]?.text || 'Content generation failed. Please try again.';
  } catch (error) {
    console.error('Claude API Error:', error);
    throw new Error('Claude generation failed. Please check your Anthropic API key.');
  }
}

// Google Gemini Generation
export async function generateWithGemini(prompt: string, modelId: string): Promise<string> {
  try {
    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '');
    const model = genAI.getGenerativeModel({ model: modelId });

    const result = await model.generateContent(
      `You are a helpful AI assistant that generates high-quality content based on user requests. Always provide well-structured, engaging, and accurate responses.\n\nUser request: ${prompt}`
    );

    return result.response.text() || 'Content generation failed. Please try again.';
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error('Gemini generation failed. Please check your Google AI API key.');
  }
}

// Groq (Free OpenAI-compatible models)
export async function generateWithGroq(prompt: string, modelId: string): Promise<string> {
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY || ''}`
      },
      body: JSON.stringify({
        model: modelId,
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
      })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error?.message || 'Groq API error');
    }

    return data.choices[0]?.message?.content || 'Content generation failed. Please try again.';
  } catch (error) {
    console.error('Groq API Error:', error);
    throw new Error('Groq generation failed. Please check your Groq API key.');
  }
}
export async function generateWithFreeModel(prompt: string, toolType: string): Promise<string> {
  // Basic template-based generation without API calls
  const templates: { [key: string]: string } = {
    'blog-generator': `# ${extractTitle(prompt)}\n\n${generateBlogContent(prompt)}\n\n## Conclusion\n${generateConclusion(prompt)}`,
    'email-generator': `Subject: ${extractSubject(prompt)}\n\nDear ${extractRecipient(prompt)},\n\n${generateEmailBody(prompt)}\n\nBest regards,\n[Your Name]`,
    'social-media-post': `${generateSocialMediaContent(prompt)}\n\n${generateHashtags(prompt)}`,
    'default': `${generateGenericContent(prompt)}`
  };

  const template = templates[toolType] || templates['default'];
  return template;
}

// Helper functions for free model
function extractTitle(prompt: string): string {
  const match = prompt.match(/title[:\s]+([^.]+)/i);
  return match ? match[1].trim() : 'Generated Content';
}

function extractSubject(prompt: string): string {
  const match = prompt.match(/subject[:\s]+([^.]+)/i);
  return match ? match[1].trim() : 'Generated Email';
}

function extractRecipient(prompt: string): string {
  const match = prompt.match(/to[:\s]+([^.]+)/i);
  return match ? match[1].trim() : 'Recipient';
}

function generateBlogContent(prompt: string): string {
  const sentences = [
    "In today's digital landscape, understanding this topic is crucial for success.",
    "Many experts agree that this approach offers significant benefits.",
    "Research has shown that implementing these strategies can lead to improved outcomes.",
    "It's important to consider various perspectives when addressing this challenge.",
    "This comprehensive guide will help you navigate the complexities involved."
  ];
  
  return sentences.map((sentence, index) => `${index + 1}. ${sentence}`).join('\n\n');
}

function generateConclusion(prompt: string): string {
  return "By following these guidelines and implementing best practices, you'll be well-equipped to achieve your goals. Remember that continuous learning and adaptation are key to long-term success in this area.";
}

function generateEmailBody(prompt: string): string {
  return `I hope this message finds you well. I'm reaching out regarding ${prompt.toLowerCase()}.\n\nThis topic has been gaining significant attention lately, and I believe it would be beneficial to discuss how we can leverage these insights for our mutual benefit.\n\nWould you be available for a brief call next week to explore this further?`;
}

function generateSocialMediaContent(prompt: string): string {
  const engagementPhrases = [
    "🚀 Exciting news!",
    "💡 Did you know?",
    "🎯 Pro tip:",
    "✨ Here's something amazing:"
  ];
  
  const randomPhrase = engagementPhrases[Math.floor(Math.random() * engagementPhrases.length)];
  return `${randomPhrase} ${prompt.toLowerCase()} This is a game-changer for anyone looking to improve their results!`;
}

function generateHashtags(prompt: string): string {
  const words = prompt.toLowerCase().split(' ').filter(word => word.length > 3);
  const hashtags = words.slice(0, 5).map(word => `#${word.replace(/[^a-z0-9]/g, '')}`);
  return hashtags.join(' ');
}

function generateGenericContent(prompt: string): string {
  return `Based on your request about "${prompt}", here's a comprehensive response:\n\nThis topic encompasses several important aspects that deserve careful consideration. The key elements include:\n\n• Strategic planning and execution\n• Best practices and industry standards\n• Practical implementation steps\n• Measurable outcomes and success metrics\n\nBy focusing on these areas, you can achieve optimal results and drive meaningful progress in your endeavors.`;
}

// Main generation function
export async function generateContentWithModel(
  prompt: string, 
  modelId: string, 
  toolType: string = 'default'
): Promise<string> {
  try {
    switch (modelId) {
      case 'gpt-3.5-turbo':
      case 'gpt-4':
        return await generateWithOpenAI(prompt, modelId);
      
      case 'claude-3-sonnet':
      case 'claude-3-opus':
        return await generateWithClaude(prompt, modelId);
      
      case 'gemini-pro':
      case 'gemini-1.5-flash':
        return await generateWithGemini(prompt, modelId);
      
      case 'llama-3-8b-8192':
      case 'mixtral-8x7b-32768':
      case 'gemma-2b-it-927':
        return await generateWithGroq(prompt, modelId);
      
      case 'free-generator':
        return await generateWithFreeModel(prompt, toolType);
      
      default:
        throw new Error(`Unsupported model: ${modelId}`);
    }
  } catch (error) {
    console.error(`Generation failed for model ${modelId}:`, error);
    
    // Fallback to free model if paid model fails
    if (modelId !== 'free-generator') {
      console.log('Falling back to free generator...');
      return await generateWithFreeModel(prompt, toolType);
    }
    
    throw error;
  }
}
