export interface Tool {
  slug: string;
  name: string;
  description: string;
  category: string;
  prompt: string;
  seoTitle?: string;
  seoDescription?: string;
  featured?: boolean;
  isNew?: boolean;
  trending?: boolean;
  tags?: string[];
  pricing?: 'free' | 'freemium' | 'paid';
}

export const tools: Tool[] = [
  // Writing & Editing
  {
    slug: "blog-generator",
    name: "Blog Generator",
    description: "Generate SEO optimized blog posts with engaging content",
    category: "Writing & Editing",
    prompt: "Write a detailed SEO optimized blog post about {input}. Include a compelling title, introduction, main content with headings, and conclusion. Make it engaging and informative.",
    seoTitle: "AI Blog Post Generator | Create SEO-Optimized Blog Content",
    seoDescription: "Generate high-quality, SEO-optimized blog posts instantly with our AI blog generator. Create engaging content that ranks well in search engines.",
    featured: true,
    trending: true,
    tags: ["blog", "seo", "content", "writing"],
    pricing: "freemium"
  },
  {
    slug: "email-writer",
    name: "Email Writer",
    description: "Write professional and persuasive emails",
    category: "Writing & Editing",
    prompt: "Write a professional email about {input}. Include a clear subject line, appropriate greeting, well-structured body, and professional closing.",
    seoTitle: "AI Email Writer | Professional Email Generator",
    seoDescription: "Craft professional emails instantly with our AI email writer. Generate persuasive business communications for any purpose.",
    featured: true,
    tags: ["email", "professional", "business", "communication"],
    pricing: "freemium"
  },
  {
    slug: "social-media-caption-generator",
    name: "Social Media Caption Generator",
    description: "Generate engaging captions for social media posts",
    category: "Social Media",
    prompt: "Create engaging social media captions for {input}. Include relevant hashtags, emojis, and a call-to-action. Make it platform-appropriate and engaging.",
    seoTitle: "Social Media Caption Generator | Create Viral Content",
    seoDescription: "Generate captivating social media captions instantly. Create viral content with AI-powered hashtag suggestions and engagement optimization.",
    featured: true,
    tags: ["social media", "caption", "hashtags", "engagement"],
    pricing: "free"
  },

  // Image Generation & Editing
  {
    slug: "ai-image-generator",
    name: "AI Image Generator",
    description: "Generate stunning images from text descriptions",
    category: "Image Generation & Editing",
    prompt: "Generate a high-quality image based on this description: {input}. Create a visually appealing image that accurately represents the concept with good composition and detail.",
    seoTitle: "AI Image Generator | Create Images from Text",
    seoDescription: "Generate stunning AI images from text descriptions. Create unique artwork, photos, and graphics with advanced AI image generation.",
    featured: true,
    trending: true,
    tags: ["image", "ai", "generation", "art"],
    pricing: "freemium"
  },
  {
    slug: "logo-maker",
    name: "Logo Maker",
    description: "Design professional logos for your brand",
    category: "Art & Creative Design",
    prompt: "Design a professional logo for {input}. Create a clean, memorable design that represents the brand identity and works well at different sizes.",
    seoTitle: "AI Logo Maker | Professional Logo Design",
    seoDescription: "Create professional logos instantly with AI. Design unique brand identities that stand out and make a lasting impression.",
    trending: true,
    tags: ["logo", "brand", "design", "professional"],
    pricing: "freemium"
  },

  // Video & Animation
  {
    slug: "video-script-generator",
    name: "Video Script Generator",
    description: "Create compelling video scripts for any topic",
    category: "Video & Animation",
    prompt: "Write a compelling video script about {input}. Include scene descriptions, dialogue, camera directions, and timing notes for a professional production.",
    seoTitle: "Video Script Generator | AI Script Writer",
    seoDescription: "Create compelling video scripts instantly with AI. Generate professional scripts for YouTube, TikTok, and social media.",
    trending: true,
    tags: ["video", "script", "content", "youtube"],
    pricing: "freemium"
  },

  // Coding & Development
  {
    slug: "code-generator",
    name: "Code Generator",
    description: "Generate code in any programming language",
    category: "Coding & Development",
    prompt: "Generate clean, well-commented code for {input}. Include error handling, best practices, and documentation where appropriate.",
    seoTitle: "AI Code Generator | Write Code with AI",
    seoDescription: "Generate clean, efficient code instantly with AI. Support for multiple programming languages with best practices included.",
    trending: true,
    tags: ["code", "programming", "development", "ai"],
    pricing: "freemium"
  },

  // Marketing & Advertising
  {
    slug: "ad-copy-generator",
    name: "Ad Copy Generator",
    description: "Create persuasive advertising copy",
    category: "Marketing & Advertising",
    prompt: "Write compelling ad copy for {input}. Include attention-grabbing headlines, persuasive body text, and strong calls-to-action.",
    seoTitle: "Ad Copy Generator | AI Advertising Copy",
    seoDescription: "Create compelling advertising copy instantly with AI. Generate high-converting ad copy for any product or service.",
    trending: true,
    tags: ["marketing", "advertising", "copy", "conversion"],
    pricing: "freemium"
  },

  // Business Management
  {
    slug: "business-plan-generator",
    name: "Business Plan Generator",
    description: "Create comprehensive business plans",
    category: "Business Management",
    prompt: "Create a comprehensive business plan for: {input}. Include executive summary, company description, market analysis, products/services, marketing strategy, and financial projections.",
    seoTitle: "AI Business Plan Generator | Professional Business Plans",
    seoDescription: "Generate professional business plans instantly. Create comprehensive documents for investors, loans, and strategic planning.",
    featured: true,
    tags: ["business plan", "strategy", "startup", "planning"],
    pricing: "freemium"
  },

  // Education & Translation
  {
    slug: "translation-tool",
    name: "AI Translation Tool",
    description: "Translate text between multiple languages",
    category: "Education & Translation",
    prompt: "Translate this text from {source language} to {target language}: {input}. Maintain the original meaning and tone while ensuring cultural appropriateness.",
    seoTitle: "AI Translation Tool | Accurate Language Translation",
    seoDescription: "Translate text between 100+ languages instantly with AI. Get accurate, context-aware translations for personal and professional use.",
    featured: true,
    tags: ["translation", "language", "multilingual", "global"],
    pricing: "freemium"
  },

  // Health & Wellness
  {
    slug: "meal-plan-generator",
    name: "Meal Plan Generator",
    description: "Create personalized nutrition and meal plans",
    category: "Health & Wellness",
    prompt: "Create a personalized meal plan for: {input}. Include breakfast, lunch, dinner, and snacks with nutritional information and preparation instructions.",
    seoTitle: "AI Meal Plan Generator | Personalized Nutrition",
    seoDescription: "Generate personalized meal plans instantly. Create nutritionally balanced meal plans tailored to your dietary needs and goals.",
    tags: ["meal plan", "nutrition", "diet", "health"],
    pricing: "freemium"
  },

  // Music & Audio
  {
    slug: "song-lyrics-generator",
    name: "Song Lyrics Generator",
    description: "Create original song lyrics and poetry",
    category: "Music & Audio",
    prompt: "Create original song lyrics about: {input}. Include verses, chorus, bridge, and rhyme scheme with emotional depth.",
    seoTitle: "AI Song Lyrics Generator | Create Original Music",
    seoDescription: "Generate original song lyrics instantly with AI. Create poetry and song lyrics with emotional depth and artistic expression.",
    featured: true,
    tags: ["lyrics", "song", "music", "poetry"],
    pricing: "free"
  }
];

export const categories = Array.from(new Set(tools.map(tool => tool.category)));

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find(tool => tool.slug === slug);
}

export function getToolsByCategory(category: string): Tool[] {
  return tools.filter(tool => tool.category === category);
}

export function searchTools(query: string): Tool[] {
  const lowercaseQuery = query.toLowerCase();
  return tools.filter(tool => 
    tool.name.toLowerCase().includes(lowercaseQuery) ||
    tool.description.toLowerCase().includes(lowercaseQuery) ||
    tool.category.toLowerCase().includes(lowercaseQuery) ||
    tool.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}

export function getFeaturedTools(): Tool[] {
  return tools.filter(tool => tool.featured);
}

export function getNewTools(): Tool[] {
  return tools.filter(tool => tool.isNew);
}

export function getFreeTools(): Tool[] {
  return tools.filter(tool => tool.pricing === 'free');
}

export function getFreemiumTools(): Tool[] {
  return tools.filter(tool => tool.pricing === 'freemium');
}
