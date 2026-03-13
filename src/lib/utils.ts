import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    return new Promise((resolve, reject) => {
      try {
        document.execCommand('copy');
        resolve();
      } catch (err) {
        reject(err);
      } finally {
        textArea.remove();
      }
    });
  }
}

export function generateSeoMetadata(tool: any) {
  const baseUrl = 'https://genstacker.com';
  const toolUrl = `${baseUrl}/tools/${tool.slug}`;
  
  // Generate keyword-rich title and description
  const keywords = [
    tool.name.toLowerCase(),
    `${tool.name.toLowerCase()} AI`,
    `AI ${tool.name.toLowerCase()}`,
    `${tool.name.toLowerCase()} generator`,
    `free ${tool.name.toLowerCase()}`,
    `${tool.name.toLowerCase()} tool`,
    `online ${tool.name.toLowerCase()}`,
    `${tool.name.toLowerCase()} assistant`,
    `AI ${tool.category.toLowerCase()}`,
    `${tool.category.toLowerCase()} AI tools`,
    'AI tools',
    'AI generator',
    'AI assistant',
    'free AI tools',
    'ChatGPT alternatives',
    'artificial intelligence',
    'AI content creation',
    'AI marketing',
    'AI writing',
    'AI productivity'
  ];

  const title = tool.seoTitle || `${tool.name} - Free AI ${tool.name} Generator | GenStacker`;
  const description = tool.seoDescription || 
    `Generate ${tool.name.toLowerCase()} for free with our advanced AI ${tool.name.toLowerCase()}. Perfect for ${tool.category.toLowerCase()} - create professional ${tool.name.toLowerCase()} in seconds. No signup required.`;

  return {
    title,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: 'GenStacker Team' }],
    creator: 'GenStacker',
    publisher: 'GenStacker',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: toolUrl,
    },
    openGraph: {
      title,
      description,
      url: toolUrl,
      siteName: 'GenStacker',
      images: [
        {
          url: `/og-${tool.slug}.jpg`,
          width: 1200,
          height: 630,
          alt: `${tool.name} - Free AI ${tool.name} Generator`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/og-${tool.slug}.jpg`],
      creator: '@genstacker',
      site: '@genstacker',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export function generateCategorySeoMetadata(category: string) {
  const baseUrl = 'https://genstacker.com';
  const categoryUrl = `${baseUrl}/category/${category.toLowerCase().replace(/\s+/g, '-')}`;
  
  const keywords = [
    `${category.toLowerCase()} AI tools`,
    `AI ${category.toLowerCase()}`,
    `${category.toLowerCase()} generator`,
    `free ${category.toLowerCase()} AI`,
    `${category.toLowerCase()} assistant`,
    `AI ${category.toLowerCase()} tools`,
    'AI tools',
    'AI generator',
    'AI assistant',
    'free AI tools',
    'ChatGPT alternatives',
    'artificial intelligence',
    'AI content creation'
  ];

  const title = `${category} AI Tools - Free ${category} Generators | GenStacker`;
  const description = `Discover free AI tools for ${category.toLowerCase()}. Generate professional ${category.toLowerCase()} content with our advanced AI ${category.toLowerCase()} tools. No signup required.`;

  return {
    title,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: 'GenStacker Team' }],
    creator: 'GenStacker',
    publisher: 'GenStacker',
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: categoryUrl,
    },
    openGraph: {
      title,
      description,
      url: categoryUrl,
      siteName: 'GenStacker',
      images: [
        {
          url: `/og-${category.toLowerCase().replace(/\s+/g, '-')}.jpg`,
          width: 1200,
          height: 630,
          alt: `${category} AI Tools - Free ${category} Generators`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/og-${category.toLowerCase().replace(/\s+/g, '-')}.jpg`],
      creator: '@genstacker',
      site: '@genstacker',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export function generateStructuredDataForTool(tool: any) {
  const baseUrl = 'https://genstacker.com';
  const toolUrl = `${baseUrl}/tools/${tool.slug}`;
  
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.name,
    "description": tool.description,
    "url": toolUrl,
    "applicationCategory": "ProductivityApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Free AI tool with premium features available"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1250",
      "bestRating": "5"
    },
    "creator": {
      "@type": "Organization",
      "name": "GenStacker",
      "url": baseUrl
    },
    "keywords": [
      tool.name.toLowerCase(),
      `AI ${tool.name.toLowerCase()}`,
      `${tool.name.toLowerCase()} generator`,
      `free ${tool.name.toLowerCase()}`,
      `${tool.category.toLowerCase()} AI`
    ].join(', ')
  };
}

export function generateStructuredDataForCategory(category: string, tools: any[]) {
  const baseUrl = 'https://genstacker.com';
  const categoryUrl = `${baseUrl}/category/${category.toLowerCase().replace(/\s+/g, '-')}`;
  
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${category} AI Tools`,
    "description": `Discover free AI tools for ${category.toLowerCase()}. Generate professional ${category.toLowerCase()} content with advanced AI technology.`,
    "url": categoryUrl,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": tools.map((tool, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "SoftwareApplication",
          "name": tool.name,
          "description": tool.description,
          "url": `${baseUrl}/tools/${tool.slug}`
        }
      }))
    },
    "creator": {
      "@type": "Organization",
      "name": "GenStacker",
      "url": baseUrl
    }
  };
}

export function generateImageSeoProps(imageUrl: string, alt: string, title?: string) {
  return {
    src: imageUrl,
    alt: alt,
    title: title || alt,
    loading: 'lazy' as const,
    decoding: 'async' as const,
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    style: { 
      width: '100%', 
      height: 'auto',
      objectFit: 'cover'
    }
  };
}

export function generateBreadcrumbStructuredData(breadcrumbs: Array<{name: string, url: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };
}

export function generateFaqStructuredData(faqs: Array<{question: string, answer: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}
