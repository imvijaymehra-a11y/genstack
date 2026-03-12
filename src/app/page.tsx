import Link from 'next/link';
import { ArrowRight, Sparkles, Zap, Shield, Users, BarChart3, CheckCircle } from 'lucide-react';
import { tools, categories } from '@/lib/tools';
import ToolCard from '@/components/ToolCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function HomePage() {
  const popularTools = tools.slice(0, 6);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full border border-indigo-200 dark:border-indigo-700">
                <Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-400 mr-2" />
                <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">Welcome to the future of content creation</span>
              </div>
            </div>
            
<h1 className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
                Your AI Sidekick for Content, Creativity & Copy
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              41 powerful tools under one roof – write, brainstorm, design and scale faster than ever.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/tools"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                Explore All Tools
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose GenStacker?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              One platform. Endless possibilities. Empower your ideas with smart, fast, and reliable AI tools.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-xl bg-white dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900/30 dark:to-indigo-900/50 rounded-lg">
                  <Zap className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Lightning Fast
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Generate content in seconds, not hours. Our AI is optimized for speed.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-white dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-900/50 rounded-lg">
                  <Shield className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                High Quality
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Professional-grade content that meets your standards every time.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-white dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-lg">
                  <Users className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                User Friendly
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Simple interface designed for everyone, no technical skills required.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-white dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-lg">
                  <BarChart3 className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Analytics
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Track your usage and optimize your content creation workflow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tool Categories */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Explore by Category
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Find the perfect tool for your specific needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/tools?category=${encodeURIComponent(category)}`}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:border-primary hover:scale-105 group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                      {category}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      {tools.filter(tool => tool.category === category).length} tools available
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Tools */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Popular Tools
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Try our most popular AI tools to get started.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/tools"
              className="inline-flex items-center px-8 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              View All {tools.length} Tools
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Start creating amazing content in three simple steps.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold">
                  1
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Choose a Tool
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Browse our collection of 41 AI tools and select the one that fits your needs.
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold">
                  2
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Input Your Request
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Provide details about what you want to create. The more specific, the better.
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold">
                  3
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Generate & Copy
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get your AI-generated content instantly and copy it with one click.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Create Amazing Content?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already using GenStacker to create content faster and better.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-100 text-indigo-600 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Start Free Trial
              <CheckCircle className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center justify-center px-8 py-4 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold rounded-xl transition-all duration-300 border border-indigo-500"
            >
              Browse Tools
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
