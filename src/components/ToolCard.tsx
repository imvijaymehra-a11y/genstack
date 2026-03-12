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
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-2xl transition-all duration-300 hover:border-indigo-500/50 hover:scale-105 cursor-pointer group h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3 flex-1">
            <div className="p-2 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-lg group-hover:shadow-lg transition-all duration-300">
              <Sparkles className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {tool.name}
              </h3>
              <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                {tool.category}
              </p>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-all duration-300 transform group-hover:translate-x-1" />
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 line-clamp-2 text-sm leading-relaxed">
          {tool.description}
        </p>
      </div>
    </Link>
  );
}
