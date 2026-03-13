'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Megaphone, Target, TrendingUp, CheckCircle, ArrowRight, Star, Zap, Shield, BarChart, Mail, Bullhorn } from 'lucide-react';
import { tools, getToolsByCategory } from '@/lib/tools';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ToolCard from '@/components/ToolCard';

export default function MarketingAdvertisingCategoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const categoryTools = getToolsByCategory('Marketing & Advertising');
  
  const filteredTools = categoryTools.filter(tool =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const marketingTools = [
    {
      icon: <Bullhorn className="h-6 w-6" />,
      title: "Ad Copy Generator",
      description: "Create compelling advertising copy",
      features: ["Headlines", "Body text", "Call-to-action", "A/B testing variations"]
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Campaign Strategy",
      description: "Develop comprehensive marketing campaigns",
      features: ["Audience targeting", "Channel selection", "Budget planning", "Timeline"]
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Marketing",
      description: "Craft engaging email campaigns",
      features: ["Subject lines", "Email templates", "Personalization", "Automation"]
    },
    {
      icon: <BarChart className="h-6 w-6" />,
      title: "Marketing Analytics",
      description: "Analyze and optimize marketing performance",
      features: ["ROI tracking", "Conversion metrics", "A/B testing", "Reports"]
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Content Strategy",
      description: "Plan and execute content marketing",
      features: ["Content calendar", "SEO optimization", "Social media", "Blog posts"]
    }
  ];

  const channels = [
    { name: "Social Media", description: "Facebook, Instagram, Twitter", color: "bg-gradient-to-r from-purple-500 to-pink-500" },
    { name: "Email", description: "Newsletter & campaigns", color: "bg-gradient-to-r from-blue-500 to-cyan-500" },
    { name: "Search Ads", description: "Google & Bing ads", color: "bg-gradient-to-r from-green-500 to-emerald-500" },
    { name: "Display Ads", description: "Banner & visual ads", color: "bg-gradient-to-r from-orange-500 to-red-500" },
    { name: "Content", description: "Blog & video marketing", color: "bg-gradient-to-r from-indigo-500 to-purple-500" },
    { name: "Influencer", description: "Partner marketing", color: "bg-gradient-to-r from-pink-500 to-rose-500" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 dark:from-gray-950 dark:via-gray-900 dark:to-orange-950">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-orange-600 via-red-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Megaphone className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Marketing & Advertising Tools
            </h1>
            <p className="text-xl md:text-2xl text-orange-100 mb-8 max-w-3xl mx-auto">
              Create powerful marketing campaigns with AI-powered tools. Generate compelling copy, strategies, and content that converts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#tools"
                className="inline-flex items-center px-8 py-4 bg-white text-orange-600 font-semibold rounded-lg hover:bg-orange-50 transition-all duration-200 group"
              >
                Explore Tools
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center px-8 py-4 bg-orange-700 text-white font-semibold rounded-lg hover:bg-orange-800 transition-all duration-200"
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

      {/* Channels Section */}
      <div className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Multi-Channel Marketing
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Create campaigns for every marketing channel and platform
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {channels.map((channel, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 ${channel.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <Target className="h-8 w-8 text-white" />
                </div>
                <div className="font-semibold text-gray-900 dark:text-white">{channel.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{channel.description}</div>
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
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">25M+</div>
              <div className="text-gray-600 dark:text-gray-400">Ads Created</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">40%</div>
              <div className="text-gray-600 dark:text-gray-400">Avg. Conversion Increase</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">15+</div>
              <div className="text-gray-600 dark:text-gray-400">Marketing Channels</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">4.8/5</div>
              <div className="text-gray-600 dark:text-gray-400">Marketer Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need for Marketing Success
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our AI marketing tools help you create campaigns that drive results and maximize ROI.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {marketingTools.map((tool, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg mr-4">
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
              How to Create Winning Campaigns
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Transform your marketing ideas into high-converting campaigns in 4 steps.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-orange-100 dark:bg-orange-900 rounded-full">
                  <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">1</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Define Goals</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Set clear marketing objectives and target audience.
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-orange-100 dark:bg-orange-900 rounded-full">
                  <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">2</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Generate Content</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Create compelling copy and visuals for your campaign.
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-orange-100 dark:bg-orange-900 rounded-full">
                  <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">3</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Launch Campaign</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Deploy across multiple channels and platforms.
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-orange-100 dark:bg-orange-900 rounded-full">
                  <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">4</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Optimize & Scale</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Analyze performance and scale successful campaigns.
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
              Marketing & Advertising Tools
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Professional AI-powered tools for modern marketing.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-12">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search marketing tools..."
                className="block w-full pl-10 pr-10 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all duration-200 text-sm"
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
              <p className="text-gray-500 dark:text-gray-400">No marketing tools found matching your search.</p>
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
                Why Choose Our Marketing Tools?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <Zap className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Higher Conversions</h3>
                    <p className="text-gray-600 dark:text-gray-400">AI-optimized copy that drives 40% more conversions.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <Star className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Multi-Channel Ready</h3>
                    <p className="text-gray-600 dark:text-gray-400">Content optimized for every marketing channel.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <Shield className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Brand Compliant</h3>
                    <p className="text-gray-600 dark:text-gray-400">Maintain consistent brand voice across all content.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Conversion Rate</span>
                  <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">+40%</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Time Saved</span>
                  <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">75%</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">ROI Improvement</span>
                  <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">3.2x</span>
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
