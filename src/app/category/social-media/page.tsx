'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Share2, MessageCircle, TrendingUp, Calendar, CheckCircle, ArrowRight, Star, Zap, Shield, Heart, Bookmark, Users } from 'lucide-react';
import { tools, getToolsByCategory } from '@/lib/tools';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ToolCard from '@/components/ToolCard';

export default function SocialMediaCategoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const categoryTools = getToolsByCategory('Social Media');
  
  const filteredTools = categoryTools.filter(tool =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const socialMediaTools = [
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Caption Generator",
      description: "Create engaging captions for all social platforms",
      features: ["Platform-specific", "Hashtag suggestions", "Emoji integration", "CTA optimization"]
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Content Ideas",
      description: "Generate viral content ideas and trends",
      features: ["Trending topics", "Viral potential", "Audience analysis", "Timing suggestions"]
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Content Calendar",
      description: "Plan and schedule your social media content",
      features: ["Calendar view", "Automated scheduling", "Content buckets", "Performance tracking"]
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Audience Engagement",
      description: "Create content that resonates with your audience",
      features: ["Audience insights", "Engagement tactics", "Community building", "Response templates"]
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Brand Voice",
      description: "Maintain consistent brand personality",
      features: ["Voice guidelines", "Tone adaptation", "Brand consistency", "Multi-platform sync"]
    }
  ];

  const platforms = [
    { name: "Instagram", users: "2B+", color: "bg-gradient-to-r from-purple-500 to-pink-500" },
    { name: "TikTok", users: "1B+", color: "bg-gradient-to-r from-black to-gray-800" },
    { name: "Twitter", users: "450M+", color: "bg-gradient-to-r from-blue-400 to-blue-600" },
    { name: "LinkedIn", users: "900M+", color: "bg-gradient-to-r from-blue-600 to-blue-800" },
    { name: "Facebook", users: "3B+", color: "bg-gradient-to-r from-blue-500 to-blue-700" },
    { name: "YouTube", users: "2.5B+", color: "bg-gradient-to-r from-red-500 to-red-700" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-pink-950">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-pink-600 via-purple-600 to-indigo-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Share2 className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Social Media Tools
            </h1>
            <p className="text-xl md:text-2xl text-pink-100 mb-8 max-w-3xl mx-auto">
              Create viral content, grow your audience, and dominate social media with AI-powered tools designed for engagement and growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#tools"
                className="inline-flex items-center px-8 py-4 bg-white text-pink-600 font-semibold rounded-lg hover:bg-pink-50 transition-all duration-200 group"
              >
                Explore Tools
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center px-8 py-4 bg-pink-700 text-white font-semibold rounded-lg hover:bg-pink-800 transition-all duration-200"
              >
                How It Works
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
      </div>

      {/* Platforms Section */}
      <div className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Support for All Major Platforms
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Create optimized content for every social media platform
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {platforms.map((platform, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 ${platform.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <Share2 className="h-8 w-8 text-white" />
                </div>
                <div className="font-semibold text-gray-900 dark:text-white">{platform.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{platform.users} users</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-2">500M+</div>
              <div className="text-gray-600 dark:text-gray-400">Posts Generated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-2">10M+</div>
              <div className="text-gray-600 dark:text-gray-400">Engagement Boost</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-2">85%</div>
              <div className="text-gray-600 dark:text-gray-400">Higher Reach</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-2">4.8/5</div>
              <div className="text-gray-600 dark:text-gray-400">Creator Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need for Social Media Success
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our AI social media tools help you create engaging content, grow your audience, and boost engagement.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {socialMediaTools.map((tool, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-pink-100 dark:bg-pink-900 rounded-lg mr-4">
                    {tool.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{tool.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{tool.description}</p>
                <ul className="space-y-2">
                  {tool.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How to Create Viral Social Media Content
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Transform your social media presence in 3 simple steps with our AI tools.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-pink-100 dark:bg-pink-900 rounded-full">
                  <span className="text-2xl font-bold text-pink-600 dark:text-pink-400">1</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Choose Platform</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Select your target platform and content type for optimal results.
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-pink-100 dark:bg-pink-900 rounded-full">
                  <span className="text-2xl font-bold text-pink-600 dark:text-pink-400">2</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Generate Content</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Provide your topic or let AI suggest trending content ideas.
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-pink-100 dark:bg-pink-900 rounded-full">
                  <span className="text-2xl font-bold text-pink-600 dark:text-pink-400">3</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Post & Engage</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Schedule and post your content, then watch engagement soar.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tools Section */}
      <div id="tools" className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Social Media Tools
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Professional AI-powered tools for social media success.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-sm mx-auto mb-16 pt-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search social media tools..."
                className="block w-full pl-10 pr-10 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition-all duration-200 text-sm"
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>

          {filteredTools.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No social media tools found matching your search.</p>
            </div>
          )}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Why Choose Our Social Media Tools?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <Zap className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Viral Potential</h3>
                    <p className="text-gray-600 dark:text-gray-400">Content designed to maximize shares and engagement.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <Star className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Platform Optimized</h3>
                    <p className="text-gray-600 dark:text-gray-400">Perfect formatting for every social media platform.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <Shield className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Trend Aware</h3>
                    <p className="text-gray-600 dark:text-gray-400">Always up-to-date with the latest social media trends.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-2xl p-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Engagement Rate</span>
                  <span className="text-2xl font-bold text-pink-600 dark:text-pink-400">+300%</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Time Saved</span>
                  <span className="text-2xl font-bold text-pink-600 dark:text-pink-400">80%</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Content Quality</span>
                  <span className="text-2xl font-bold text-pink-600 dark:text-pink-400">9.7/10</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
