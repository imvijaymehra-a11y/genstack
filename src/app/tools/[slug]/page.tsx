import { getToolBySlug } from '@/lib/tools';
import { generateSeoMetadata } from '@/lib/utils';
import ToolPageClient from './ToolPageClient';

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const tool = getToolBySlug(params.slug);
  
  if (!tool) {
    return {
      title: 'Tool Not Found | GenStacker',
      description: 'The requested AI tool could not be found.',
    };
  }

  return generateSeoMetadata(tool);
}

export default function ToolPage({ params }: { params: { slug: string } }) {
  return <ToolPageClient slug={params.slug} />;
}
