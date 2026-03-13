export interface AIModel {
  id: string;
  name: string;
  provider: string;
  description: string;
  maxTokens: number;
  cost: 'free' | 'paid';
  strengths: string[];
  icon: string;
}

export const AI_MODELS: AIModel[] = [
  {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    provider: 'OpenAI',
    description: 'Fast and efficient for general content generation',
    maxTokens: 4096,
    cost: 'paid',
    strengths: ['General writing', 'Quick responses', 'Cost-effective'],
    icon: '🤖'
  },
  {
    id: 'gpt-4',
    name: 'GPT-4',
    provider: 'OpenAI',
    description: 'Most capable model for complex tasks and reasoning',
    maxTokens: 8192,
    cost: 'paid',
    strengths: ['Complex reasoning', 'Detailed analysis', 'High quality'],
    icon: '🧠'
  },
  {
    id: 'claude-3-sonnet',
    name: 'Claude 3 Sonnet',
    provider: 'Anthropic',
    description: 'Balanced model with strong reasoning and safety',
    maxTokens: 4096,
    cost: 'paid',
    strengths: ['Creative writing', 'Analysis', 'Safety-focused'],
    icon: '🎭'
  },
  {
    id: 'claude-3-opus',
    name: 'Claude 3 Opus',
    provider: 'Anthropic',
    description: 'Most powerful Claude model for premium content',
    maxTokens: 4096,
    cost: 'paid',
    strengths: ['Premium quality', 'Deep analysis', 'Creative excellence'],
    icon: '👑'
  },
  {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    provider: 'Google',
    description: 'Google\'s advanced model for diverse tasks',
    maxTokens: 4096,
    cost: 'paid',
    strengths: ['Multimodal', 'Google integration', 'Versatile'],
    icon: '💎'
  },
  {
    id: 'gemini-1.5-flash',
    name: 'Gemini 1.5 Flash',
    provider: 'Google',
    description: 'Fast and efficient for quick content generation',
    maxTokens: 4096,
    cost: 'paid',
    strengths: ['Speed', 'Efficiency', 'Cost-effective'],
    icon: '⚡'
  },
  {
    id: 'free-generator',
    name: 'Free Generator',
    provider: 'Local',
    description: 'Basic content generation without API costs',
    maxTokens: 1000,
    cost: 'free',
    strengths: ['Free to use', 'Basic content', 'No API limits'],
    icon: '🆓'
  },
  {
    id: 'llama-3-8b-8192',
    name: 'Llama 3 8B',
    provider: 'Meta (Groq)',
    description: 'Fast open-source model for general tasks',
    maxTokens: 4096,
    cost: 'free',
    strengths: ['Fast response', 'Open source', 'No cost'],
    icon: '🦙'
  },
  {
    id: 'mixtral-8x7b-32768',
    name: 'Mixtral 8x7B',
    provider: 'Mistral (Groq)',
    description: 'High-quality open-source model',
    maxTokens: 4096,
    cost: 'free',
    strengths: ['Quality output', 'Open source', 'Free tier'],
    icon: '🌊'
  },
  {
    id: 'gemma-2b-it-927',
    name: 'Gemma 2B',
    provider: 'Google (Groq)',
    description: 'Lightweight model for quick generation',
    maxTokens: 2048,
    cost: 'free',
    strengths: ['Lightweight', 'Fast', 'Google quality'],
    icon: '💠'
  }
];

export function getModelById(id: string): AIModel | undefined {
  return AI_MODELS.find(model => model.id === id);
}

export function getFreeModels(): AIModel[] {
  return AI_MODELS.filter(model => model.cost === 'free');
}

export function getPaidModels(): AIModel[] {
  return AI_MODELS.filter(model => model.cost === 'paid');
}
