'use client';

import { useState } from 'react';
import { Tool } from '@/lib/tools';

interface ToolPageHeaderProps {
  tool: Tool;
}

export default function ToolPageHeader({ tool }: ToolPageHeaderProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'examples' | 'tips'>('overview');

  const getPromptExamples = () => {
    const examples: Record<string, string[]> = {
      'blog-generator': [
        "Write a comprehensive guide about sustainable living practices for beginners",
        "Create a blog post about the benefits of remote work for companies",
        "Generate an SEO-optimized article about artificial intelligence in healthcare"
      ],
      'email-writer': [
        "Write a professional follow-up email after a job interview",
        "Create a persuasive email to potential investors for my startup",
        "Generate a customer service response for a product complaint"
      ],
      'social-media-caption-generator': [
        "Create engaging Instagram captions for a new fitness app launch",
        "Generate Twitter captions for a tech conference announcement",
        "Write LinkedIn captions for a career development milestone"
      ],
      'code-generator': [
        "Generate a Python function to validate email addresses",
        "Create a React component for a responsive navigation bar",
        "Write a SQL query to find duplicate records in a database"
      ],
      'ad-copy-generator': [
        "Create compelling Facebook ad copy for a new coffee shop",
        "Generate Google Ads copy for an online coding course",
        "Write Instagram ad copy for a sustainable fashion brand"
      ],
      'business-plan-generator': [
        "Create a comprehensive business plan for a mobile app startup",
        "Generate a business plan for a renewable energy company",
        "Write a business plan for an e-commerce platform"
      ],
      'video-script-generator': [
        "Create a YouTube script about productivity tips for remote workers",
        "Generate a TikTok video script about quick cooking hacks",
        "Write a corporate training video script about cybersecurity"
      ],
      'song-lyrics-generator': [
        "Create song lyrics about overcoming challenges and finding hope",
        "Generate romantic song lyrics about a summer love story",
        "Write motivational song lyrics about chasing dreams"
      ]
    };

    return examples[tool.slug] || [
      `Create ${tool.name.toLowerCase()} content for professional use`,
      `Generate ${tool.name.toLowerCase()} with a creative approach`,
      `Write ${tool.name.toLowerCase()} with detailed explanations`
    ];
  };

  const getPromptTips = () => {
    const generalTips = [
      "Be specific about your requirements and desired output format",
      "Include relevant context and background information",
      "Specify the tone and style you want (professional, casual, creative, etc.)",
      "Mention your target audience or purpose",
      "Provide examples or reference points if available"
    ];

    const toolSpecificTips: Record<string, string[]> = {
      'blog-generator': [
        "Include target keywords for SEO optimization",
        "Specify desired word count (typically 800-1500 words)",
        "Mention your target audience and expertise level",
        "Include call-to-action requirements"
      ],
      'email-writer': [
        "Specify the purpose (inquiry, follow-up, proposal, etc.)",
        "Include recipient information and relationship context",
        "Mention urgency level and desired response time",
        "Specify tone (formal, friendly, urgent, etc.)"
      ],
      'social-media-caption-generator': [
        "Specify the platform (Instagram, Twitter, LinkedIn, etc.)",
        "Include relevant hashtags or keywords",
        "Mention desired engagement goals (likes, shares, comments)",
        "Specify brand voice and personality"
      ],
      'code-generator': [
        "Specify programming language and framework",
        "Include requirements and constraints",
        "Mention error handling needs",
        "Specify coding standards and documentation requirements"
      ],
      'ad-copy-generator': [
        "Specify the product/service and target audience",
        "Include unique selling points and benefits",
        "Mention the call-to-action and desired outcome",
        "Specify platform and ad format requirements"
      ],
      'business-plan-generator': [
        "Include business type and industry",
        "Specify target market and competition",
        "Mention funding requirements and timelines",
        "Include specific goals and metrics"
      ],
      'video-script-generator': [
        "Specify video length and format",
        "Include target audience and platform",
        "Mention key topics and talking points",
        "Specify tone and visual preferences"
      ],
      'song-lyrics-generator': [
        "Specify genre and musical style",
        "Include theme and emotional tone",
        "Mention song structure (verse, chorus, bridge)",
        "Specify target audience and purpose"
      ]
    };

    return toolSpecificTips[tool.slug] || generalTips;
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-2xl shadow-xl">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {tool.name}
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            {tool.description}
          </p>

          {/* Tool Stats */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {tool.pricing === 'free' ? 'Free to Use' : 'Premium Feature'}
              </span>
            </div>
            
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md">
              <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {tool.category}
              </span>
            </div>

            {tool.featured && (
              <div className="flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900 px-4 py-2 rounded-full shadow-md">
                <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                  Featured Tool
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
          <nav className="flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('examples')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'examples'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Prompt Examples
            </button>
            <button
              onClick={() => setActiveTab('tips')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'tips'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Best Practices
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  What This Tool Does
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Our {tool.name} uses advanced AI technology to help you create professional, high-quality content in seconds. 
                  Whether you're a content creator, marketer, developer, or business professional, this tool streamlines your workflow 
                  and delivers results that match your specific needs.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  How It Works
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-blue-100 dark:bg-blue-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-blue-600 dark:text-blue-300 font-bold">1</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Enter Your Request</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Describe what you want to create in detail
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-blue-100 dark:bg-blue-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-blue-600 dark:text-blue-300 font-bold">2</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">AI Processing</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Our AI analyzes your request and generates content
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-blue-100 dark:bg-blue-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-blue-600 dark:text-blue-300 font-bold">3</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Get Results</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Receive professional, ready-to-use content instantly
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Key Features
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Professional Quality</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">High-quality output that meets professional standards</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Fast Generation</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">Get results in seconds, not hours</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Customizable</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">Tailor output to your specific needs and preferences</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Multiple AI Models</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">Choose from various AI models for different styles</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'examples' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Example Prompts
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Here are some example prompts you can use with the {tool.name}. Feel free to modify them to fit your specific needs.
                </p>
                
                <div className="space-y-4">
                  {getPromptExamples().map((example, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                      <div className="flex items-start space-x-3">
                        <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xs font-semibold px-2 py-1 rounded-full">
                          Example {index + 1}
                        </span>
                        <p className="text-gray-700 dark:text-gray-300 flex-1">{example}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tips' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Best Practices & Tips
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Follow these tips to get the best results from the {tool.name}. The more specific and detailed your prompt, the better the AI can understand and fulfill your request.
                </p>
                
                <div className="space-y-4">
                  {getPromptTips().map((tip, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="bg-green-100 dark:bg-green-900 rounded-full p-2 flex-shrink-0">
                        <svg className="w-4 h-4 text-green-600 dark:text-green-300" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-6 border border-blue-200 dark:border-blue-700">
                <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  💡 Pro Tip
                </h4>
                <p className="text-blue-800 dark:text-blue-200">
                  Start with a clear goal in mind, then add specific details about tone, format, length, and target audience. 
                  The more context you provide, the better the AI can tailor the output to your exact needs.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
