'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Palette, Brush, PenTool, CheckCircle, ArrowRight, Star, Zap, Shield, Image, Layers, Sparkles } from 'lucide-react';
import { tools, getToolsByCategory } from '@/lib/tools';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ToolCard from '@/components/ToolCard';

export default function ArtCreativeDesignCategoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const categoryTools = getToolsByCategory('Art & Creative Design');
  
  const filteredTools = categoryTools.filter(tool =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const artTools = [
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Logo Maker",
      description: "Design professional logos for your brand",
      features: ["Vector graphics", "Brand kits", "Icon design", "Business cards"]
    },
    {
      icon: <Brush className="h-6 w-6" />,
      title: "Art Generation",
      description: "Create stunning digital artwork",
      features: ["Multiple styles", "High resolution", "Custom prompts", "Artistic effects"]
    },
    {
      icon: <Layers className="h-6 w-6" />,
      title: "Graphic Design",
      description: "Professional design templates",
      features: ["Posters", "Flyers", "Brochures", "Social media graphics"]
    },
    {
      icon: <Image className="h-6 w-6" />,
      title: "Image Editing",
      description: "Enhance and modify images",
      features: ["Filters", "Effects", "Retouching", "Color correction"]
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Creative Templates",
      description: "Ready-to-use design templates",
      features: ["Business cards", "Social posts", "Presentations", "Marketing materials"]
    }
  ];

  const artStyles = [
    { name: "Modern", description: "Clean & minimal", color: "bg-gradient-to-r from-gray-600 to-gray-800" },
    { name: "Vintage", description: "Retro & classic", color: "bg-gradient-to-r from-amber-600 to-orange-600" },
    { name: "Abstract", description: "Artistic & creative", color: "bg-gradient-to-r from-purple-600 to-pink-600" },
    { name: "Minimalist", description: "Simple & elegant", color: "bg-gradient-to-r from-blue-600 to-cyan-600" },
    { name: "Bold", description: "Vibrant & striking", color: "bg-gradient-to-r from-red-600 to-pink-600" },
    { name: "Elegant", description: "Sophisticated", color: "bg-gradient-to-r from-indigo-600 to-purple-600" }
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
                <Palette className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Art & Creative Design Tools
            </h1>
            <p className="text-xl md:text-2xl text-pink-100 mb-8 max-w-3xl mx-auto">
              Unleash your creativity with AI-powered design tools. Create stunning logos, artwork, and graphics that captivate.
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

      {/* Art Styles Section */}
      <div className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Design Styles for Every Vision
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Choose from various artistic styles to match your brand and creative needs
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {artStyles.map((style, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 ${style.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <Brush className="h-8 w-8 text-white" />
                </div>
                <div className="font-semibold text-gray-900 dark:text-white">{style.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{style.description}</div>
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
              <div className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-2">2M+</div>
              <div className="text-gray-600 dark:text-gray-400">Designs Created</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-2">500K+</div>
              <div className="text-gray-600 dark:text-gray-400">Logos Generated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-2">100+</div>
              <div className="text-gray-600 dark:text-gray-400">Design Templates</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-2">4.9/5</div>
              <div className="text-gray-600 dark:text-gray-400">Designer Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need for Creative Excellence
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our AI design tools help you create professional graphics and artwork effortlessly.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artTools.map((tool, index) => (
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
              How to Create Stunning Designs
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Transform your creative ideas into professional designs in 3 simple steps.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-pink-100 dark:bg-pink-900 rounded-full">
                  <span className="text-2xl font-bold text-pink-600 dark:text-pink-400">1</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Describe Your Vision</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Explain what you want to create in detail or choose a template.
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-pink-100 dark:bg-pink-900 rounded-full">
                  <span className="text-2xl font-bold text-pink-600 dark:text-pink-400">2</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Customize Design</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Adjust colors, fonts, and layout to match your brand.
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-pink-100 dark:bg-pink-900 rounded-full">
                  <span className="text-2xl font-bold text-pink-600 dark:text-pink-400">3</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Download & Use</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Export your design in high quality and use it anywhere.
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
              Art & Creative Design Tools
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Professional AI-powered tools for creative design.
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
                placeholder="Search design tools..."
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
              <p className="text-gray-500 dark:text-gray-400">No design tools found matching your search.</p>
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
                Why Choose Our Design Tools?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <Zap className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Professional Quality</h3>
                    <p className="text-gray-600 dark:text-gray-400">Create studio-quality designs in minutes.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <Star className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Brand Consistency</h3>
                    <p className="text-gray-600 dark:text-gray-400">Maintain consistent branding across all designs.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <Shield className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Commercial Rights</h3>
                    <p className="text-gray-600 dark:text-gray-400">Full commercial license for all designs.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-2xl p-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Design Quality</span>
                  <span className="text-2xl font-bold text-pink-600 dark:text-pink-400">4K</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Creation Speed</span>
                  <span className="text-2xl font-bold text-pink-600 dark:text-pink-400">30s</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Template Library</span>
                  <span className="text-2xl font-bold text-pink-600 dark:text-pink-400">100+</span>
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
