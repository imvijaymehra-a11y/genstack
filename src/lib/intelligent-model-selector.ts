import { Tool } from './tools';

// Intelligent model selection based on tool type and user needs
export interface ModelSelection {
  modelId: string;
  reason: string;
  confidence: number;
  fallback?: string;
}

export function selectOptimalModel(tool: Tool, userPrompt: string): ModelSelection {
  const toolType = tool.slug;
  const prompt = userPrompt.toLowerCase();
  
  // Analyze prompt characteristics
  const promptCharacteristics = analyzePrompt(prompt);
  
  // Base recommendations by tool category
  const baseRecommendations = getModelRecommendations(toolType);
  
  // Combine base recommendations with prompt analysis
  const optimalModel = optimizeModelSelection(baseRecommendations, promptCharacteristics, tool);
  
  return optimalModel;
}

function analyzePrompt(prompt: string): {
  complexity: 'simple' | 'moderate' | 'complex';
  creativity: 'low' | 'medium' | 'high';
  technical: 'low' | 'medium' | 'high';
  length: 'short' | 'medium' | 'long';
  urgency: 'low' | 'medium' | 'high';
} {
  const words = prompt.split(' ').length;
  
  return {
    complexity: words > 50 ? 'complex' : words > 20 ? 'moderate' : 'simple',
    creativity: 
      prompt.includes('creative') || prompt.includes('innovative') || prompt.includes('original') ? 'high' :
      prompt.includes('professional') || prompt.includes('formal') ? 'medium' : 'low',
    technical:
      prompt.includes('code') || prompt.includes('api') || prompt.includes('technical') ? 'high' :
      prompt.includes('data') || prompt.includes('analysis') ? 'medium' : 'low',
    length: words > 100 ? 'long' : words > 50 ? 'medium' : 'short',
    urgency:
      prompt.includes('urgent') || prompt.includes('asap') || prompt.includes('quick') ? 'high' :
      prompt.includes('soon') || prompt.includes('today') ? 'medium' : 'low'
  };
}

