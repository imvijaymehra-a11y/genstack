'use client';

import { useState, useRef } from 'react';

interface EnhancedToolFormProps {
  toolName: string;
  toolSlug: string;
  onGenerate: (input: string) => Promise<string>;
  isGenerating: boolean;
}

export default function EnhancedToolForm({ toolName, toolSlug, onGenerate, isGenerating }: EnhancedToolFormProps) {
  const [input, setInput] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInput(value);
    setWordCount(value.trim().split(/\s+/).filter(word => word.length > 0).length);
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isGenerating) return;
    
    try {
      await onGenerate(input);
    } catch (error) {
      console.error('Generation failed:', error);
    }
  };

  const getPlaceholder = () => {
    const placeholders: Record<string, string> = {
      'blog-generator': 'Describe the blog post topic you want to create. Include target audience, key points, and desired tone...',
      'email-writer': 'Describe the email you need to send. Include recipient, purpose, key points, and desired tone...',
      'social-media-caption-generator': 'Describe your post content. Include platform, target audience, and key message...',
      'code-generator': 'Describe the code you need. Include language, functionality, and any specific requirements...',
      'ad-copy-generator': 'Describe your product/service and target audience. Include key benefits and call-to-action...',
      'business-plan-generator': 'Describe your business idea. Include industry, target market, and key objectives...',
      'video-script-generator': 'Describe your video content. Include topic, duration, and target audience...',
      'song-lyrics-generator': 'Describe the song you want. Include genre, theme, mood, and any specific elements...'
    };

    return placeholders[toolSlug] || `Enter your ${toolName.toLowerCase()} request here...`;
  };

  const getPromptSuggestions = () => {
    const suggestions: Record<string, string[]> = {
      'blog-generator': [
        'Write a comprehensive guide about sustainable living for beginners',
        'Create a blog post about the benefits of remote work',
        'Generate an SEO article about artificial intelligence in healthcare'
      ],
      'email-writer': [
        'Write a professional follow-up email after a job interview',
        'Create a customer service response for a product complaint',
        'Generate a partnership proposal email to potential collaborators'
      ],
      'social-media-caption-generator': [
        'Create Instagram captions for a fitness app launch',
        'Generate Twitter thread about productivity tips',
        'Write LinkedIn post about career development'
      ],
      'code-generator': [
        'Create a Python function to validate email addresses',
        'Build a React component for a responsive navigation bar',
        'Write a SQL query to find duplicate records'
      ],
      'ad-copy-generator': [
        'Create Facebook ad copy for a new coffee shop',
        'Generate Google Ads copy for an online course',
        'Write Instagram ad copy for sustainable fashion'
      ],
      'business-plan-generator': [
        'Create business plan for a mobile app startup',
        'Generate plan for a renewable energy company',
        'Write business plan for an e-commerce platform'
      ],
      'video-script-generator': [
        'Create YouTube script about productivity tips',
        'Generate TikTok video about cooking hacks',
        'Write corporate training video about cybersecurity'
      ],
      'song-lyrics-generator': [
        'Create song lyrics about overcoming challenges',
        'Generate romantic song lyrics about summer love',
        'Write motivational song lyrics about dreams'
      ]
    };

    return suggestions[toolSlug] || [
      `Create professional ${toolName.toLowerCase()} content`,
      `Generate ${toolName.toLowerCase()} with creative approach`,
      `Write ${toolName.toLowerCase()} with detailed explanations`
    ];
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    setWordCount(suggestion.trim().split(/\s+/).filter(word => word.length > 0).length);
    
    // Auto-resize after setting content
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    }, 100);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Create Your {toolName}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Describe what you want to create and our AI will generate it for you
        </p>
      </div>

      {/* Prompt Suggestions */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          💡 Quick Start Ideas
        </h3>
        <div className="flex flex-wrap gap-2">
          {getPromptSuggestions().slice(0, 3).map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 text-left"
            >
              {suggestion.length > 50 ? suggestion.substring(0, 50) + '...' : suggestion}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Input Area */}
        <div>
          <label htmlFor="prompt-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Your Request
          </label>
          <div className="relative">
            <textarea
              id="prompt-input"
              ref={textareaRef}
              value={input}
              onChange={handleInputChange}
              placeholder={getPlaceholder()}
              className="w-full px-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none transition-all duration-200"
              rows={4}
              disabled={isGenerating}
              style={{ minHeight: '120px', maxHeight: '400px' }}
            />
            
            {/* Character/Word Count */}
            <div className="absolute bottom-3 right-3 text-xs text-gray-500 dark:text-gray-400">
              {wordCount} words
            </div>
          </div>
        </div>

        {/* Advanced Options */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            ⚙️ Advanced Options
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                Tone (Optional)
              </label>
              <select className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:text-white">
                <option value="">Auto-detect</option>
                <option value="professional">Professional</option>
                <option value="casual">Casual</option>
                <option value="creative">Creative</option>
                <option value="formal">Formal</option>
                <option value="friendly">Friendly</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                Length (Optional)
              </label>
              <select className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:text-white">
                <option value="">Auto-detect</option>
                <option value="short">Short (Brief)</option>
                <option value="medium">Medium (Standard)</option>
                <option value="long">Long (Detailed)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              AI will generate unique content based on your request
            </span>
          </div>
          
          <button
            type="submit"
            disabled={!input.trim() || isGenerating}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {isGenerating ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </span>
            ) : (
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Generate Content
              </span>
            )}
          </button>
        </div>
      </form>

      {/* Tips */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-xl border border-blue-200 dark:border-blue-700">
        <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
          📝 Pro Tips for Better Results
        </h4>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• Be specific about your requirements and desired output</li>
          <li>• Include target audience and purpose for better context</li>
          <li>• Mention preferred tone and style (professional, casual, creative)</li>
          <li>• Provide examples or reference points when possible</li>
        </ul>
      </div>
    </div>
  );
}
