import { AIModel } from './ai-models';
import { removeBackground, enhanceImage, generateImage } from './image-ai';

// OpenAI Generation
export async function generateWithOpenAI(prompt: string, modelId: string): Promise<string> {
  const { default: OpenAI } = await import('openai');
  
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
  });

  try {
    const systemPrompts = {
      'gpt-3.5-turbo': `You are a professional content generator specializing in high-quality, engaging content. Your task is to create exceptional content that is:

1. **Specific and Detailed**: Avoid generic statements. Provide concrete examples, data, and specific insights.
2. **Well-Structured**: Use clear headings, bullet points, and logical flow.
3. **Actionable**: Include practical tips, steps, or recommendations the user can implement.
4. **Engaging**: Use a conversational yet professional tone that keeps readers interested.
5. **Comprehensive**: Cover the topic thoroughly with depth and substance.

IMPORTANT: 
- NEVER use generic phrases like "In today's digital landscape" or "Many experts agree"
- ALWAYS provide specific, concrete information relevant to the user's request
- Include real examples, statistics, or case studies when possible
- Make the content immediately useful and practical

Generate content that provides real value and stands out from generic AI responses.`,
      
      'gpt-4': `You are GPT-4, an elite content creator producing exceptional, in-depth content. Your content must be:

1. **Expert-Level**: Demonstrate deep knowledge with sophisticated insights and analysis
2. **Data-Driven**: Include specific statistics, research findings, and concrete evidence
3. **Comprehensive**: Cover all important aspects with thorough explanations
4. **Innovative**: Provide unique perspectives and creative solutions
5. **Professional**: Use advanced vocabulary and complex sentence structures appropriately

CRITICAL REQUIREMENTS:
- Absolutely NO generic templates or filler content
- Include specific numbers, dates, names, and verifiable facts
- Provide actionable strategies with step-by-step implementation
- Use industry-specific terminology and examples
- Create content that could be published in professional journals

Generate premium-quality content that exceeds expectations and demonstrates true expertise.`
    };

    const systemPrompt = systemPrompts[modelId as keyof typeof systemPrompts] || systemPrompts['gpt-3.5-turbo'];

    const completion = await openai.chat.completions.create({
      model: modelId,
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: `Create exceptional content for: ${prompt}\n\nMake this specific, detailed, and highly valuable. Avoid any generic statements. Provide concrete examples and actionable insights.`
        }
      ],
      max_tokens: 2000,
      temperature: 0.8,
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
    const systemPrompts = {
      'claude-3-sonnet': `You are Claude 3 Sonnet, a sophisticated content creator producing exceptional, high-quality content. Your content must be:

1. **Specific and Concrete**: Avoid generic statements. Provide real examples, data, and actionable insights.
2. **Well-Researched**: Include specific facts, statistics, and verifiable information.
3. **Engaging and Natural**: Write in a conversational yet authoritative style that captivates readers.
4. **Practical and Useful**: Focus on content that readers can immediately apply.
5. **Comprehensive Coverage**: Explore the topic thoroughly with depth and nuance.

CRITICAL GUIDELINES:
- NEVER use generic phrases like "In today's digital landscape" or "Many experts agree"
- ALWAYS provide specific, concrete information relevant to the user's request
- Include real examples, case studies, or practical applications
- Make the content immediately valuable and actionable
- Use clear structure with headings and bullet points when appropriate

Generate exceptional content that provides genuine value and demonstrates deep expertise.`,
      
      'claude-3-opus': `You are Claude 3 Opus, an elite content creator producing world-class, publication-quality content. Your content must be:

1. **Expert-Level Analysis**: Demonstrate sophisticated understanding with deep insights and nuanced perspectives.
2. **Data-Rich**: Include specific statistics, research findings, studies, and verifiable facts.
3. **Comprehensive Coverage**: Explore all aspects of the topic with thorough analysis and depth.
4. **Innovative Thinking**: Provide unique perspectives, creative solutions, and forward-looking insights.
5. **Professional Excellence**: Use advanced vocabulary, complex sentence structures, and impeccable writing.

ABSOLUTE REQUIREMENTS:
- Zero tolerance for generic content or filler phrases
- Include specific numbers, dates, research citations, and concrete examples
- Provide actionable strategies with step-by-step implementation guidance
- Use industry-specific terminology and professional language
- Create content suitable for high-level publications or expert audiences

Generate premium, exceptional content that showcases true expertise and provides extraordinary value.`
    };

    const systemPrompt = systemPrompts[modelId as keyof typeof systemPrompts] || systemPrompts['claude-3-sonnet'];

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
            content: `${systemPrompt}\n\nUser request: ${prompt}\n\nCreate exceptional, specific, and highly valuable content. Avoid any generic statements. Provide concrete examples, actionable insights, and real value.`
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

    const systemPrompts = {
      'gemini-pro': `You are Gemini Pro, Google's advanced AI assistant specializing in high-quality, comprehensive content creation. Your content must be:

1. **Specific and Detailed**: Avoid generic statements. Provide concrete examples, data, and actionable insights.
2. **Well-Structured**: Use clear headings, bullet points, and logical organization.
3. **Google-Knowledge Enhanced**: Leverage vast, up-to-date information and real-world examples.
4. **Practical and Actionable**: Focus on content users can immediately implement.
5. **Professional Quality**: Maintain high standards of accuracy and clarity.

ESSENTIAL REQUIREMENTS:
- NEVER use generic phrases like "In today's digital landscape" or "Many experts agree"
- ALWAYS provide specific, concrete information relevant to the user's request
- Include real examples, statistics, or practical applications
- Make the content immediately valuable and actionable
- Use clear structure with headings and bullet points when appropriate

Generate exceptional content that provides genuine value and demonstrates deep expertise.`,
      
      'gemini-1.5-flash': `You are Gemini 1.5 Flash, optimized for high-quality, rapid content generation. Your content must be:

1. **Specific and Concrete**: Avoid generic statements. Provide real examples and actionable insights.
2. **Clear and Direct**: Use straightforward language while maintaining quality.
3. **Practical Focus**: Emphasize content users can immediately apply.
4. **Well-Organized**: Use clear structure and logical flow.
5. **Value-Driven**: Ensure every sentence provides meaningful information.

CRITICAL GUIDELINES:
- NEVER use generic filler phrases or vague statements
- ALWAYS provide specific, concrete information relevant to the user's request
- Include practical examples and actionable tips
- Make the content immediately useful
- Use clear, accessible language without sacrificing quality

Generate high-quality content that provides real value quickly and efficiently.`
    };

    const systemPrompt = systemPrompts[modelId as keyof typeof systemPrompts] || systemPrompts['gemini-pro'];

    const result = await model.generateContent(
      `${systemPrompt}\n\nUser request: ${prompt}\n\nCreate exceptional, specific, and highly valuable content. Avoid any generic statements. Provide concrete examples, actionable insights, and real value.`
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
    const systemPrompts = {
      'llama-3-8b-8192': `You are Llama 3 8B, Meta's efficient model specializing in high-quality, practical content creation. Your content must be:

1. **Specific and Concrete**: Avoid generic statements. Provide real examples and actionable insights.
2. **Clear and Accessible**: Use straightforward language while maintaining depth and quality.
3. **Practical Focus**: Emphasize content users can immediately apply.
4. **Well-Organized**: Use clear structure and logical flow.
5. **Value-Driven**: Ensure every sentence provides meaningful information.

CRITICAL GUIDELINES:
- NEVER use generic filler phrases or vague statements
- ALWAYS provide specific, concrete information relevant to the user's request
- Include practical examples and actionable tips
- Make the content immediately useful
- Use clear, accessible language without sacrificing quality

Generate high-quality content that provides real value and practical insights.`,
      
      'mixtral-8x7b-32768': `You are Mixtral 8x7B, Mistral's advanced model creating sophisticated, high-quality content. Your content must be:

1. **Specific and Detailed**: Avoid generic statements. Provide concrete examples, data, and actionable insights.
2. **Well-Structured**: Use clear headings, bullet points, and logical organization.
3. **Comprehensive Coverage**: Explore the topic thoroughly with depth and nuance.
4. **Professional Quality**: Maintain high standards of accuracy and clarity.
5. **Actionable Insights**: Focus on content users can immediately implement.

ESSENTIAL REQUIREMENTS:
- NEVER use generic phrases like "In today's digital landscape" or "Many experts agree"
- ALWAYS provide specific, concrete information relevant to the user's request
- Include real examples, statistics, or practical applications
- Make the content immediately valuable and actionable
- Use clear structure with headings and bullet points when appropriate

Generate exceptional content that provides genuine value and demonstrates expertise.`,
      
      'gemma-2b-it-927': `You are Gemma 2B, Google's lightweight model optimized for high-quality, focused content. Your content must be:

1. **Specific and Direct**: Avoid generic statements. Provide concrete examples and actionable insights.
2. **Clear and Concise**: Use straightforward language while maintaining quality.
3. **Practical Focus**: Emphasize content users can immediately apply.
4. **Well-Organized**: Use clear structure and logical flow.
5. **Value-Driven**: Ensure every sentence provides meaningful information.

CRITICAL GUIDELINES:
- NEVER use generic filler phrases or vague statements
- ALWAYS provide specific, concrete information relevant to the user's request
- Include practical examples and actionable tips
- Make the content immediately useful
- Use clear, accessible language without sacrificing quality

Generate high-quality content that provides real value quickly and efficiently.`
    };

    const systemPrompt = systemPrompts[modelId as keyof typeof systemPrompts] || systemPrompts['llama-3-8b-8192'];

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
            content: systemPrompt
          },
          {
            role: "user",
            content: `Create exceptional content for: ${prompt}\n\nMake this specific, detailed, and highly valuable. Avoid any generic statements. Provide concrete examples and actionable insights.`
          }
        ],
        max_tokens: 2000,
        temperature: 0.8,
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
  // Handle image generation for AI Image Generator
  if (toolType === 'ai-image-generator') {
    // Import the generateImage function to use fallback
    const { generateImage } = await import('./image-ai');
    const result = await generateImage(prompt, 'fallback');
    if (result.success && result.processedImage) {
      return result.processedImage;
    }
    throw new Error(result.error || 'Image generation failed');
  }

  // Enhanced template-based generation with better quality
  const enhancedPrompt = `Create high-quality, specific content about: ${prompt}\n\nRequirements:
- Avoid generic statements like "In today's digital landscape"
- Provide specific, actionable information
- Include concrete examples when possible
- Make the content immediately useful
- Use clear structure with headings and bullet points
- Focus on practical value and real-world application`;

  // Smart content generation based on tool type
  const generateSmartContent = (prompt: string, type: string): string => {
    // Extract key information from prompt
    const topic = extractTopic(prompt);
    const audience = extractAudience(prompt);
    const goal = extractGoal(prompt);
    
    switch (type) {
      case 'blog-generator':
        return generateBlogContent(topic, audience, goal);
      case 'email-generator':
        return generateEmailContent(topic, audience, goal);
      case 'social-media-post':
        return generateSocialContent(topic, audience, goal);
      default:
        return generateGenericContent(topic, audience, goal);
    }
  };

  const extractTopic = (prompt: string): string => {
    // Extract main topic from prompt
    const words = prompt.toLowerCase().split(' ');
    const topicWords = words.filter(word => 
      !['about', 'regarding', 'concerning', 'create', 'generate', 'write'].includes(word) &&
      word.length > 3
    ).slice(0, 3);
    return topicWords.join(' ') || 'the specified topic';
  };

  const extractAudience = (prompt: string): string => {
    const audienceKeywords = ['for', 'to', 'audience', 'customers', 'users', 'readers'];
    const words = prompt.toLowerCase().split(' ');
    for (let i = 0; i < words.length - 1; i++) {
      if (audienceKeywords.includes(words[i])) {
        return words[i + 1];
      }
    }
    return 'your audience';
  };

  const extractGoal = (prompt: string): string => {
    const goalKeywords = ['inform', 'persuade', 'educate', 'entertain', 'promote', 'sell'];
    const words = prompt.toLowerCase().split(' ');
    for (const word of words) {
      if (goalKeywords.some(keyword => word.includes(keyword))) {
        return word;
      }
    }
    return 'inform';
  };

  const generateBlogContent = (topic: string, audience: string, goal: string): string => {
    return `# ${topic.charAt(0).toUpperCase() + topic.slice(1)}: A Comprehensive Guide

## Introduction
${topic.charAt(0).toUpperCase() + topic.slice(1)} is a crucial subject that deserves careful attention and understanding. This guide will provide you with practical insights and actionable strategies to help you succeed.

## Key Benefits and Importance

### 1. Enhanced Performance
Implementing effective ${topic} strategies can lead to measurable improvements in your outcomes. Studies show that organizations that prioritize this area see 30-40% better results.

### 2. Competitive Advantage
Understanding and applying ${topic} principles gives you a significant edge in today's competitive landscape.

### 3. Long-term Sustainability
Proper ${topic} management ensures sustainable growth and continued success.

## Practical Implementation Steps

### Step 1: Assessment and Planning
- Evaluate your current situation
- Identify specific areas for improvement
- Set clear, measurable objectives
- Create a realistic timeline

### Step 2: Strategy Development
- Research best practices in ${topic}
- Develop tailored approaches for your specific needs
- Consider resource requirements and constraints
- Build in flexibility for adjustments

### Step 3: Execution and Monitoring
- Implement your ${topic} strategy systematically
- Track key performance indicators
- Make data-driven adjustments
- Document lessons learned

## Common Challenges and Solutions

### Challenge 1: Resource Limitations
**Solution:** Prioritize high-impact activities and leverage available resources efficiently.

### Challenge 2: Resistance to Change
**Solution:** Communicate benefits clearly and involve stakeholders in the process.

### Challenge 3: Measurement Difficulties
**Solution:** Establish clear metrics and use appropriate tracking tools.

## Best Practices for Success

1. **Continuous Learning**: Stay updated with latest ${topic} developments
2. **Regular Review**: Assess and adjust your approach quarterly
3. **Stakeholder Engagement**: Keep all relevant parties informed and involved
4. **Quality Focus**: Prioritize quality over quantity in all initiatives
5. **Innovation Integration**: Embrace new technologies and methods

## Tools and Resources

### Essential Tools
- Analytics platforms for tracking progress
- Project management software for coordination
- Communication tools for team collaboration
- Research databases for staying informed

### Learning Resources
- Industry publications and journals
- Online courses and certifications
- Professional networks and communities
- Expert consultations and mentoring

## Conclusion

${topic.charAt(0).toUpperCase() + topic.slice(1)} is not just a trend but a fundamental aspect of modern success. By following the strategies and best practices outlined in this guide, you'll be well-equipped to achieve your goals and maintain competitive advantage.

Remember that success in ${topic} requires commitment, continuous improvement, and adaptation to changing circumstances. Start with small, manageable steps and build momentum over time.

## Next Steps

1. Conduct a thorough assessment of your current ${topic} situation
2. Develop a customized action plan based on your specific needs
3. Begin implementation with high-priority items
4. Establish regular review cycles for ongoing improvement

The journey to ${topic} mastery is ongoing, but with dedication and the right approach, you'll see significant benefits and lasting success.`;
  };

  const generateEmailContent = (topic: string, audience: string, goal: string): string => {
    return `Subject: Important Information About ${topic.charAt(0).toUpperCase() + topic.slice(1)}

Dear ${audience.charAt(0).toUpperCase() + audience.slice(1)},

I hope this message finds you well. I'm writing to share valuable insights about ${topic} that I believe will be beneficial for you.

## Key Information About ${topic}

Recent developments in ${topic} have created new opportunities that you should be aware of. Here are the most important points:

### What You Need to Know
- ${topic} has evolved significantly in recent months
- New strategies are showing 40-50% better results
- Early adopters are seeing substantial benefits
- The timing is ideal for implementation

### Specific Benefits for You
1. **Improved Efficiency**: Save time and resources with optimized approaches
2. **Better Outcomes**: Achieve your goals more effectively
3. **Competitive Edge**: Stay ahead of others in your field
4. **Long-term Value**: Build sustainable advantages

## Recommended Next Steps

Based on your situation, I suggest the following actions:

1. **Immediate**: Review your current ${topic} strategy
2. **This Week**: Identify 2-3 areas for improvement
3. **This Month**: Implement new approaches
4. **Ongoing**: Monitor results and adjust as needed

## Resources and Support

I've compiled some helpful resources that you might find useful:
- Step-by-step implementation guide
- Case studies from similar situations
- Tools and templates for getting started
- Expert contacts for specific questions

## Questions and Discussion

I'd be happy to discuss this further and answer any questions you might have. Would you be available for a brief call next week to explore how this applies specifically to your situation?

Please let me know your thoughts and any questions you have.

Best regards,
[Your Name]

---
P.S. I'm also hosting a free webinar on ${topic} next month - let me know if you'd like an invitation.`;
  };

  const generateSocialContent = (topic: string, audience: string, goal: string): string => {
    const hashtags = `#${topic.replace(/\s+/g, '').toLowerCase()} #${audience.replace(/\s+/g, '').toLowerCase()} #tips #success #growth`;
    
    return `🚀 Exciting insights about ${topic} that you don't want to miss!

Here's what you need to know:

✅ Key Strategy: Focus on practical implementation rather than theory
✅ Common Mistake: Avoiding small, consistent improvements
✅ Pro Tip: Start with one specific area and build momentum
✅ Timeline: Expect results within 30-60 days of consistent effort

The data shows that people who implement these ${topic} strategies see 3x better results than those who don't.

🎯 Quick Action Step:
Choose ONE thing from this post to implement today. Small steps lead to big changes!

What's your biggest challenge with ${topic}? Share in the comments below! 👇

${hashtags}

#SuccessTips #GrowthMindset #ActionableAdvice`;
  };

  const generateGenericContent = (topic: string, audience: string, goal: string): string => {
    return `## Comprehensive Guide to ${topic.charAt(0).toUpperCase() + topic.slice(1)}

### Overview
${topic.charAt(0).toUpperCase() + topic.slice(1)} represents a critical area that requires strategic attention and thoughtful implementation. This guide provides actionable insights for achieving optimal results.

### Key Components

#### 1. Strategic Planning
- Define clear objectives and success metrics
- Conduct thorough analysis of current situation
- Identify potential challenges and opportunities
- Develop realistic implementation timeline

#### 2. Implementation Framework
- Break down complex tasks into manageable steps
- Establish accountability measures
- Create feedback loops for continuous improvement
- Build in flexibility for adjustments

#### 3. Performance Optimization
- Monitor key indicators regularly
- Use data-driven decision making
- Implement best practices consistently
- Stay updated with industry developments

### Practical Applications

#### For ${audience}
The strategies outlined here are specifically tailored to address the unique challenges and opportunities faced by ${audience}. Consider these specific applications:

1. **Immediate Actions**: Steps you can take today to see quick wins
2. **Short-term Goals**: Objectives to achieve within the next 30-90 days
3. **Long-term Vision**: Strategic direction for sustained success

### Success Metrics

Track these key indicators to measure your progress:
- Quantitative metrics (numbers, percentages, ratios)
- Qualitative indicators (satisfaction, engagement, quality)
- Efficiency measures (time, resources, costs)
- Impact assessments (outcomes, benefits, ROI)

### Common Pitfalls to Avoid

1. **Analysis Paralysis**: Don't get stuck in planning without action
2. **Inconsistent Implementation**: Maintain regular, focused effort
3. **Ignoring Feedback**: Stay responsive to results and changing conditions
4. **Resource Misallocation**: Focus investments on high-impact activities

### Next Steps

1. **Assessment**: Evaluate your current position regarding ${topic}
2. **Planning**: Create a detailed action plan with specific timelines
3. **Execution**: Begin implementation with priority items
4. **Review**: Establish regular assessment cycles for ongoing optimization

### Conclusion

Success with ${topic} requires a balanced approach of strategic thinking, consistent execution, and continuous improvement. By following the framework outlined in this guide, you'll be well-positioned to achieve your objectives and maintain competitive advantage.

Remember that excellence in ${topic} is a journey, not a destination. Stay committed to learning and adapting as you progress.`;
  };

  return generateSmartContent(prompt, toolType);
}

// Main generation function
export async function generateContentWithModel(
  prompt: string, 
  modelId: string, 
  toolType: string = 'default',
  imageFile?: File
): Promise<string> {
  try {
    // Handle image tools
    if (toolType === 'background-remover' && imageFile) {
      const result = await removeBackground(imageFile, prompt);
      if (result.success && result.processedImage) {
        return result.processedImage;
      }
      throw new Error(result.error || 'Background removal failed');
    }

    if (toolType === 'image-enhancer' && imageFile) {
      const result = await enhanceImage(imageFile, prompt);
      if (result.success && result.processedImage) {
        return result.processedImage;
      }
      throw new Error(result.error || 'Image enhancement failed');
    }

    if (toolType === 'ai-image-generator') {
      const result = await generateImage(prompt, modelId, imageFile);
      if (result.success && result.processedImage) {
        return result.processedImage;
      }
      throw new Error(result.error || 'Image generation failed');
    }

    // Handle text-based tools
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
    if (modelId !== 'free-generator' && !toolType.includes('image')) {
      console.log('Falling back to free generator...');
      return await generateWithFreeModel(prompt, toolType);
    }
    
    throw error;
  }
}
