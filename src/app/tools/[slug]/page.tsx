'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getToolBySlug } from '@/lib/tools';

export default function ToolPage() {
  const params = useParams();
  const slug = params.slug as string;
  const tool = getToolBySlug(slug);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!tool) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Tool not found
          </h1>
          <Link
            href="/tools"
            className="text-blue-600 hover:text-blue-700"
          >
            ← Back to Tools
          </Link>
        </div>
      </div>
    );
  }

  const handleGenerate = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    setOutput('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          toolSlug: tool.slug,
          input: input.trim(),
        }),
      });

      const result = await response.json();

      if (result.success) {
        setOutput(result.content);
      } else {
        setOutput('Error: ' + result.error);
      }
    } catch (error) {
      setOutput('Error: Failed to generate content');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!output) return;

    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy text');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link
              href="/tools"
              className="text-blue-600 hover:text-blue-700 mb-4 inline-block"
            >
              ← Back to Tools
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {tool.name}
            </h1>
            <p className="text-xl text-gray-600">
              {tool.description}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <label className="block text-lg font-semibold text-gray-900 mb-4">
              Input
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your content here..."
              className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleGenerate}
              disabled={isLoading || !input.trim()}
              className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Generating...' : 'Generate'}
            </button>
          </div>

          {output && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <label className="text-lg font-semibold text-gray-900">
                  Output
                </label>
                <button
                  onClick={handleCopy}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="w-full h-64 p-4 border border-gray-300 rounded-lg bg-gray-50 overflow-auto">
                <pre className="whitespace-pre-wrap text-gray-800">{output}</pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
