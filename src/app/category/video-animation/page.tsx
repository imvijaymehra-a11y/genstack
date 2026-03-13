'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Video, Play, Film, Clapperboard, CheckCircle, ArrowRight, Star, Zap, Shield, Music, Camera, Sparkles } from 'lucide-react';
import { tools, getToolsByCategory } from '@/lib/tools';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ToolCard from '@/components/ToolCard';

export default function VideoAnimationCategoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const categoryTools = getToolsByCategory('Video & Animation');
  
  const filteredTools = categoryTools.filter(tool =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const videoTools = [
    {
      icon: <Video className="h-6 w-6" />,
      title: "Video Script Generator",
      description: "Create compelling video scripts for any topic",
      features: ["Scene descriptions", "Dialogue writing", "Camera directions", "Timing notes"]
    },
    {
      icon: <Film className="h-6 w-6" />,
      title: "Animation Creator",
      description: "Generate animated videos from text",
      features: ["2D animations", "Motion graphics", "Character animation", "Scene transitions"]
    },
    {
      icon: <Music className="h-6 w-6" />,
      title: "Video Background Music",
      description: "Create custom music for videos",
      features: ["Genre selection", "Mood matching", "Length customization", "Royalty-free"]
    },
    {
      icon: <Camera className="h-6 w-6" />,
      title: "Video Editing",
      description: "AI-powered video editing and enhancement",
      features: ["Auto-cut", "Color grading", "Effects library", "Smart transitions"]
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Video Effects",
      description: "Add professional effects to videos",
      features: ["Visual effects", "Text overlays", "Particle effects", "Green screen"]
    }
  ];

  const videoTypes = [
    { name: "YouTube", description: "Long-form content", color: "bg-gradient-to-r from-red-500 to-red-700" },
    { name: "TikTok", description: "Short viral videos", color: "bg-gradient-to-r from-black to-gray-800" },
    { name: "Instagram", description: "Stories & Reels", color: "bg-gradient-to-r from-purple-500 to-pink-500" },
    { name: "Corporate", description: "Business presentations", color: "bg-gradient-to-r from-blue-500 to-blue-700" },
    { name: "Educational", description: "Learning content", color: "bg-gradient-to-r from-green-500 to-teal-500" },
    { name: "Music Videos", description: "Visual storytelling", color: "bg-gradient-to-r from-pink-500 to-rose-500" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50 dark:from-gray-950 dark:via-gray-900 dark:to-red-950">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-red-600 via-orange-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Video className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Video & Animation Tools
            </h1>
            <p className="text-xl md:text-2xl text-red-100 mb-8 max-w-3xl mx-auto">
              Create stunning videos and animations with AI-powered tools. From scripts to final production, bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#tools"
                className="inline-flex items-center px-8 py-4 bg-white text-red-600 font-semibold rounded-lg hover:bg-red-50 transition-all duration-200 group"
              >
                Explore Tools
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center px-8 py-4 bg-red-700 text-white font-semibold rounded-lg hover:bg-red-800 transition-all duration-200"
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

      {/* Video Types Section */}
      <div className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Content for Every Platform
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Create videos optimized for all major platforms and use cases
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {videoTypes.map((type, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 ${type.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <Play className="h-8 w-8 text-white" />
                </div>
                <div className="font-semibold text-gray-900 dark:text-white">{type.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{type.description}</div>
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
              <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">5M+</div>
              <div className="text-gray-600 dark:text-gray-400">Videos Created</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">1M+</div>
              <div className="text-gray-600 dark:text-gray-400">Animations Generated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">4K</div>
              <div className="text-gray-600 dark:text-gray-400">Max Resolution</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">4.8/5</div>
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
              Everything You Need for Video Excellence
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our AI video tools help you create professional content from script to screen.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videoTools.map((tool, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg mr-4">
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
              How to Create Professional Videos
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Transform your ideas into engaging videos in 4 simple steps.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-red-100 dark:bg-red-900 rounded-full">
                  <span className="text-2xl font-bold text-red-600 dark:text-red-400">1</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Write Script</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Generate a compelling script with scenes, dialogue, and directions.
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-red-100 dark:bg-red-900 rounded-full">
                  <span className="text-2xl font-bold text-red-600 dark:text-red-400">2</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Create Visuals</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Generate animations, scenes, or add effects to bring your script to life.
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-red-100 dark:bg-red-900 rounded-full">
                  <span className="text-2xl font-bold text-red-600 dark:text-red-400">3</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Add Audio</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Include voiceovers, music, and sound effects for professional quality.
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-red-100 dark:bg-red-900 rounded-full">
                  <span className="text-2xl font-bold text-red-600 dark:text-red-400">4</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Export & Share</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Download in your preferred format and share across platforms.
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
              Video & Animation Tools
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Professional AI-powered tools for video creation and animation.
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
                placeholder="Search video tools..."
                className="block w-full pl-10 pr-10 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-red-300 focus:border-red-400 transition-all duration-200 text-sm"
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
              <p className="text-gray-500 dark:text-gray-400">No video tools found matching your search.</p>
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
                Why Choose Our Video Tools?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <Zap className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Fast Production</h3>
                    <p className="text-gray-600 dark:text-gray-400">Create professional videos in minutes, not days.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <Star className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Studio Quality</h3>
                    <p className="text-gray-600 dark:text-gray-400">Get broadcast-quality videos suitable for any platform.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <Shield className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Platform Optimized</h3>
                    <p className="text-gray-600 dark:text-gray-400">Videos perfectly formatted for every social platform.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl p-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Export Quality</span>
                  <span className="text-2xl font-bold text-red-600 dark:text-red-400">4K</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Render Time</span>
                  <span className="text-2xl font-bold text-red-600 dark:text-red-400">60s</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Format Options</span>
                  <span className="text-2xl font-bold text-red-600 dark:text-red-400">10+</span>
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
