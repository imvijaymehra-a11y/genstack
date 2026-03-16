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

              {/* ALWAYS VISIBLE TEST - NO CONDITIONAL */}
              <div style={{
                backgroundColor: '#ff6b6b',
                color: 'white',
                padding: '20px',
                textAlign: 'center',
                fontSize: '24px',
                fontWeight: 'bold',
                margin: '20px 0',
                borderRadius: '10px'
              }}>
                🚨 ALWAYS VISIBLE TEST - This should appear on ALL tool pages
                <br />
                Current slug: {slug}
              </div>

              {/* Tabs Section - Below Image Generator - SIMPLE CSS */}
              {slug === 'ai-image-generator' && (
                <div style={{
                  background: 'white',
                  border: '2px solid #ccc',
                  borderRadius: '8px',
                  padding: '20px',
                  marginBottom: '20px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#333',
                    marginBottom: '20px'
                  }}>
                    🎨 AI Image Generator Features
                  </h3>
                  
                  <div style={{
                    borderBottom: '2px solid #ccc',
                    marginBottom: '20px'
                  }}>
                    <div style={{
                      display: 'flex',
                      gap: '20px'
                    }}>
                      <button style={{
                        padding: '10px',
                        borderBottom: '3px solid #4f46e5',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: '#4f46e5',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer'
                      }}>
                        Overview
                      </button>
                      <button style={{
                        padding: '10px',
                        fontSize: '16px',
                        color: '#666',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer'
                      }}>
                        Prompt Examples
                      </button>
                      <button style={{
                        padding: '10px',
                        fontSize: '16px',
                        color: '#666',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer'
                      }}>
                        Best Practices
                      </button>
                      <button style={{
                        padding: '10px',
                        fontSize: '16px',
                        color: '#666',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer'
                      }}>
                        Models
                      </button>
                    </div>
                  </div>

                  <div>
                    <h4 style={{
                      fontSize: '18px',
                      fontWeight: 'bold',
                      color: '#333',
                      marginBottom: '15px'
                    }}>
                      🚀 AI Image Generation Overview
                    </h4>
                    <div style={{
                      fontSize: '16px',
                      color: '#555',
                      lineHeight: '1.5'
                    }}>
                      <p style={{ marginBottom: '15px' }}>
                        Generate stunning images from text descriptions using advanced AI models. 
                        Our AI Image Generator supports multiple professional models including DALL-E 3, 
                        Stable Diffusion XL, and more.
                      </p>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '20px',
                        marginTop: '20px'
                      }}>
                        <div style={{
                          background: '#e3f2fd',
                          padding: '20px',
                          borderRadius: '8px',
                          border: '1px solid #2196f3'
                        }}>
                          <h5 style={{
                            fontSize: '16px',
                            fontWeight: 'bold',
                            color: '#333',
                            marginBottom: '10px'
                          }}>
                            ✨ Key Features
                          </h5>
                          <ul style={{
                            fontSize: '16px',
                            color: '#555',
                            margin: 0,
                            paddingLeft: '20px'
                          }}>
                            <li style={{ marginBottom: '5px' }}>Multiple AI models</li>
                            <li style={{ marginBottom: '5px' }}>High-resolution output</li>
                            <li style={{ marginBottom: '5px' }}>Custom styles</li>
                            <li style={{ marginBottom: '5px' }}>Commercial-safe options</li>
                          </ul>
                        </div>
                        <div style={{
                          background: '#f3e5f5',
                          padding: '20px',
                          borderRadius: '8px',
                          border: '1px solid #9c27b0'
                        }}>
                          <h5 style={{
                            fontSize: '16px',
                            fontWeight: 'bold',
                            color: '#333',
                            marginBottom: '10px'
                          }}>
                            🎯 Use Cases
                          </h5>
                          <ul style={{
                            fontSize: '16px',
                            color: '#555',
                            margin: 0,
                            paddingLeft: '20px'
                          }}>
                            <li style={{ marginBottom: '5px' }}>Social media content</li>
                            <li style={{ marginBottom: '5px' }}>Marketing materials</li>
                            <li style={{ marginBottom: '5px' }}>Product mockups</li>
                            <li style={{ marginBottom: '5px' }}>Creative projects</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
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
