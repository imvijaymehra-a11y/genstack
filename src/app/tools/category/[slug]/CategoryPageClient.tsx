'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { tools, getToolsByCategory } from '@/lib/tools';
import ToolCard from '@/components/ToolCard';

interface CategoryPageClientProps {
  categoryName: string;
  categoryTools: any[];
  config: {
    color: string;
    icon: string;
    description: string;
  };
}

export default function CategoryPageClient({ 
  categoryName, 
  categoryTools, 
  config 
}: CategoryPageClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredTools = categoryTools.filter((tool: any) =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.tags?.some((tag: any) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <>
      {/* Search Bar */}
      <div className="max-w-sm mx-auto mb-16 pt-8 -mt-8 relative z-10">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${categoryName.toLowerCase()} tools...`}
            className="block w-full pl-10 pr-10 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all duration-200 text-sm shadow-lg"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Tools Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {filteredTools.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No tools found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search terms or browse all tools in this category.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool: any) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
