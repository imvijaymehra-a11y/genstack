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
  return {
    title: tool.seoTitle || `${tool.name} | GenStacker AI Tools`,
    description: tool.seoDescription || tool.description,
    openGraph: {
      title: tool.seoTitle || `${tool.name} | GenStacker AI Tools`,
      description: tool.seoDescription || tool.description,
      type: 'website',
      url: `https://genstacker.com/tools/${tool.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: tool.seoTitle || `${tool.name} | GenStacker AI Tools`,
      description: tool.seoDescription || tool.description,
    },
    alternates: {
      canonical: `https://genstacker.com/tools/${tool.slug}`,
    },
  };
}
