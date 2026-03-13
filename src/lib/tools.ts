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
    slug: "content-rewriter",
    name: "Content Rewriter",
    description: "Rewrite existing content to make it unique and engaging",
    category: "Writing & Editing",
    prompt: "Rewrite this content to make it unique and engaging: {input}. Maintain the original meaning while improving clarity, flow, and impact.",
    seoTitle: "AI Content Rewriter | Unique Content Generation",
    seoDescription: "Rewrite existing content instantly with AI. Create unique, engaging versions while preserving the original message.",
    tags: ["rewrite", "content", "unique", "seo"],
    pricing: "freemium"
  },
  {
    slug: "grammar-checker",
    name: "Grammar Checker",
    description: "Check and correct grammar, spelling, and style",
    category: "Writing & Editing",
    prompt: "Check and correct the grammar, spelling, and style of this text: {input}. Provide suggestions for improvement and explain the changes.",
    seoTitle: "AI Grammar Checker | Perfect Your Writing",
    seoDescription: "Check and correct grammar instantly with AI. Improve your writing with advanced grammar and style suggestions.",
    tags: ["grammar", "spelling", "style", "editing"],
    pricing: "free"
  },

  // Social Media
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
  {
    slug: "tweet-generator",
    name: "Tweet Generator",
    description: "Create compelling tweets and Twitter threads",
    category: "Social Media",
    prompt: "Create compelling tweets about {input}. Include hashtags, mentions, and optimal formatting for Twitter engagement.",
    seoTitle: "AI Tweet Generator | Create Engaging Tweets",
    seoDescription: "Generate engaging tweets instantly with AI. Create viral Twitter content with optimal formatting and hashtags.",
    tags: ["twitter", "tweet", "social media", "engagement"],
    pricing: "free"
  },
  {
    slug: "instagram-post-creator",
    name: "Instagram Post Creator",
    description: "Create Instagram posts with captions and hashtags",
    category: "Social Media",
    prompt: "Create an Instagram post about {input}. Include an engaging caption, relevant hashtags, and suggestions for visual content.",
    seoTitle: "AI Instagram Post Creator | Visual Content Strategy",
    seoDescription: "Create Instagram posts instantly with AI. Generate engaging captions and hashtag strategies for maximum reach.",
    tags: ["instagram", "visual", "hashtags", "engagement"],
    pricing: "freemium"
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
    slug: "image-enhancer",
    name: "Image Enhancer",
    description: "Enhance and improve image quality automatically",
    category: "Image Generation & Editing",
    prompt: "Enhance this image: {input}. Improve resolution, clarity, colors, and overall quality while maintaining the original content.",
    seoTitle: "AI Image Enhancer | Improve Photo Quality",
    seoDescription: "Enhance image quality instantly with AI. Improve resolution, clarity, and colors automatically.",
    tags: ["enhance", "quality", "photo", "improvement"],
    pricing: "freemium"
  },
  {
    slug: "background-remover",
    name: "Background Remover",
    description: "Remove backgrounds from images automatically",
    category: "Image Generation & Editing",
    prompt: "Remove the background from this image: {input}. Create a clean, professional cutout with precise edges.",
    seoTitle: "AI Background Remover | Clean Image Cutouts",
    seoDescription: "Remove image backgrounds instantly with AI. Create professional cutouts with precise edge detection.",
    tags: ["background", "remove", "cutout", "professional"],
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
  {
    slug: "video-description-generator",
    name: "Video Description Generator",
    description: "Generate SEO-optimized video descriptions",
    category: "Video & Animation",
    prompt: "Create an SEO-optimized video description for: {input}. Include relevant keywords, timestamps, and engagement elements.",
    seoTitle: "AI Video Description Generator | SEO Optimization",
    seoDescription: "Generate video descriptions instantly with AI. Create SEO-optimized descriptions for better discoverability.",
    tags: ["video", "description", "seo", "youtube"],
    pricing: "free"
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
  {
    slug: "code-debugger",
    name: "Code Debugger",
    description: "Find and fix bugs in your code",
    category: "Coding & Development",
    prompt: "Debug this code and identify the issues: {input}. Provide fixes and explanations for each problem found.",
    seoTitle: "AI Code Debugger | Find and Fix Bugs",
    seoDescription: "Debug code instantly with AI. Identify and fix bugs with detailed explanations and solutions.",
    tags: ["debug", "bugs", "fix", "development"],
    pricing: "freemium"
  },
  {
    slug: "api-documentation-generator",
    name: "API Documentation Generator",
    description: "Generate comprehensive API documentation",
    category: "Coding & Development",
    prompt: "Generate comprehensive API documentation for: {input}. Include endpoints, parameters, responses, and examples.",
    seoTitle: "AI API Documentation Generator | Automatic Docs",
    seoDescription: "Generate API documentation instantly with AI. Create comprehensive docs with examples and specifications.",
    tags: ["api", "documentation", "development", "technical"],
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
  {
    slug: "landing-page-copy",
    name: "Landing Page Copy",
    description: "Create high-converting landing page content",
    category: "Marketing & Advertising",
    prompt: "Create high-converting landing page copy for {input}. Include headlines, subheadlines, benefit statements, and calls-to-action.",
    seoTitle: "AI Landing Page Copy | Conversion Optimization",
    seoDescription: "Create landing page copy instantly with AI. Generate high-converting content that drives action.",
    tags: ["landing page", "conversion", "copy", "marketing"],
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
  {
    slug: "swot-analysis-generator",
    name: "SWOT Analysis Generator",
    description: "Generate detailed SWOT analysis reports",
    category: "Business Management",
    prompt: "Create a comprehensive SWOT analysis for: {input}. Include strengths, weaknesses, opportunities, and threats with detailed explanations.",
    seoTitle: "AI SWOT Analysis Generator | Strategic Planning",
    seoDescription: "Generate SWOT analysis instantly with AI. Create detailed strategic planning documents for business growth.",
    tags: ["swot", "analysis", "strategy", "planning"],
    pricing: "freemium"
  },

  // Art & Creative Design
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
  {
    slug: "color-palette-generator",
    name: "Color Palette Generator",
    description: "Generate beautiful color palettes for design",
    category: "Art & Creative Design",
    prompt: "Generate a beautiful color palette for {input}. Create harmonious color combinations with hex codes and usage suggestions.",
    seoTitle: "AI Color Palette Generator | Design Inspiration",
    seoDescription: "Generate color palettes instantly with AI. Create beautiful, harmonious color combinations for any design project.",
    tags: ["color", "palette", "design", "creative"],
    pricing: "free"
  },

  // Data & Analytics
  {
    slug: "data-visualization-generator",
    name: "Data Visualization Generator",
    description: "Create charts and visualizations from data",
    category: "Data & Analytics",
    prompt: "Create data visualizations for: {input}. Generate appropriate chart types and explain the insights revealed.",
    seoTitle: "AI Data Visualization | Chart Generation",
    seoDescription: "Create data visualizations instantly with AI. Generate charts and graphs that reveal insights in your data.",
    tags: ["data", "visualization", "charts", "analytics"],
    pricing: "freemium"
  },
  {
    slug: "data-analysis-report",
    name: "Data Analysis Report",
    description: "Generate comprehensive data analysis reports",
    category: "Data & Analytics",
    prompt: "Analyze this data and generate a comprehensive report: {input}. Include insights, trends, recommendations, and visualizations.",
    seoTitle: "AI Data Analysis Report | Business Intelligence",
    seoDescription: "Generate data analysis reports instantly with AI. Create comprehensive business intelligence documents.",
    tags: ["data", "analysis", "report", "insights"],
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
  {
    slug: "lesson-plan-generator",
    name: "Lesson Plan Generator",
    description: "Create comprehensive educational lesson plans",
    category: "Education & Translation",
    prompt: "Create a comprehensive lesson plan for {input}. Include objectives, materials, activities, assessment, and timing.",
    seoTitle: "AI Lesson Plan Generator | Educational Content",
    seoDescription: "Generate lesson plans instantly with AI. Create comprehensive educational content for teachers and trainers.",
    tags: ["education", "lesson", "teaching", "curriculum"],
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
  {
    slug: "workout-plan-generator",
    name: "Workout Plan Generator",
    description: "Create personalized fitness workout plans",
    category: "Health & Wellness",
    prompt: "Create a personalized workout plan for: {input}. Include exercises, sets, reps, rest periods, and progression guidelines.",
    seoTitle: "AI Workout Plan Generator | Personal Fitness",
    seoDescription: "Generate workout plans instantly with AI. Create personalized fitness routines for any goal and fitness level.",
    tags: ["workout", "fitness", "exercise", "health"],
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
  },
  {
    slug: "podcast-script-generator",
    name: "Podcast Script Generator",
    description: "Create engaging podcast scripts and outlines",
    category: "Music & Audio",
    prompt: "Create an engaging podcast script about {input}. Include introduction, main topics, transitions, and conclusion with talking points.",
    seoTitle: "AI Podcast Script Generator | Audio Content",
    seoDescription: "Generate podcast scripts instantly with AI. Create engaging audio content with structured narratives and talking points.",
    tags: ["podcast", "audio", "script", "content"],
    pricing: "freemium"
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

// Convert category name to URL-friendly slug
export function categoryToSlug(category: string): string {
  return category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// Generate category page URL
export function getCategoryUrl(category: string): string {
  return `/tools/category/${categoryToSlug(category)}`;
}
