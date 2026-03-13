'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getToolBySlug } from '@/lib/tools';
import { AI_MODELS } from '@/lib/ai-models';
import { selectOptimalModel, getDefaultModelForTool } from '@/lib/intelligent-model-selector';
import EnhancedToolForm from '@/components/EnhancedToolForm';
import EnhancedToolOutput from '@/components/EnhancedToolOutput';
import ImageToolForm from '@/components/ImageToolForm';
import ToolPageHeader from '@/components/ToolPageHeader';
import ModelSelector from '@/components/ModelSelector';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabase';

interface ToolPageClientProps {
  slug: string;
}

export default function ToolPageClient({ slug }: ToolPageClientProps) {
  const [tool, setTool] = useState(getToolBySlug(slug));
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [session, setSession] = useState<any>(null);
  const [error, setError] = useState('');
  const [selectedModel, setSelectedModel] = useState(() => getDefaultModelForTool(slug));
  const [input, setInput] = useState('');

  useEffect(() => {
    const foundTool = getToolBySlug(slug);
    setTool(foundTool);
    if (!foundTool) {
      setError('Tool not found');
      return;
    }

    // Check user authentication & session
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setSession(session);
      
      // Create user in database if authenticated but not in DB
      if (session?.user) {
        try {
          await fetch('/api/auth/user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${session.access_token}`
            },
            body: JSON.stringify({ token: session.access_token })
          });
        } catch (error) {
          console.error('Failed to ensure user in database:', error);
        }
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user || null);
        setSession(session || null);
        
        // Create user in database when they sign in
        if (event === 'SIGNED_IN' && session?.user) {
          try {
            await fetch('/api/auth/user', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.access_token}`
              },
              body: JSON.stringify({ token: session.access_token })
            });
          } catch (error) {
            console.error('Failed to ensure user in database:', error);
          }
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [slug]);

  const handleGenerate = async (input: string, file?: File): Promise<string> => {
    if (!session?.access_token) {
      setError('Please sign in to use this tool.');
      throw new Error('Authorization required');
    }

    setIsGenerating(true);
    setError('');
    setGeneratedContent(''); // Clear previous content to prevent caching issues

    try {
      const headers: Record<string,string> = { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`,
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      };

      // Create FormData if there's a file
      let body: string | FormData;
      let contentType: string;

      if (file) {
        const formData = new FormData();
        formData.append('toolSlug', slug);
        formData.append('input', input);
        formData.append('modelId', selectedModel);
        formData.append('timestamp', Date.now().toString());
        formData.append('file', file);
        body = formData;
        contentType = 'multipart/form-data';
      } else {
        body = JSON.stringify({ 
          toolSlug: slug, 
          input, 
          modelId: selectedModel,
          timestamp: Date.now()
        });
        contentType = 'application/json';
      }

      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': contentType
        },
        body,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate content');
      }

      setGeneratedContent(data.content);
      return data.content;
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      throw err;
    } finally {
      setIsGenerating(false);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Navbar />
        <div className="max-w-3xl mx-auto py-24 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{error}</h1>
        </div>
        <Footer />
      </div>
    );
  }

  // Determine if this is an image tool
  const isImageTool = ['background-remover', 'image-enhancer', 'ai-image-generator'].includes(slug);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      {/* Enhanced Tool Page Header */}
      {tool && <ToolPageHeader tool={tool} />}
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {tool && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-8">
              {/* Tool Form - Image or Text */}
              {isImageTool ? (
                <ImageToolForm
                  toolName={tool.name}
                  toolSlug={slug}
                  onGenerate={handleGenerate}
                  isGenerating={isGenerating}
                />
              ) : (
                <EnhancedToolForm
                  toolName={tool.name}
                  toolSlug={slug}
                  onGenerate={handleGenerate}
                  isGenerating={isGenerating}
                />
              )}

              {/* Enhanced Tool Output */}
              <EnhancedToolOutput
                content={generatedContent}
                toolName={tool.name}
                isLoading={isGenerating}
                toolSlug={slug}
              />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Model Selection */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  AI Model Selection
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Choose the AI model that best fits your needs
                </p>
                <ModelSelector
                  selectedModel={selectedModel}
                  onModelChange={setSelectedModel}
                  className="w-full"
                />
              </div>

              {/* Quick Tips */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border border-blue-200 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  💡 Quick Tips
                </h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Be specific about your requirements
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Include target audience information
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Mention desired tone and style
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Provide context for better results
                  </li>
                </ul>
              </div>

              {/* Tool Stats */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Tool Statistics
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Category</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{tool.category}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Pricing</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {tool.pricing === 'free' ? 'Free' : 'Premium'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Status</span>
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
