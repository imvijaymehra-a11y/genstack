import Link from 'next/link';
import { ArrowRight, Sparkles, Zap, Shield, Users, BarChart3, CheckCircle, TrendingUp, Star, ArrowUp } from 'lucide-react';
import { tools, categories } from '@/lib/tools';
import ToolCard from '@/components/ToolCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function HomePage() {
  const popularTools = tools.slice(0, 6);
  const featuredTools = tools.filter(tool => tool.featured).slice(0, 3);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"></div>
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-gradient-to-br from-indigo-100/20 to-purple-100/20 dark:from-indigo-900/10 dark:to-purple-900/10 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full border border-indigo-200 dark:border-indigo-700">
                <Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-400 mr-2" />
                <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                  Trusted by 10,000+ creators
                </span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6 leading-tight">
              Your AI Sidekick for Content, Creativity & Copy
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">41 powerful tools</span> under one roof – write, brainstorm, design and scale faster than ever.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                href="/tools"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                Explore All Tools
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/auth/signup"
                className="inline-flex items-center px-8 py-4 bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 font-semibold rounded-xl transition-all duration-300 border-2 border-indigo-200 dark:border-indigo-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 transform hover:scale-105 shadow-lg"
              >
                Start Free Trial
                <CheckCircle className="ml-2 h-5 w-5" />
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
              <div className="text-center">
                <div className="flex justify-center items-center mb-2">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                    <Zap className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">41+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">AI Tools</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center items-center mb-2">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">10K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Active Users</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center items-center mb-2">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">1M+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Content Created</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center items-center mb-2">
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                    <Star className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">99.9%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full border border-yellow-200 dark:border-yellow-700 mb-4">
              <Star className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mr-2" />
              <span className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">
                Featured Tools
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Try Our Most Popular AI Tools
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Hand-picked tools that creators love and use daily
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTools.map((tool) => (
              <div key={tool.slug} className="relative group">
                <div className="absolute -top-3 -right-3 z-10">
                  <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold rounded-full shadow-lg">
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    Featured
                  </div>
                </div>
                <ToolCard tool={tool} />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/tools"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              View All {tools.length} Tools
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
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
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-900/50 border border-indigo-200 dark:border-indigo-700 hover:shadow-lg transition-all duration-300 hover:scale-105 group">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900/50 dark:to-indigo-900/70 rounded-lg group-hover:shadow-lg transition-all duration-300">
                  <Zap className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                Lightning Fast
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Generate content in seconds, not hours. Our AI is optimized for speed.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-900/50 border border-purple-200 dark:border-purple-700 hover:shadow-lg transition-all duration-300 hover:scale-105 group">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/50 dark:to-purple-900/70 rounded-lg group-hover:shadow-lg transition-all duration-300">
                  <Shield className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                High Quality
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Professional-grade content that meets your standards every time.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-900/50 border border-green-200 dark:border-green-700 hover:shadow-lg transition-all duration-300 hover:scale-105 group">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/50 dark:to-green-900/70 rounded-lg group-hover:shadow-lg transition-all duration-300">
                  <Users className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                User Friendly
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Simple interface designed for everyone, no technical skills required.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-900/50 border border-orange-200 dark:border-orange-700 hover:shadow-lg transition-all duration-300 hover:scale-105 group">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/50 dark:to-orange-900/70 rounded-lg group-hover:shadow-lg transition-all duration-300">
                  <BarChart3 className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
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
              Find the perfect tool for your specific needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/tools?category=${encodeURIComponent(category)}`}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-indigo-500 dark:hover:border-indigo-400 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {category}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {tools.filter(tool => tool.category === category).length} tools available
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-sm font-medium">Explore</span>
                    <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                
                {/* Category Icons */}
                <div className="flex items-center space-x-4 text-gray-400 dark:text-gray-500">
                  {category.includes('Writing') && <span className="text-2xl">✍️</span>}
                  {category.includes('Image') && <span className="text-2xl">🎨</span>}
                  {category.includes('Video') && <span className="text-2xl">🎬</span>}
                  {category.includes('Coding') && <span className="text-2xl">💻</span>}
                  {category.includes('Marketing') && <span className="text-2xl">📈</span>}
                  {category.includes('Business') && <span className="text-2xl">💼</span>}
                  {category.includes('Education') && <span className="text-2xl">📚</span>}
                  {category.includes('Music') && <span className="text-2xl">🎵</span>}
                  {category.includes('Health') && <span className="text-2xl">🏥</span>}
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
              Popular Tools This Week
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Try our most popular AI tools to get started
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularTools.map((tool) => (
              <div key={tool.slug} className="relative">
                {tool.isNew && (
                  <div className="absolute -top-3 -right-3 z-10">
                    <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-green-400 to-emerald-400 text-white text-xs font-bold rounded-full shadow-lg">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      New
                    </div>
                  </div>
                )}
                <ToolCard tool={tool} />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/tools"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
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
              Start creating amazing content in three simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                  1
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Choose a Tool
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Browse our collection of 41+ AI tools and select the one that fits your needs
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                  2
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Input Your Request
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Provide details about what you want to create. The more specific, the better
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                  3
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Generate & Copy
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get your AI-generated content instantly and copy it with one click
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-indigo-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Create Amazing Content?
            </h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already using GenStacker to create content faster and better
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/signup"
                className="inline-flex items-center px-8 py-4 bg-white hover:bg-gray-100 text-indigo-600 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                Start Free Trial
                <CheckCircle className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/tools"
                className="inline-flex items-center px-8 py-4 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold rounded-xl transition-all duration-300 border-2 border-indigo-500 transform hover:scale-105"
              >
                Browse Tools
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
