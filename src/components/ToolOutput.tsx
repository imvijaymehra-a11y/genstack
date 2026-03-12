'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

interface ToolOutputProps {
  content: string;
  toolName: string;
  isLoading?: boolean;
}

export default function ToolOutput({ content, toolName, isLoading = false }: ToolOutputProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await copyToClipboard(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="relative">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 dark:border-gray-700 border-t-primary"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-6 w-6 bg-primary rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Generating your {toolName.toLowerCase()}...
            </h3>
            <div className="flex items-center justify-center space-x-2">
              <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              This usually takes a few seconds. Please wait.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No content generated yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Fill in the form above and click generate to see your {toolName.toLowerCase()} here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Your Generated {toolName}
        </h3>
        <button
          onClick={handleCopy}
          className="flex items-center space-x-2 px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-all duration-200 group"
          disabled={!content || copied}
        >
          <div className="relative">
            {copied ? (
              <Check className="h-4 w-4 text-green-600 animate-scale-in" />
            ) : (
              <Copy className="h-4 w-4 text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
            )}
            {copied && (
              <div className="absolute -top-1 -right-1 h-2 w-2 bg-green-500 rounded-full animate-ping"></div>
            )}
          </div>
          <span className={`transition-colors ${
            copied 
              ? 'text-green-600 font-medium' 
              : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
          }`}>
            {copied ? 'Copied!' : 'Copy'}
          </span>
        </button>
      </div>
      
      <div className="p-6">
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}
