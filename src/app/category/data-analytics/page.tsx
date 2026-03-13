'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, BarChart, TrendingUp, Database, CheckCircle, ArrowRight, Star, Zap, Shield, PieChart, Activity, FileSpreadsheet } from 'lucide-react';
import { tools, getToolsByCategory } from '@/lib/tools';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ToolCard from '@/components/ToolCard';

export default function DataAnalyticsCategoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const categoryTools = getToolsByCategory('Data & Analytics');
  
  const filteredTools = categoryTools.filter(tool =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const analyticsTools = [
    {
      icon: <BarChart className="h-6 w-6" />,
      title: "Data Analysis",
      description: "Analyze complex datasets with AI",
      features: ["Statistical analysis", "Pattern recognition", "Data cleaning", "Visualization"]
    },
    {
      icon: <PieChart className="h-6 w-6" />,
      title: "Report Generator",
      description: "Create comprehensive analytical reports",
      features: ["Executive summaries", "Charts & graphs", "Insights", "Recommendations"]
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Data Processing",
      description: "Transform and process raw data",
      features: ["ETL pipelines", "Data validation", "Format conversion", "Automation"]
    },
    {
      icon: <Activity className="h-6 w-6" />,
      title: "Predictive Analytics",
      description: "Forecast trends and outcomes",
      features: ["Machine learning", "Time series", "Regression models", "Accuracy scoring"]
    },
    {
      icon: <FileSpreadsheet className="h-6 w-6" />,
      title: "Excel Analytics",
      description: "Advanced spreadsheet analysis",
      features: ["Formulas", "Pivot tables", "Data modeling", "Dashboard creation"]
    }
  ];

  const dataTypes = [
    { name: "Sales Data", description: "Revenue & transactions", color: "bg-gradient-to-r from-green-500 to-emerald-500" },
    { name: "Customer Data", description: "Behavior & demographics", color: "bg-gradient-to-r from-blue-500 to-cyan-500" },
    { name: "Web Analytics", description: "Traffic & engagement", color: "bg-gradient-to-r from-purple-500 to-indigo-500" },
    { name: "Financial Data", description: "Revenue & costs", color: "bg-gradient-to-r from-orange-500 to-red-500" },
    { name: "Marketing Data", description: "Campaign performance", color: "bg-gradient-to-r from-pink-500 to-rose-500" },
    { name: "Operational Data", description: "Process metrics", color: "bg-gradient-to-r from-teal-500 to-green-500" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <BarChart className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Data & Analytics Tools
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 mb-8 max-w-3xl mx-auto">
              Transform raw data into actionable insights with AI-powered analytics. Analyze, visualize, and predict with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#tools"
                className="inline-flex items-center px-8 py-4 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-all duration-200 group"
              >
                Explore Tools
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center px-8 py-4 bg-indigo-700 text-white font-semibold rounded-lg hover:bg-indigo-800 transition-all duration-200"
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

      {/* Data Types Section */}
      <div className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Analyze Any Type of Data
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Comprehensive tools for all your data analysis needs
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {dataTypes.map((type, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 ${type.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <Database className="h-8 w-8 text-white" />
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
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">1TB+</div>
              <div className="text-gray-600 dark:text-gray-400">Data Processed Daily</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">95%</div>
              <div className="text-gray-600 dark:text-gray-400">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">50+</div>
              <div className="text-gray-600 dark:text-gray-400">Chart Types</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">4.9/5</div>
              <div className="text-gray-600 dark:text-gray-400">Analyst Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need for Data Excellence
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our AI analytics tools help you extract meaningful insights from any dataset.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {analyticsTools.map((tool, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg mr-4">
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
              How to Transform Data into Insights
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Turn your raw data into actionable insights in 4 simple steps.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-indigo-100 dark:bg-indigo-900 rounded-full">
                  <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">1</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Upload Data</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Import your data from spreadsheets, databases, or APIs.
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-indigo-100 dark:bg-indigo-900 rounded-full">
                  <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">2</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Clean & Process</h3>
              <p className="text-gray-600 dark:text-gray-400">
                AI automatically cleans and prepares your data for analysis.
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-indigo-100 dark:bg-indigo-900 rounded-full">
                  <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">3</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Analyze & Visualize</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Generate charts, graphs, and statistical insights automatically.
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-indigo-100 dark:bg-indigo-900 rounded-full">
                  <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">4</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Export Reports</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Share insights with comprehensive reports and dashboards.
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
              Data & Analytics Tools
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Professional AI-powered tools for data analysis.
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
                placeholder="Search analytics tools..."
                className="block w-full pl-10 pr-10 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all duration-200 text-sm"
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
              <p className="text-gray-500 dark:text-gray-400">No analytics tools found matching your search.</p>
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
                Why Choose Our Analytics Tools?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <Zap className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Lightning Fast</h3>
                    <p className="text-gray-600 dark:text-gray-400">Process millions of records in seconds.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <Star className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Advanced AI</h3>
                    <p className="text-gray-600 dark:text-gray-400">Machine learning-powered insights and predictions.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <Shield className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Secure & Private</h3>
                    <p className="text-gray-600 dark:text-gray-400">Your data is encrypted and never shared.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-2xl p-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Processing Speed</span>
                  <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">100x</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Accuracy</span>
                  <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">95%</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Data Sources</span>
                  <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">50+</span>
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
