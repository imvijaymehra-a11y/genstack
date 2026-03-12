'use client';

import { useState } from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToolFormProps {
  toolName: string;
  toolSlug: string;
  onGenerate: (input: string) => Promise<string>;
  isGenerating: boolean;
}

export default function ToolForm({ toolName, toolSlug, onGenerate, isGenerating }: ToolFormProps) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!input.trim()) {
      setError('Please enter some input to generate content.');
      return;
    }

    try {
      await onGenerate(input);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during generation.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          What would you like to {toolName.toLowerCase()}?
        </label>
        <textarea
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your topic, idea, or request here..."
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white resize-none"
          rows={4}
          disabled={isGenerating}
        />
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Be specific for better results. Include details about tone, style, or requirements.
        </p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isGenerating || !input.trim()}
        className={cn(
          "w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200",
          isGenerating || !input.trim()
            ? "bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500"
            : "bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
        )}
      >
        {isGenerating ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Generating...</span>
          </>
        ) : (
          <>
            <Sparkles className="h-5 w-5" />
            <span>Generate {toolName}</span>
          </>
        )}
      </button>
    </form>
  );
}