function getModelRecommendations(toolType: string): ModelSelection[] {
  const recommendations: Record<string, ModelSelection[]> = {
    // Writing & Editing Tools
    'blog-generator': [
      { modelId: 'claude-3-sonnet', reason: 'Creative writing with engaging content', confidence: 0.9 },
      { modelId: 'gpt-4', reason: 'Comprehensive structured content', confidence: 0.85 },
      { modelId: 'gemini-pro', reason: 'SEO-optimized with current knowledge', confidence: 0.8 }
    ],
    'email-writer': [
      { modelId: 'gpt-3.5-turbo', reason: 'Professional and efficient email writing', confidence: 0.9 },
      { modelId: 'claude-3-sonnet', reason: 'Natural conversational tone', confidence: 0.85 }
    ],
    'content-rewriter': [
      { modelId: 'claude-3-sonnet', reason: 'Creative content enhancement', confidence: 0.9 },
      { modelId: 'gemini-pro', reason: 'SEO-optimized rewriting', confidence: 0.8 }
    ],
    'grammar-checker': [
      { modelId: 'gpt-4', reason: 'Precise grammar and style analysis', confidence: 0.95 },
      { modelId: 'claude-3-opus', reason: 'Advanced language understanding', confidence: 0.9 }
    ],
    
    // Social Media Tools
    'social-media-caption-generator': [
      { modelId: 'claude-3-sonnet', reason: 'Creative and engaging captions', confidence: 0.9 },
      { modelId: 'gemini-1.5-flash', reason: 'Quick, trendy content', confidence: 0.85 }
    ],
    'tweet-generator': [
      { modelId: 'gemini-1.5-flash', reason: 'Fast, concise tweet generation', confidence: 0.9 },
      { modelId: 'gpt-3.5-turbo', reason: 'Efficient short-form content', confidence: 0.85 }
    ],
    'instagram-post-creator': [
      { modelId: 'claude-3-sonnet', reason: 'Visual storytelling for Instagram', confidence: 0.9 },
      { modelId: 'gemini-1.5-flash', reason: 'Quick visual content creation', confidence: 0.85 }
    ],
    
    // Image Generation & Editing
    'ai-image-generator': [
      { modelId: 'gemini-pro', reason: 'Advanced multimodal image generation', confidence: 0.9 },
      { modelId: 'claude-3-opus', reason: 'Detailed image descriptions', confidence: 0.85 }
    ],
    'image-enhancer': [
      { modelId: 'gemini-pro', reason: 'Advanced image analysis and enhancement', confidence: 0.9 },
      { modelId: 'gpt-4', reason: 'Precise enhancement instructions', confidence: 0.85 }
    ],
    'background-remover': [
      { modelId: 'gemini-pro', reason: 'Advanced image processing', confidence: 0.9 },
      { modelId: 'claude-3-sonnet', reason: 'Accurate background detection', confidence: 0.85 }
    ],
    
    // Video & Animation
    'video-script-generator': [
      { modelId: 'claude-3-sonnet', reason: 'Creative storytelling and narrative', confidence: 0.9 },
      { modelId: 'gpt-4', reason: 'Structured script formatting', confidence: 0.85 }
    ],
    'video-description-generator': [
      { modelId: 'gemini-pro', reason: 'SEO-optimized descriptions', confidence: 0.9 },
      { modelId: 'claude-3-sonnet', reason: 'Engaging description writing', confidence: 0.85 }
    ],
    
    // Coding & Development
    'code-generator': [
      { modelId: 'gpt-4', reason: 'Advanced code generation with best practices', confidence: 0.95 },
      { modelId: 'claude-3-opus', reason: 'Complex problem solving and algorithms', confidence: 0.9 }
    ],
    'code-debugger': [
      { modelId: 'gpt-4', reason: 'Deep code analysis and bug detection', confidence: 0.95 },
      { modelId: 'claude-3-opus', reason: 'Logical reasoning for debugging', confidence: 0.9 }
    ],
    'api-documentation-generator': [
      { modelId: 'gpt-4', reason: 'Comprehensive technical documentation', confidence: 0.9 },
      { modelId: 'claude-3-sonnet', reason: 'Clear explanation writing', confidence: 0.85 }
    ],
    
    // Marketing & Advertising
    'ad-copy-generator': [
      { modelId: 'claude-3-sonnet', reason: 'Persuasive and creative copywriting', confidence: 0.9 },
      { modelId: 'gpt-4', reason: 'Strategic marketing analysis', confidence: 0.85 }
    ],
    'landing-page-copy': [
      { modelId: 'claude-3-sonnet', reason: 'Conversion-focused content creation', confidence: 0.9 },
      { modelId: 'gpt-4', reason: 'Strategic landing page optimization', confidence: 0.85 }
    ],
    
    // Business Management
    'business-plan-generator': [
      { modelId: 'gpt-4', reason: 'Comprehensive business analysis', confidence: 0.95 },
      { modelId: 'claude-3-opus', reason: 'Strategic business planning', confidence: 0.9 }
    ],
    'swot-analysis-generator': [
      { modelId: 'gpt-4', reason: 'Analytical business framework creation', confidence: 0.9 },
      { modelId: 'claude-3-sonnet', reason: 'Balanced business insights', confidence: 0.85 }
    ],
    
    // Art & Creative Design
    'logo-maker': [
      { modelId: 'claude-3-sonnet', reason: 'Creative brand identity design', confidence: 0.9 },
      { modelId: 'gemini-pro', reason: 'Advanced visual design concepts', confidence: 0.85 }
    ],
    'color-palette-generator': [
      { modelId: 'claude-3-sonnet', reason: 'Creative color theory application', confidence: 0.9 },
      { modelId: 'gemini-pro', reason: 'Advanced color analysis', confidence: 0.85 }
    ],
    
    // Data & Analytics
    'data-visualization-generator': [
      { modelId: 'gpt-4', reason: 'Complex data analysis and visualization', confidence: 0.9 },
      { modelId: 'gemini-pro', reason: 'Statistical analysis and insights', confidence: 0.85 }
    ],
    'data-analysis-report': [
      { modelId: 'gpt-4', reason: 'Comprehensive data interpretation', confidence: 0.95 },
      { modelId: 'claude-3-opus', reason: 'Deep analytical insights', confidence: 0.9 }
    ],
    
    // Education & Translation
    'translation-tool': [
      { modelId: 'gemini-pro', reason: 'Multilingual translation with cultural context', confidence: 0.9 },
      { modelId: 'claude-3-sonnet', reason: 'Natural language translation', confidence: 0.85 }
    ],
    'lesson-plan-generator': [
      { modelId: 'gpt-4', reason: 'Structured educational content', confidence: 0.9 },
      { modelId: 'claude-3-sonnet', reason: 'Engaging educational material', confidence: 0.85 }
    ],
    
    // Health & Wellness
    'meal-plan-generator': [
      { modelId: 'gemini-pro', reason: 'Nutritional analysis and meal planning', confidence: 0.9 },
      { modelId: 'claude-3-sonnet', reason: 'Personalized health recommendations', confidence: 0.85 }
    ],
    'workout-plan-generator': [
      { modelId: 'gemini-pro', reason: 'Exercise science and fitness planning', confidence: 0.9 },
      { modelId: 'claude-3-sonnet', reason: 'Motivational fitness content', confidence: 0.85 }
    ],
    
    // Music & Audio
    'song-lyrics-generator': [
      { modelId: 'claude-3-sonnet', reason: 'Creative and emotional lyric writing', confidence: 0.9 },
      { modelId: 'gpt-4', reason: 'Structured song composition', confidence: 0.85 }
    ],
    'podcast-script-generator': [
      { modelId: 'claude-3-sonnet', reason: 'Engaging narrative creation', confidence: 0.9 },
      { modelId: 'gpt-4', reason: 'Structured podcast formatting', confidence: 0.85 }
    ]
  };
  
  return recommendations[toolType] || [
    { modelId: 'gpt-3.5-turbo', reason: 'General purpose content generation', confidence: 0.7 },
    { modelId: 'free-generator', reason: 'Template-based fallback', confidence: 0.5 }
  ];
}

