import { getToolBySlug } from '@/lib/tools';
import { generateSeoMetadata, generateStructuredDataForTool, generateBreadcrumbStructuredData } from '@/lib/utils';
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
  const tool = getToolBySlug(params.slug);
  
  if (!tool) {
    return <ToolPageClient slug={params.slug} />;
  }

  // Generate structured data
  const structuredData = generateStructuredDataForTool(tool);
  const breadcrumbData = generateBreadcrumbStructuredData([
    { name: 'Home', url: 'https://genstacker.com' },
    { name: 'AI Tools', url: 'https://genstacker.com/tools' },
    { name: tool.name, url: `https://genstacker.com/tools/${tool.slug}` }
  ]);

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      
      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData)
        }}
      />
      
      <ToolPageClient slug={params.slug} />
    </>
  );
}
