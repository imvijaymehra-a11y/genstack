'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getToolBySlug } from '@/lib/tools';
import { generateSeoMetadata } from '@/lib/utils';
import ToolForm from '@/components/ToolForm';
import ToolOutput from '@/components/ToolOutput';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabase';

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const tool = getToolBySlug(params.slug);
  
  if (!tool) {
    return {
      title: 'Tool Not Found | GenStacker',
      description: 'The requested AI tool could not be found.',
    };
  }

  return generateSeoMetadata(tool);
}

export default function ToolPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [tool, setTool] = useState(getToolBySlug(slug));
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const foundTool = getToolBySlug(slug);
    setTool(foundTool);
    
    if (!foundTool) {
      setError('Tool not found');
      return;
    }

    // Check user authentication
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user);
      }
    );

    return () => subscription.unsubscribe();
  }, [slug]);

  const handleGenerate = async (input: string): Promise<string> => {
    if (!user) {
      throw new Error('Please sign in to use this tool.');
    }

    if (!tool) {
      throw new Error('Tool not found.');
    }

    setIsGenerating(true);
    setError('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.session?.access_token || ''}`,
        },
        body: JSON.stringify({
          toolSlug: tool.slug,
          input,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate content');
      }

      setGeneratedContent(data.content);
      return data.content;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setIsGenerating(false);
    }
  };

  if (!tool) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Tool Not Found
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              The AI tool you're looking for doesn't exist or has been moved.
            </p>
            <a
              href="/tools"
              className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors"
            >
              Browse All Tools
            </a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tool Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {tool.name}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
            {tool.description}
          </p>
          <div className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
            {tool.category}
          </div>
        </div>

        {/* SEO Content Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 mb-8 prose prose-gray dark:prose-invert max-w-none">
          <h2>About {tool.name}</h2>
          <p>
            Our {tool.name.toLowerCase()} is a powerful AI tool designed to help you {tool.description.toLowerCase()}. 
            Whether you're a content creator, marketer, business professional, or just looking to enhance your productivity, 
            this tool provides high-quality results in seconds.
          </p>
          
          <h3>How to Use {tool.name}</h3>
          <ol>
            <li>Enter your topic, idea, or request in the input field above</li>
            <li>Be specific about your requirements for better results</li>
            <li>Click the generate button to create your content</li>
            <li>Copy the generated content with one click</li>
          </ol>
          
          <h3>Benefits of Using AI for {tool.name.split(' ').pop()}</h3>
          <ul>
            <li>Save time and effort compared to manual creation</li>
            <li>Get professional-quality results every time</li>
            <li>Overcome creative blocks with AI assistance</li>
            <li>Generate multiple variations to choose from</li>
            <li>Improve consistency across your content</li>
          </ul>
        </div>

        {/* Tool Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div>
            <ToolForm
              toolName={tool.name}
              toolSlug={tool.slug}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />
            
            {!user && (
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-blue-800 dark:text-blue-200 text-sm">
                  <strong>Sign in required:</strong> Please create a free account to use this tool. 
                  Free users get 10 generations per day.
                </p>
              </div>
            )}
          </div>

          {/* Output */}
          <div>
            <ToolOutput
              content={generatedContent}
              toolName={tool.name}
              isLoading={isGenerating}
            />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 bg-white dark:bg-gray-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Is {tool.name} free to use?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yes! You can use {tool.name} for free with up to 10 generations per day. 
                For unlimited usage, upgrade to our Pro plan.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                How accurate is the generated content?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our AI uses advanced language models to generate high-quality, accurate content. 
                However, we always recommend reviewing and editing the output to ensure it meets your specific needs.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Can I use the generated content commercially?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yes, you own the rights to all content generated using our tools. 
                You can use it for personal or commercial purposes without any restrictions.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
