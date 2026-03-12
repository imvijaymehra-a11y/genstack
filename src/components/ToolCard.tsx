import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

interface ToolCardProps {
  tool: {
    slug: string;
    name: string;
    description: string;
    category: string;
  };
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link href={`/tools/${tool.slug}`}>
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:border-primary hover:scale-105 cursor-pointer group">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                {tool.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {tool.category}
              </p>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors" />
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
          {tool.description}
        </p>
      </div>
    </Link>
  );
}
