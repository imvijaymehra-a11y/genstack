import { tools, categories, getCategoryUrl, getFeaturedTools } from '@/lib/tools';
import ToolCard from '@/components/ToolCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Grid3X3, Star, Zap, DollarSign } from 'lucide-react';

export default function ToolsPage() {
  const featuredTools = getFeaturedTools();

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      'Writing & Editing': '✍️',
      'Social Media': '📱',
      'Image Generation & Editing': '🎨',
      'Coding & Development': '💻',
      'Marketing & Advertising': '📈',
      'Business Management': '💼',
      'Art & Creative Design': '🎭',
      'Data & Analytics': '📊',
      'Education & Translation': '📚',
      'Health & Wellness': '🏥',
      'Music & Audio': '🎵',
      'Video & Animation': '🎬'
    }
    return icons[category] || '🚀'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 bg-gradient-to-br from-indigo-400 to-indigo-500 rounded-2xl shadow-lg">
              <Zap className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-500 bg-clip-text text-transparent mb-4">
            AI Tools Directory
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            Explore our comprehensive collection of {tools.length} AI tools across {categories.length} categories. 
            Find the perfect AI solution for your needs.
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <div className="text-3xl font-bold text-indigo-600">{tools.length}</div>
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                  <Zap className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Tools</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <div className="text-3xl font-bold text-green-600">{tools.filter(t => t.pricing === 'free').length}</div>
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Free Tools</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <div className="text-3xl font-bold text-blue-600">{categories.length}</div>
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Grid3X3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Categories</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <div className="text-3xl font-bold text-yellow-600">{featuredTools.length}</div>
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                  <Star className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Featured</div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Grid3X3 className="h-6 w-6 text-indigo-600" />
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link
                key={category}
                href={getCategoryUrl(category)}
                className="p-4 rounded-xl border-2 transition-all duration-200 group border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800 hover:shadow-md"
              >
                <div className="text-2xl mb-2">{getCategoryIcon(category)}</div>
                <div className="font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  {category}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{tools.filter(t => t.category === category).length} tools</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Tools Section */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <div className="p-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg mr-3">
              <Star className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Featured Tools</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTools.slice(0, 6).map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </div>

        {/* All Tools */}
        <div>
          <div className="flex items-center mb-6">
            <div className="p-2 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg mr-3">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">All Tools</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}
