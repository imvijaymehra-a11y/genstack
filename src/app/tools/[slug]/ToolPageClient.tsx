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
      // Create FormData if there's a file
      let body: string | FormData;
      let headers: Record<string,string>;

      if (file) {
        const formData = new FormData();
        formData.append('toolSlug', slug);
        formData.append('input', input);
        formData.append('modelId', selectedModel);
        formData.append('timestamp', Date.now().toString());
        formData.append('file', file);
        body = formData;
        
        // Don't set Content-Type header for FormData - browser sets it automatically
        headers = {
          'Authorization': `Bearer ${session.access_token}`,
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        };
      } else {
        body = JSON.stringify({ 
          toolSlug: slug, 
          input, 
          modelId: selectedModel,
          timestamp: Date.now()
        });
        
        headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        };
      }

      const res = await fetch('/api/generate', {
        method: 'POST',
        headers,
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
                  toolSlug={tool.slug}
                  onGenerate={handleGenerate}
                  isGenerating={isGenerating}
                  generatedImage={generatedContent}
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

              {/* CSS TEST - VERY OBVIOUS STYLING */}
              <div style={{
                backgroundColor: 'red',
                color: 'white',
                padding: '20px',
                fontSize: '24px',
                fontWeight: 'bold',
                textAlign: 'center',
                margin: '20px 0',
                border: '5px solid blue'
              }}>
                🚨 CSS TEST: If you see this with red background and blue border, CSS is working!
              </div>

              {/* Tabs Section - Below Image Generator - INLINE STYLES TEST */}
              {slug === 'ai-image-generator' && (
                <div style={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '1rem',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  padding: '1.5rem',
                  marginBottom: '2rem'
                }}>
                  <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    color: '#111827',
                    marginBottom: '1.5rem'
                  }}>
                    🎨 AI Image Generator Features
                  </h3>
                  
                  {/* Tabs Navigation */}
                  <div style={{
                    borderBottom: '1px solid #e5e7eb',
                    marginBottom: '1.5rem'
                  }}>
                    <nav style={{
                      display: 'flex',
                      spaceX: '2rem',
                      marginBottom: '-1px'
                    }}>
                      <button style={{
                        paddingTop: '0.5rem',
                        paddingBottom: '0.5rem',
                        paddingLeft: '0.25rem',
                        paddingRight: '0.25rem',
                        borderBottom: '2px solid #6366f1',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: '#4f46e5'
                      }}>
                        Overview
                      </button>
                      <button style={{
                        paddingTop: '0.5rem',
                        paddingBottom: '0.5rem',
                        paddingLeft: '0.25rem',
                        paddingRight: '0.25rem',
                        borderBottom: '2px solid transparent',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: '#6b7280'
                      }}>
                        Prompt Examples
                      </button>
                      <button style={{
                        paddingTop: '0.5rem',
                        paddingBottom: '0.5rem',
                        paddingLeft: '0.25rem',
                        paddingRight: '0.25rem',
                        borderBottom: '2px solid transparent',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: '#6b7280'
                      }}>
                        Best Practices
                      </button>
                      <button style={{
                        paddingTop: '0.5rem',
                        paddingBottom: '0.5rem',
                        paddingLeft: '0.25rem',
                        paddingRight: '0.25rem',
                        borderBottom: '2px solid transparent',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: '#6b7280'
                      }}>
                        Models
                      </button>
                    </nav>
                  </div>

                  {/* Tab Content */}
                  <div style={{ marginTop: '1.5rem' }}>
                    {/* Overview Tab */}
                    <div style={{ marginTop: '1rem' }}>
                      <h4 style={{
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: '#111827',
                        marginBottom: '0.75rem'
                      }}>
                        🚀 AI Image Generation Overview
                      </h4>
                      <div style={{
                        fontSize: '0.875rem',
                        color: '#374151',
                        marginTop: '0.75rem'
                      }}>
                        <p style={{ marginBottom: '0.75rem' }}>
                          Generate stunning images from text descriptions using advanced AI models. 
                          Our AI Image Generator supports multiple professional models including DALL-E 3, 
                          Stable Diffusion XL, and more.
                        </p>
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
                          gap: '1rem',
                          marginTop: '1rem'
                        }}>
                          <div style={{
                            background: 'linear-gradient(to right, #eff6ff, #e0e7ff)',
                            padding: '1rem',
                            borderRadius: '0.5rem'
                          }}>
                            <h5 style={{
                              fontSize: '0.875rem',
                              fontWeight: '500',
                              color: '#111827',
                              marginBottom: '0.5rem'
                            }}>
                              ✨ Key Features
                            </h5>
                            <ul style={{
                              fontSize: '0.875rem',
                              marginTop: '0.25rem',
                              color: '#374151',
                              paddingLeft: '1rem'
                            }}>
                              <li style={{ marginBottom: '0.25rem' }}>• Multiple AI models</li>
                              <li style={{ marginBottom: '0.25rem' }}>• High-resolution output</li>
                              <li style={{ marginBottom: '0.25rem' }}>• Custom styles</li>
                              <li style={{ marginBottom: '0.25rem' }}>• Commercial-safe options</li>
                            </ul>
                          </div>
                          <div style={{
                            background: 'linear-gradient(to right, #faf5ff, #f3e8ff)',
                            padding: '1rem',
                            borderRadius: '0.5rem'
                          }}>
                            <h5 style={{
                              fontSize: '0.875rem',
                              fontWeight: '500',
                              color: '#111827',
                              marginBottom: '0.5rem'
                            }}>
                              🎯 Use Cases
                            </h5>
                            <ul style={{
                              fontSize: '0.875rem',
                              marginTop: '0.25rem',
                              color: '#374151',
                              paddingLeft: '1rem'
                            }}>
                              <li style={{ marginBottom: '0.25rem' }}>• Social media content</li>
                              <li style={{ marginBottom: '0.25rem' }}>• Marketing materials</li>
                              <li style={{ marginBottom: '0.25rem' }}>• Product mockups</li>
                              <li style={{ marginBottom: '0.25rem' }}>• Creative projects</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Debug Info - Remove in production */}
              {process.env.NODE_ENV === 'development' && (
                <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg mt-4">
                  <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">Debug Info:</h4>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    Current slug: {slug}<br/>
                    Should show tabs: {slug === 'ai-image-generator' ? 'YES' : 'NO'}<br/>
                    Tool name: {tool?.name}<br/>
                    Is image tool: {isImageTool ? 'YES' : 'NO'}
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Model Selection */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  AI Model Selection
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Choose AI model that best fits your needs
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
