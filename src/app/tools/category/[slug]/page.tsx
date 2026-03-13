import Link from 'next/link';
import { ArrowRight, Star, Zap, Shield } from 'lucide-react';
import { tools, getToolsByCategory } from '@/lib/tools';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CategoryPageClient from './CategoryPageClient';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

// Convert category name to URL-friendly slug
function categoryToSlug(category: string): string {
  return category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// Convert URL slug back to category name
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

export default function CategoryPage({ params }: CategoryPageProps) {
  const categoryName = slugToCategory(params.slug);
  const categoryTools = getToolsByCategory(categoryName);

  // Category-specific colors and icons
  const categoryConfig: { [key: string]: { color: string; icon: string; description: string } } = {
    'Writing & Editing': {
      color: 'from-blue-600 to-indigo-600',
      icon: '✍️',
      description: 'Create compelling content with AI-powered writing tools'
    },
    'Social Media': {
      color: 'from-pink-600 to-purple-600',
      icon: '📱',
      description: 'Boost your social media presence with smart content generation'
    },
    'Image Generation & Editing': {
      color: 'from-green-600 to-teal-600',
      icon: '🎨',
      description: 'Create stunning visuals and edit images with AI assistance'
    },
    'Video & Animation': {
      color: 'from-red-600 to-orange-600',
      icon: '🎬',
      description: 'Produce engaging video content and animations effortlessly'
    },
    'Coding & Development': {
      color: 'from-gray-700 to-gray-900',
      icon: '💻',
      description: 'Accelerate development with AI-powered coding tools'
    },
    'Marketing & Advertising': {
      color: 'from-purple-600 to-pink-600',
      icon: '📢',
      description: 'Create compelling marketing campaigns and advertising copy'
    },
    'Business Management': {
      color: 'from-indigo-600 to-blue-600',
      icon: '💼',
      description: 'Streamline business operations with intelligent management tools'
    },
    'Art & Creative Design': {
      color: 'from-yellow-600 to-red-600',
      icon: '🎨',
      description: 'Unleash creativity with AI-powered design tools'
    },
    'Data & Analytics': {
      color: 'from-cyan-600 to-blue-600',
      icon: '📊',
      description: 'Analyze data and gain insights with advanced analytics tools'
    },
    'Education & Translation': {
      color: 'from-emerald-600 to-green-600',
      icon: '🎓',
      description: 'Enhance learning and break language barriers with educational tools'
    },
    'Health & Wellness': {
      color: 'from-teal-600 to-cyan-600',
      icon: '🏥',
      description: 'Maintain health and wellness with personalized AI guidance'
    },
    'Music & Audio': {
      color: 'from-purple-600 to-indigo-600',
      icon: '🎵',
      description: 'Create and edit music with AI-powered audio tools'
    }
  };

  const config = categoryConfig[categoryName] || {
    color: 'from-gray-600 to-gray-800',
    icon: '🔧',
    description: 'Discover powerful AI tools for this category'
  };

  if (categoryTools.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Category Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              The category "{params.slug}" doesn't exist or has no tools yet.
            </p>
            <Link 
              href="/"
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Back to Home
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      {/* Hero Section */}
      <div className={`bg-gradient-to-r ${config.color} text-white py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-6xl mb-4">{config.icon}</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {categoryName}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              {config.description}
            </p>
            <div className="mt-8 flex items-center justify-center space-x-8">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg backdrop-blur-sm">
                  <span className="text-2xl font-bold">{categoryTools.length}</span>
                </div>
                <span className="ml-3 text-white/90">Tools Available</span>
              </div>
              <div className="flex items-center">
                <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Zap className="h-6 w-6" />
                </div>
                <span className="ml-3 text-white/90">Lightning Fast</span>
              </div>
              <div className="flex items-center">
                <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Shield className="h-6 w-6" />
                </div>
                <span className="ml-3 text-white/90">Secure & Private</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CategoryPageClient 
        categoryName={categoryName}
        categoryTools={categoryTools}
        config={config}
      />

      {/* Features Section */}
      <div className="bg-white dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Our {categoryName} Tools?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Experience the power of AI with our comprehensive suite of {categoryName.toLowerCase()} tools designed to boost your productivity.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-2xl mb-4 mx-auto">
                <Star className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Professional Quality
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get professional-grade results with advanced AI technology
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-2xl mb-4 mx-auto">
                <Zap className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Lightning Fast
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Generate results in seconds, not minutes or hours
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-2xl mb-4 mx-auto">
                <Shield className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Secure & Private
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Your data is protected with enterprise-grade security
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  const categories = Array.from(new Set(tools.map(tool => tool.category)));
  
  return categories.map((category) => ({
    slug: categoryToSlug(category),
  }));
}