function optimizeModelSelection(
  baseRecommendations: ModelSelection[],
  promptCharacteristics: ReturnType<typeof analyzePrompt>,
  tool: Tool
): ModelSelection {
  let optimalModel = baseRecommendations[0]; // Start with highest confidence
  
  // Adjust based on prompt characteristics
  for (const recommendation of baseRecommendations) {
    let adjustedConfidence = recommendation.confidence;
    
    // Boost confidence for complex tasks
    if (promptCharacteristics.complexity === 'complex') {
      if (recommendation.modelId.includes('gpt-4') || recommendation.modelId.includes('claude-3-opus')) {
        adjustedConfidence += 0.1;
      }
    }
    
    // Boost creativity-focused models for creative tasks
    if (promptCharacteristics.creativity === 'high') {
      if (recommendation.modelId.includes('claude-3-sonnet')) {
        adjustedConfidence += 0.1;
      }
    }
    
    // Boost technical models for coding tasks
    if (promptCharacteristics.technical === 'high') {
      if (recommendation.modelId.includes('gpt-4')) {
        adjustedConfidence += 0.1;
      }
    }
    
    // Boost fast models for urgent tasks
    if (promptCharacteristics.urgency === 'high') {
      if (recommendation.modelId.includes('gemini-1.5-flash') || recommendation.modelId.includes('gpt-3.5-turbo')) {
        adjustedConfidence += 0.1;
      }
    }
    
    // Adjust for tool pricing
    if (tool.pricing === 'free') {
      // Prefer free models for free tools
      if (recommendation.modelId.includes('llama-3-8b-8192') || 
          recommendation.modelId.includes('mixtral-8x7b-32768') ||
          recommendation.modelId.includes('gemma-2b-it-927')) {
        adjustedConfidence += 0.2;
      }
    }
    
    // Update optimal model if this one is better
    if (adjustedConfidence > optimalModel.confidence) {
      optimalModel = {
        ...recommendation,
        confidence: adjustedConfidence
      };
    }
  }
  
  // Add fallback for premium tools if user might be on free plan
  if (tool.pricing === 'freemium' && optimalModel.confidence < 0.7) {
    optimalModel.fallback = 'free-generator';
  }
  
  return optimalModel;
}

// Get model recommendations for UI display
export function getModelRecommendationsForTool(toolType: string): ModelSelection[] {
  return getModelRecommendations(toolType);
}

// Get default model for each tool type
export function getDefaultModelForTool(toolType: string): string {
  const defaults: Record<string, string> = {
    'blog-generator': 'claude-3-sonnet',
    'email-writer': 'gpt-3.5-turbo',
    'content-rewriter': 'claude-3-sonnet',
    'grammar-checker': 'gpt-4',
    'social-media-caption-generator': 'claude-3-sonnet',
    'tweet-generator': 'gemini-1.5-flash',
    'instagram-post-creator': 'claude-3-sonnet',
    'ai-image-generator': 'gemini-pro',
    'image-enhancer': 'gemini-pro',
    'background-remover': 'gemini-pro',
    'video-script-generator': 'claude-3-sonnet',
    'video-description-generator': 'gemini-pro',
    'code-generator': 'gpt-4',
    'code-debugger': 'gpt-4',
    'api-documentation-generator': 'gpt-4',
    'ad-copy-generator': 'claude-3-sonnet',
    'landing-page-copy': 'claude-3-sonnet',
    'business-plan-generator': 'gpt-4',
    'swot-analysis-generator': 'gpt-4',
    'logo-maker': 'claude-3-sonnet',
    'color-palette-generator': 'claude-3-sonnet',
    'data-visualization-generator': 'gpt-4',
    'data-analysis-report': 'gpt-4',
    'translation-tool': 'gemini-pro',
    'lesson-plan-generator': 'gpt-4',
    'meal-plan-generator': 'gemini-pro',
    'workout-plan-generator': 'gemini-pro',
    'song-lyrics-generator': 'claude-3-sonnet',
    'podcast-script-generator': 'claude-3-sonnet'
  };
  
  return defaults[toolType] || 'gpt-3.5-turbo';
}
