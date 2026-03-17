export interface Tool {
  slug: string;
  name: string;
  description: string;
  prompt: string;
}

export const tools: Tool[] = [
  {
    slug: "blog-generator",
    name: "Blog Generator",
    description: "Generate SEO optimized blog posts with engaging content",
    prompt: "Write a detailed SEO optimized blog post about {input}. Include a compelling title, introduction, main content with headings, and conclusion. Make it engaging and informative."
  },
  {
    slug: "seo-title-generator",
    name: "SEO Title Generator",
    description: "Generate compelling SEO titles that rank well in search engines",
    prompt: "Generate 5 compelling SEO titles for: {input}. Make them click-worthy, under 60 characters, and optimized for search engines."
  },
  {
    slug: "product-description-generator",
    name: "Product Description Generator",
    description: "Create persuasive product descriptions that drive sales",
    prompt: "Write a compelling product description for: {input}. Include key features, benefits, and a call-to-action. Make it persuasive and professional."
  },
  {
    slug: "youtube-script-generator",
    name: "YouTube Script Generator",
    description: "Generate engaging YouTube video scripts",
    prompt: "Write a YouTube video script about: {input}. Include an engaging hook, main content with key points, and a call-to-action. Make it conversational and engaging for viewers."
  },
  {
    slug: "ad-copy-generator",
    name: "Ad Copy Generator",
    description: "Create compelling advertising copy for various platforms",
    prompt: "Write compelling ad copy for: {input}. Create 3 variations for different platforms (Facebook, Google Ads, Instagram). Make them persuasive and action-oriented."
  }
];

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find(tool => tool.slug === slug);
}

export function getAllTools(): Tool[] {
  return tools;
}
