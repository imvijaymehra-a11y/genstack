export interface Tool {
  slug: string;
  name: string;
  description: string;
  category: string;
  prompt: string;
  seoTitle?: string;
  seoDescription?: string;
}

export const tools: Tool[] = [
  // AI Writing Tools
  {
    slug: "blog-generator",
    name: "Blog Generator",
    description: "Generate SEO optimized blog posts with engaging content",
    category: "AI Writing Tools",
    prompt: "Write a detailed SEO optimized blog post about {input}. Include a compelling title, introduction, main content with headings, and conclusion. Make it engaging and informative.",
    seoTitle: "AI Blog Post Generator | Create SEO-Optimized Blog Content",
    seoDescription: "Generate high-quality, SEO-optimized blog posts instantly with our AI blog generator. Create engaging content that ranks well in search engines."
  },
  {
    slug: "blog-outline-generator",
    name: "Blog Outline Generator",
    description: "Create structured blog outlines for better content organization",
    category: "AI Writing Tools",
    prompt: "Create a comprehensive blog outline about {input}. Include main sections, subsections, key points to cover, and a logical flow for the content.",
    seoTitle: "Blog Outline Generator | Structure Your Content Perfectly",
    seoDescription: "Generate well-structured blog outlines instantly. Organize your thoughts and create comprehensive content frameworks with AI assistance."
  },
  {
    slug: "email-writer",
    name: "Email Writer",
    description: "Write professional and persuasive emails",
    category: "AI Writing Tools",
    prompt: "Write a professional email about {input}. Include a clear subject line, appropriate greeting, well-structured body, and professional closing.",
    seoTitle: "AI Email Writer | Professional Email Generator",
    seoDescription: "Craft professional emails instantly with our AI email writer. Generate persuasive business communications for any purpose."
  },
  {
    slug: "product-description-generator",
    name: "Product Description Generator",
    description: "Create compelling product descriptions that sell",
    category: "AI Writing Tools",
    prompt: "Write a compelling product description for {input}. Highlight key features, benefits, and unique selling points. Make it persuasive and customer-focused.",
    seoTitle: "Product Description Generator | Convert Customers with AI",
    seoDescription: "Create compelling product descriptions that drive sales. Generate persuasive copy that highlights features and benefits effectively."
  },
  {
    slug: "social-media-caption-generator",
    name: "Social Media Caption Generator",
    description: "Generate engaging social media captions",
    category: "AI Writing Tools",
    prompt: "Write engaging social media captions about {input}. Include relevant hashtags, emojis, and a call-to-action. Make it suitable for platforms like Instagram, Twitter, and Facebook.",
    seoTitle: "Social Media Caption Generator | Create Viral Content",
    seoDescription: "Generate engaging social media captions with hashtags and emojis. Create viral content for Instagram, Twitter, Facebook, and more."
  },
  {
    slug: "article-rewriter",
    name: "Article Rewriter",
    description: "Rewrite articles to avoid plagiarism and improve readability",
    category: "AI Writing Tools",
    prompt: "Rewrite the following article about {input} to make it unique while maintaining the original meaning. Improve readability, flow, and engagement.",
    seoTitle: "Article Rewriter | Unique Content Generator",
    seoDescription: "Rewrite articles to create unique, plagiarism-free content. Improve readability and maintain original meaning with AI assistance."
  },
  {
    slug: "grammar-improver",
    name: "Grammar Improver",
    description: "Fix grammar and improve writing quality",
    category: "AI Writing Tools",
    prompt: "Improve the grammar, spelling, and overall quality of this text about {input}. Fix errors, enhance clarity, and make it more professional.",
    seoTitle: "Grammar Improver | Perfect Your Writing Instantly",
    seoDescription: "Fix grammar, spelling, and writing quality instantly. Professional proofreading and editing powered by AI."
  },
  {
    slug: "linkedin-post-generator",
    name: "LinkedIn Post Generator",
    description: "Create professional LinkedIn posts",
    category: "AI Writing Tools",
    prompt: "Write a professional LinkedIn post about {input}. Include relevant hashtags, a strong hook, valuable insights, and engagement questions. Make it suitable for a professional audience.",
    seoTitle: "LinkedIn Post Generator | Professional Content Creation",
    seoDescription: "Create engaging LinkedIn posts that build your professional brand. Generate content with hashtags and engagement hooks."
  },

  // Creator Tools
  {
    slug: "youtube-script-generator",
    name: "YouTube Script Generator",
    description: "Generate engaging YouTube video scripts",
    category: "Creator Tools",
    prompt: "Write an engaging YouTube video script about {input}. Include a hook, main content, and call-to-action. Make it conversational and suitable for video format.",
    seoTitle: "YouTube Script Generator | Create Viral Video Content",
    seoDescription: "Generate engaging YouTube scripts that captivate audiences. Create viral video content with professional storytelling."
  },
  {
    slug: "youtube-title-generator",
    name: "YouTube Title Generator",
    description: "Create catchy YouTube video titles",
    category: "Creator Tools",
    prompt: "Generate 10 catchy YouTube video titles about {input}. Make them SEO-friendly, attention-grabbing, and optimized for click-through rates.",
    seoTitle: "YouTube Title Generator | Create Viral Video Titles",
    seoDescription: "Generate catchy YouTube titles that boost views and engagement. Create SEO-optimized video titles that attract clicks."
  },
  {
    slug: "youtube-description-generator",
    name: "YouTube Description Generator",
    description: "Write optimized YouTube video descriptions",
    category: "Creator Tools",
    prompt: "Write an optimized YouTube description for a video about {input}. Include relevant keywords, timestamps, links, and a compelling summary.",
    seoTitle: "YouTube Description Generator | SEO-Optimized Descriptions",
    seoDescription: "Create SEO-optimized YouTube descriptions that improve discoverability. Generate professional video descriptions with keywords and links."
  },
  {
    slug: "video-idea-generator",
    name: "Video Idea Generator",
    description: "Generate creative video content ideas",
    category: "Creator Tools",
    prompt: "Generate 10 creative video ideas about {input}. Include different formats, angles, and target audiences. Make them unique and engaging.",
    seoTitle: "Video Idea Generator | Creative Content Ideas",
    seoDescription: "Generate creative video ideas that stand out. Get unique content concepts for YouTube, TikTok, and other platforms."
  },
  {
    slug: "podcast-show-notes-generator",
    name: "Podcast Show Notes Generator",
    description: "Create comprehensive podcast show notes",
    category: "Creator Tools",
    prompt: "Write comprehensive show notes for a podcast episode about {input}. Include key takeaways, guest information, resources mentioned, and timestamps.",
    seoTitle: "Podcast Show Notes Generator | Professional Episode Notes",
    seoDescription: "Create professional podcast show notes that enhance listener experience. Generate comprehensive episode summaries and resources."
  },
  {
    slug: "tiktok-caption-generator",
    name: "TikTok Caption Generator",
    description: "Create viral TikTok captions",
    category: "Creator Tools",
    prompt: "Write viral TikTok captions about {input}. Include trending hashtags, emojis, and engagement hooks. Make it short, catchy, and shareable.",
    seoTitle: "TikTok Caption Generator | Create Viral Captions",
    seoDescription: "Generate viral TikTok captions with trending hashtags. Create engaging short-form content that drives shares and likes."
  },

  // Business Productivity Tools
  {
    slug: "meeting-notes-summarizer",
    name: "Meeting Notes Summarizer",
    description: "Summarize meeting notes effectively",
    category: "Business Productivity Tools",
    prompt: "Summarize these meeting notes about {input}. Extract key decisions, action items, deadlines, and important points. Make it clear and actionable.",
    seoTitle: "Meeting Notes Summarizer | Efficient Meeting Summaries",
    seoDescription: "Summarize meeting notes instantly with AI. Extract key decisions, action items, and important points efficiently."
  },
  {
    slug: "business-plan-generator",
    name: "Business Plan Generator",
    description: "Create comprehensive business plans",
    category: "Business Productivity Tools",
    prompt: "Create a comprehensive business plan for {input}. Include executive summary, market analysis, products/services, marketing strategy, and financial projections.",
    seoTitle: "Business Plan Generator | Professional Business Planning",
    seoDescription: "Create comprehensive business plans with AI assistance. Generate professional documents covering all essential business aspects."
  },
  {
    slug: "proposal-generator",
    name: "Proposal Generator",
    description: "Write winning business proposals",
    category: "Business Productivity Tools",
    prompt: "Write a winning business proposal for {input}. Include problem statement, solution, benefits, timeline, and pricing. Make it persuasive and professional.",
    seoTitle: "Proposal Generator | Create Winning Business Proposals",
    seoDescription: "Generate winning business proposals that convert clients. Create professional, persuasive proposals with AI assistance."
  },
  {
    slug: "resume-improver",
    name: "Resume Improver",
    description: "Enhance and optimize resumes",
    category: "Business Productivity Tools",
    prompt: "Improve and optimize this resume for {input}. Highlight achievements, use action verbs, optimize for ATS systems, and make it stand out to recruiters.",
    seoTitle: "Resume Improver | Optimize Your Resume for Success",
    seoDescription: "Enhance your resume with AI optimization. Improve ATS compatibility, highlight achievements, and stand out to recruiters."
  },
  {
    slug: "job-description-generator",
    name: "Job Description Generator",
    description: "Create effective job descriptions",
    category: "Business Productivity Tools",
    prompt: "Write an effective job description for {input}. Include responsibilities, requirements, benefits, and company information. Make it attractive to qualified candidates.",
    seoTitle: "Job Description Generator | Attract Top Talent",
    seoDescription: "Create compelling job descriptions that attract qualified candidates. Generate professional listings that stand out in the job market."
  },
  {
    slug: "swot-analysis-generator",
    name: "SWOT Analysis Generator",
    description: "Generate comprehensive SWOT analyses",
    category: "Business Productivity Tools",
    prompt: "Create a comprehensive SWOT analysis for {input}. Analyze strengths, weaknesses, opportunities, and threats. Provide actionable insights and recommendations.",
    seoTitle: "SWOT Analysis Generator | Strategic Business Analysis",
    seoDescription: "Generate comprehensive SWOT analyses for strategic planning. Analyze strengths, weaknesses, opportunities, and threats effectively."
  },
  {
    slug: "startup-idea-generator",
    name: "Startup Idea Generator",
    description: "Generate innovative startup ideas",
    category: "Business Productivity Tools",
    prompt: "Generate 10 innovative startup ideas related to {input}. Include business models, target markets, revenue streams, and competitive advantages.",
    seoTitle: "Startup Idea Generator | Innovative Business Concepts",
    seoDescription: "Generate innovative startup ideas with business models. Create unique concepts with market analysis and revenue strategies."
  },

  // Marketing & SEO Tools
  {
    slug: "seo-title-generator",
    name: "SEO Title Generator",
    description: "Generate SEO-optimized titles",
    category: "Marketing & SEO Tools",
    prompt: "Generate 10 SEO-optimized titles for {input}. Make them under 60 characters, include target keywords, and optimize for click-through rates.",
    seoTitle: "SEO Title Generator | Create Search-Optimized Titles",
    seoDescription: "Generate SEO-optimized titles that rank well in search engines. Create compelling titles that improve click-through rates."
  },
  {
    slug: "seo-meta-description-generator",
    name: "SEO Meta Description Generator",
    description: "Create compelling meta descriptions",
    category: "Marketing & SEO Tools",
    prompt: "Write compelling SEO meta descriptions for {input}. Make them under 160 characters, include target keywords, and encourage clicks.",
    seoTitle: "SEO Meta Description Generator | Boost Search Rankings",
    seoDescription: "Create compelling meta descriptions that improve search rankings. Generate SEO-optimized descriptions that drive clicks."
  },
  {
    slug: "keyword-ideas-generator",
    name: "Keyword Ideas Generator",
    description: "Generate relevant keyword ideas",
    category: "Marketing & SEO Tools",
    prompt: "Generate 20 relevant keyword ideas for {input}. Include long-tail keywords, question keywords, and local variations. Group them by search intent.",
    seoTitle: "Keyword Ideas Generator | Discover Profitable Keywords",
    seoDescription: "Generate relevant keyword ideas for SEO and content marketing. Discover long-tail keywords and search intent variations."
  },
  {
    slug: "landing-page-copy-generator",
    name: "Landing Page Copy Generator",
    description: "Create high-converting landing page copy",
    category: "Marketing & SEO Tools",
    prompt: "Write high-converting landing page copy for {input}. Include headline, subheadline, benefits, social proof, and strong call-to-action.",
    seoTitle: "Landing Page Copy Generator | Convert Visitors to Customers",
    seoDescription: "Create high-converting landing page copy that drives conversions. Generate persuasive copy with compelling CTAs and benefits."
  },
  {
    slug: "ad-copy-generator",
    name: "Ad Copy Generator",
    description: "Generate effective advertising copy",
    category: "Marketing & SEO Tools",
    prompt: "Write effective ad copy for {input}. Create multiple variations for different platforms. Include compelling headlines, benefits, and clear CTAs.",
    seoTitle: "Ad Copy Generator | Create High-Performing Ads",
    seoDescription: "Generate effective ad copy for Google, Facebook, and social media. Create compelling ads that drive conversions and ROI."
  },
  {
    slug: "marketing-hooks-generator",
    name: "Marketing Hooks Generator",
    description: "Create attention-grabbing marketing hooks",
    category: "Marketing & SEO Tools",
    prompt: "Generate 10 attention-grabbing marketing hooks for {input}. Use psychological triggers, curiosity gaps, and emotional appeals to capture attention.",
    seoTitle: "Marketing Hooks Generator | Capture Audience Attention",
    seoDescription: "Generate attention-grabbing marketing hooks that stop the scroll. Create compelling opening lines and psychological triggers."
  },
  {
    slug: "cta-generator",
    name: "CTA Generator",
    description: "Create compelling call-to-action buttons",
    category: "Marketing & SEO Tools",
    prompt: "Generate 10 compelling call-to-action variations for {input}. Make them action-oriented, urgent, and benefit-focused. Test different psychological triggers.",
    seoTitle: "CTA Generator | Create High-Converting Call-to-Actions",
    seoDescription: "Generate high-converting CTAs that drive action. Create compelling call-to-action buttons with psychological triggers."
  },
  {
    slug: "content-brief-generator",
    name: "Content Brief Generator",
    description: "Create comprehensive content briefs",
    category: "Marketing & SEO Tools",
    prompt: "Create a comprehensive content brief for {input}. Include target keywords, content structure, word count, tone, and SEO requirements.",
    seoTitle: "Content Brief Generator | Streamline Content Creation",
    seoDescription: "Create comprehensive content briefs that streamline content creation. Generate detailed briefs with SEO requirements and structure."
  },

  // Image Tools
  {
    slug: "ai-image-generator",
    name: "AI Image Generator",
    description: "Generate images using AI",
    category: "Image Tools",
    prompt: "Generate a detailed image prompt for {input}. Include style, composition, lighting, and specific details. Make it suitable for AI image generation models.",
    seoTitle: "AI Image Generator | Create Stunning Images with AI",
    seoDescription: "Generate stunning images using AI technology. Create custom visuals for any purpose with advanced AI image generation."
  },
  {
    slug: "image-prompt-generator",
    name: "Image Prompt Generator",
    description: "Create detailed prompts for AI image generation",
    category: "Image Tools",
    prompt: "Create a detailed AI image generation prompt for {input}. Include artistic style, composition, lighting, mood, and specific elements to include.",
    seoTitle: "Image Prompt Generator | Perfect AI Art Prompts",
    seoDescription: "Create detailed prompts for AI image generation. Generate perfect prompts for Midjourney, DALL-E, and Stable Diffusion."
  },
  {
    slug: "thumbnail-generator",
    name: "Thumbnail Generator",
    description: "Generate ideas for video thumbnails",
    category: "Image Tools",
    prompt: "Generate thumbnail ideas for a video about {input}. Include composition, text overlay, color scheme, and visual elements that attract clicks.",
    seoTitle: "Thumbnail Generator | Create Click-Worthy Thumbnails",
    seoDescription: "Generate click-worthy thumbnail ideas for YouTube and social media. Create compelling visuals that boost video views."
  },
  {
    slug: "background-remover",
    name: "Background Remover",
    description: "Remove backgrounds from images",
    category: "Image Tools",
    prompt: "Provide instructions and best practices for removing backgrounds from images of {input}. Include tips for achieving clean, professional results.",
    seoTitle: "Background Remover | Professional Image Editing",
    seoDescription: "Remove backgrounds from images professionally. Get clean, transparent backgrounds for product photos and portraits."
  },
  {
    slug: "image-upscaler",
    name: "Image Upscaler",
    description: "Enhance image resolution and quality",
    category: "Image Tools",
    prompt: "Provide guidance on upscaling and enhancing images of {input}. Include best practices for maintaining quality and improving resolution.",
    seoTitle: "Image Upscaler | Enhance Image Quality & Resolution",
    seoDescription: "Enhance image resolution and quality with AI upscaling. Improve image clarity and detail for professional results."
  },
  {
    slug: "logo-generator",
    name: "Logo Generator",
    description: "Generate logo concepts and ideas",
    category: "Image Tools",
    prompt: "Generate logo concepts for {input}. Include design principles, color psychology, typography suggestions, and brand identity considerations.",
    seoTitle: "Logo Generator | Create Professional Logo Designs",
    seoDescription: "Generate professional logo concepts and designs. Create brand identities with AI-powered logo generation tools."
  },

  // AI Prompt Tools
  {
    slug: "chatgpt-prompt-generator",
    name: "ChatGPT Prompt Generator",
    description: "Create effective ChatGPT prompts",
    category: "AI Prompt Tools",
    prompt: "Create effective ChatGPT prompts for {input}. Include context, clear instructions, desired output format, and examples for better results.",
    seoTitle: "ChatGPT Prompt Generator | Master AI Conversations",
    seoDescription: "Create effective ChatGPT prompts that get better results. Generate structured prompts for various AI conversation scenarios."
  },
  {
    slug: "midjourney-prompt-generator",
    name: "Midjourney Prompt Generator",
    description: "Create detailed Midjourney prompts",
    category: "AI Prompt Tools",
    prompt: "Create detailed Midjourney prompts for {input}. Include parameters, style modifiers, aspect ratios, and advanced techniques for stunning results.",
    seoTitle: "Midjourney Prompt Generator | Create Amazing AI Art",
    seoDescription: "Create detailed Midjourney prompts for stunning AI art. Generate professional prompts with parameters and style modifiers."
  },
  {
    slug: "stable-diffusion-prompt-generator",
    name: "Stable Diffusion Prompt Generator",
    description: "Create optimized Stable Diffusion prompts",
    category: "AI Prompt Tools",
    prompt: "Create optimized Stable Diffusion prompts for {input}. Include negative prompts, weighting, steps, and technical parameters for best results.",
    seoTitle: "Stable Diffusion Prompt Generator | Optimize AI Art",
    seoDescription: "Create optimized Stable Diffusion prompts for best results. Generate detailed prompts with technical parameters and negative prompts."
  },
  {
    slug: "marketing-prompt-generator",
    name: "Marketing Prompt Generator",
    description: "Create marketing-specific AI prompts",
    category: "AI Prompt Tools",
    prompt: "Create marketing-focused AI prompts for {input}. Include brand voice, target audience, marketing goals, and desired outcomes.",
    seoTitle: "Marketing Prompt Generator | AI-Powered Marketing",
    seoDescription: "Create marketing-focused AI prompts for better campaigns. Generate prompts that align with marketing goals and brand voice."
  },
  {
    slug: "coding-prompt-generator",
    name: "Coding Prompt Generator",
    description: "Create effective coding prompts",
    category: "AI Prompt Tools",
    prompt: "Create effective coding prompts for {input}. Include programming language, requirements, constraints, and expected output format.",
    seoTitle: "Coding Prompt Generator | Better AI Code Generation",
    seoDescription: "Create effective coding prompts for AI code generation. Generate structured prompts that produce better, cleaner code."
  },
  {
    slug: "writing-prompt-generator",
    name: "Writing Prompt Generator",
    description: "Generate creative writing prompts",
    category: "AI Prompt Tools",
    prompt: "Generate creative writing prompts for {input}. Include genre, tone, characters, setting, and plot elements to inspire creativity.",
    seoTitle: "Writing Prompt Generator | Spark Creative Writing",
    seoDescription: "Generate creative writing prompts for fiction and non-fiction. Spark creativity with detailed writing inspiration and ideas."
  }
];

export const categories = [
  "AI Writing Tools",
  "Creator Tools", 
  "Business Productivity Tools",
  "Marketing & SEO Tools",
  "Image Tools",
  "AI Prompt Tools"
];

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
    tool.category.toLowerCase().includes(lowercaseQuery)
  );
}
