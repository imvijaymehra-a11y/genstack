import Link from 'next/link';
import { ArrowRight, Sparkles, Star, DollarSign, Zap, List } from 'lucide-react';
import { generateImageSeoProps } from '@/lib/utils';

interface ToolCardProps {
  tool: {
    slug: string;
    name: string;
    description: string;
    category: string;
    featured?: boolean;
    pricing?: 'free' | 'freemium' | 'paid';
    tags?: string[];
    image?: string;
  };
  viewMode?: 'grid' | 'list';
}

export default function ToolCard({ tool, viewMode = 'grid' }: ToolCardProps) {
  const getPricingColor = (pricing?: string) => {
    switch (pricing) {
      case 'free':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'freemium':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'paid':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const imageUrl = tool.image || `/api/og/${tool.slug}`;
  const imageAlt = `${tool.name} - Free AI ${tool.name} Generator`;
  const imageTitle = `${tool.name} AI Tool - ${tool.category}`;

  const imageSeoProps = generateImageSeoProps(imageUrl, imageAlt, imageTitle);

  const getPricingText = (pricing?: string) => {
    switch (pricing) {
      case 'free':
        return 'Free';
      case 'freemium':
        return 'Freemium';
      case 'paid':
        return 'Paid';
      default:
        return 'Free';
    }
  };

  if (viewMode === 'list') {
    return (
      <Link href={`/tools/${tool.slug}`}>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:border-indigo-500/50 hover:scale-[1.02] cursor-pointer group">
          <div className="flex items-center space-x-4">
            {/* Tool Icon */}
            <div className="flex-shrink-0">
              <div className="p-3 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-lg group-hover:shadow-lg transition-all duration-300">
                <Sparkles className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>

            {/* Tool Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {tool.name}
                </h3>
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                    {tool.category}
                  </p>
                  {/* Pricing Badge */}
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPricingColor(tool.pricing)}`}>
                    {getPricingText(tool.pricing)}
                  </span>
                  {/* Featured Badge */}
                  {tool.featured && (
                    <span className="flex items-center space-x-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 px-2 py-1 rounded-full text-xs font-semibold">
                      <Star className="h-3 w-3 fill-current" />
                      <span>Featured</span>
                    </span>
                  )}
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-2">
                {tool.description}
              </p>
              
              {/* Tags */}
              {tool.tags && tool.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {tool.tags.slice(0, 4).map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                  {tool.tags.length > 4 && (
                    <span className="text-xs bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 px-2 py-1 rounded">
                      +{tool.tags.length - 4}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Arrow */}
          <div className="flex-shrink-0">
            <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-all duration-300 transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/tools/${tool.slug}`}>
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 hover:border-indigo-500/50 hover:scale-105 cursor-pointer group h-full relative overflow-hidden">
        {/* Featured Badge */}
        {tool.featured && (
          <div className="absolute top-3 right-3 z-10">
            <div className="flex items-center space-x-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
              <Star className="h-3 w-3 fill-current" />
              <span>Featured</span>
            </div>
          </div>
        )}

        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3 flex-1">
            <div className="p-2.5 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-xl group-hover:shadow-lg transition-all duration-300">
              <Sparkles className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-1">
                {tool.name}
              </h3>
              <div className="flex items-center space-x-2">
                <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                  {tool.category}
                </p>
                {/* Pricing Badge */}
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${getPricingColor(tool.pricing)}`}>
                  {getPricingText(tool.pricing)}
                </span>
              </div>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-all duration-300 transform group-hover:translate-x-1" />
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 line-clamp-3 text-sm leading-relaxed mb-4">
          {tool.description}
        </p>

        {/* Tags */}
        {tool.tags && tool.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tool.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2.5 py-1.5 rounded-lg font-medium"
              >
                {tag}
              </span>
            ))}
            {tool.tags.length > 3 && (
              <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2.5 py-1.5 rounded-lg font-medium">
                +{tool.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
