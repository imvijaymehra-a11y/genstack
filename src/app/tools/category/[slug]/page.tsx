import { tools, getToolsByCategory } from '@/lib/tools';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ToolCard from '@/components/ToolCard';
import Link from 'next/link';

interface PageProps {
  params: {
    category: string;
  };
}

// Convert URL slug to category name
function slugToCategory(slug: string): string {
  const categoryMap: { [key: string]: string } = {
    'writing-editing': 'Writing & Editing',
    'social-media': 'Social Media',
    'image-generation-editing': 'Image Generation & Editing',
    'video-animation': 'Video & Animation',
    'coding-development': 'Coding & Development',
    'marketing-advertising': 'Marketing & Advertising',
    'business-management': 'Business Management',
    'art-creative-design': 'Art & Creative Design',
    'data-analytics': 'Data & Analytics',
    'education-translation': 'Education & Translation',
    'health-wellness': 'Health & Wellness',
    'music-audio': 'Music & Audio'
  };
  return categoryMap[slug] || slug;
}

export default function CategoryPage({ params }: PageProps) {
  const categoryName = slugToCategory(params.category);
  const categoryTools = getToolsByCategory(categoryName);

  if (categoryTools.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <p className="text-gray-600 mb-8">
            The category "{params.category}" doesn't exist or has no tools yet.
          </p>
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            ← Back to Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Category Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {categoryName}
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            {categoryTools.length} tools available
          </p>
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            ← Back to Home
          </Link>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>

        {categoryTools.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-600">No tools found in this category.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}