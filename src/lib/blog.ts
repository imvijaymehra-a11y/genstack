export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: number;
  image: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "ai-content-creation-trends-2024",
    title: "AI Content Creation Trends to Watch in 2024",
    excerpt: "Discover the latest trends in AI-powered content creation and how to leverage them for maximum impact.",
    category: "AI Trends",
    author: "Sarah Johnson",
    date: "2024-03-10",
    readTime: 8,
    image: "https://images.unsplash.com/photo-1677442d019cecf123d5a32601176ee404f32aff9?w=800",
    tags: ["AI", "Content", "Trends"],
    content: "The world of AI content creation is evolving rapidly. From advanced language models to multimodal systems, businesses have more tools than ever to scale their content production. In this guide, we explore the trends shaping 2024..."
  },
  {
    id: "2",
    slug: "how-to-write-better-prompts",
    title: "The Art of Writing Better AI Prompts", 
    excerpt: "Learn proven techniques to craft prompts that get you better results from AI tools.",
    category: "How-To Guides",
    author: "Michael Chen",
    date: "2024-03-08",
    readTime: 10,
    image: "https://images.unsplash.com/photo-1516534775068-bb57e39c1016?w=800",
    tags: ["Prompts", "AI", "Guide"],
    content: "Writing effective prompts is both an art and a science. The better your prompt, the better your results. Discover the key principles..."
  },
  {
    id: "3",
    slug: "marketing-automation-with-ai",
    title: "Automate Your Marketing with AI Tools",
    excerpt: "Streamline your marketing workflow and save hours with AI-powered automation.",
    category: "Marketing",
    author: "Emily Rodriguez",
    date: "2024-03-05",
    readTime: 12,
    image: "https://images.unsplash.com/photo-1460925895917-adf4e7df5b31?w=800",
    tags: ["Marketing", "Automation", "AI"],
    content: "Marketing automation powered by AI can transform your workflow. Learn how to implement AI tools to handle routine tasks..."
  },
  {
    id: "4",
    slug: "seo-content-writing-with-ai",
    title: "SEO-First Content Writing Using AI",
    excerpt: "Create SEO-optimized content faster with AI assistance while maintaining quality and authenticity.",
    category: "SEO",
    author: "David Kim",
    date: "2024-03-01",
    readTime: 9,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800",
    tags: ["SEO", "Content", "Writing"],
    content: "SEO and AI go hand-in-hand in modern content creation. Discover how to leverage AI tools for keyword research, content optimization..."
  },
  {
    id: "5",
    slug: "personal-branding-with-ai",
    title: "Build Your Personal Brand with AI Content",
    excerpt: "Use AI tools to create consistent, high-quality personal brand content across all platforms.",
    category: "Personal Branding",
    author: "Jessica Martinez",
    date: "2024-02-28",
    readTime: 11,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
    tags: ["Branding", "Personal", "Social Media"],
    content: "Your personal brand is your most valuable asset. Learn how to use AI tools to create compelling content that builds your authority..."
  },
  {
    id: "6",
    slug: "ai-for-small-business",
    title: "How Small Businesses Can Leverage AI",
    excerpt: "Practical strategies for small businesses to compete with bigger players using AI tools.",
    category: "Small Business",
    author: "Robert Thompson",
    date: "2024-02-25",
    readTime: 10,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
    tags: ["Small Business", "AI", "Growth"],
    content: "Small businesses often struggle with limited resources. AI tools level the playing field, enabling startups and small teams to..."
  }
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getRecentBlogPosts(limit: number = 3): BlogPost[] {
  return blogPosts.slice(0, limit);
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(post => post.category === category);
}

export function getBlogCategories(): string[] {
  return [...new Set(blogPosts.map(post => post.category))];
}
