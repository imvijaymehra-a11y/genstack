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
      
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Left Sidebar - Tool Form */}
            <div className="lg:col-span-3">
              <ToolPageHeader tool={tool} />
              {tool ? (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
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
                      tool={tool}
                      onGenerate={handleGenerate}
                      isGenerating={isGenerating}
                    />
                  )}
                  
                  {/* Tool Output */}
                  <EnhancedToolOutput
                    content={generatedContent}
                    toolName={tool.name}
                    isLoading={isGenerating}
                    toolSlug={tool.slug}
                  />

              {/* Tabs Section - Below Image Generator - CUTOUT.PRO STYLE */}
              {isImageTool && (
                <div style={{
                  background: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  overflow: 'hidden',
                  marginBottom: '24px'
                }}>
                  <div style={{
                    borderBottom: '1px solid #e5e7eb',
                    background: '#fafafa'
                  }}>
                    <div style={{
                      display: 'flex'
                    }}>
                      <button style={{
                        padding: '12px 24px',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#2563eb',
                        background: 'white',
                        border: 'none',
                        borderBottom: '2px solid #2563eb',
                        cursor: 'pointer',
                        position: 'relative',
                        transition: 'all 0.2s'
                      }}>
                        Overview
                      </button>
                      <button style={{
                        padding: '12px 24px',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#6b7280',
                        background: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}>
                        Examples
                      </button>
                      <button style={{
                        padding: '12px 24px',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#6b7280',
                        background: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}>
                        Best Practices
                      </button>
                      <button style={{
                        padding: '12px 24px',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#6b7280',
                        background: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}>
                        Models
                      </button>
                    </div>
                  </div>

                  <div style={{ padding: '32px' }}>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 2fr',
                      gap: '32px',
                      alignItems: 'start'
                    }}>
                      <div>
                        <h2 style={{
                          fontSize: '24px',
                          fontWeight: '700',
                          color: '#111827',
                          marginBottom: '8px',
                          lineHeight: '1.2'
                        }}>
                          {tool?.name === 'AI Image Generator' ? 'AI Image Generator' : 
                           tool?.name === 'Background Remover' ? 'Background Remover' :
                           tool?.name === 'Image Enhancer' ? 'Photo Enhancer' : 'AI Tool'}
                        </h2>
                        <p style={{
                          fontSize: '16px',
                          color: '#6b7280',
                          lineHeight: '1.6',
                          marginBottom: '24px'
                        }}>
                          {tool?.name === 'AI Image Generator' ? 
                            `Create stunning images from text with our advanced AI. Perfect for social media, marketing, and creative projects.` :
                            tool?.name === 'Background Remover' ?
                            `Remove backgrounds from images instantly with AI. Perfect for product photos, portraits, and professional images.` :
                            tool?.name === 'Image Enhancer' ?
                            `Enhance photo quality with AI. Upscale, denoise, and improve your images automatically.` :
                            `Professional AI-powered tool for ${tool?.name || 'content creation'} with advanced features.`
                          }
                        </p>
                        
                        <div style={{ marginBottom: '32px' }}>
                          <h3 style={{
                            fontSize: '18px',
                            fontWeight: '600',
                            color: '#111827',
                            marginBottom: '16px'
                          }}>
                            How it works
                          </h3>
                          <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                            gap: '16px'
                          }}>
                            <div style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '12px',
                              padding: '16px',
                              background: '#f8fafc',
                              borderRadius: '8px',
                              border: '1px solid #e2e8f0'
                            }}>
                              <div style={{
                                width: '32px',
                                height: '32px',
                                background: '#3b82f6',
                                borderRadius: '6px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '14px',
                                fontWeight: '600'
                              }}>
                                1
                              </div>
                              <div>
                                <h4 style={{
                                  fontSize: '14px',
                                  fontWeight: '600',
                                  color: '#111827',
                                  marginBottom: '4px'
                                }}>
                                  Upload your image
                                </h4>
                                <p style={{
                                  fontSize: '13px',
                                  color: '#6b7280',
                                  lineHeight: '1.5',
                                  margin: 0
                                }}>
                                  {tool?.name === 'AI Image Generator' ? 
                                    `Enter your prompt or upload an image to start creating` :
                                    `Choose your image file to begin processing`
                                  }
                                </p>
                              </div>
                            </div>
                            <div style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '12px',
                              padding: '16px',
                              background: '#f8fafc',
                              borderRadius: '8px',
                              border: '1px solid #e2e8f0'
                            }}>
                              <div style={{
                                width: '32px',
                                height: '32px',
                                background: '#3b82f6',
                                borderRadius: '6px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '14px',
                                fontWeight: '600'
                              }}>
                                2
                              </div>
                              <div>
                                <h4 style={{
                                  fontSize: '14px',
                                  fontWeight: '600',
                                  color: '#111827',
                                  marginBottom: '4px'
                                }}>
                                  AI processes
                                </h4>
                                <p style={{
                                  fontSize: '13px',
                                  color: '#6b7280',
                                  lineHeight: '1.5',
                                  margin: 0
                                }}>
                                  Our AI analyzes and processes your request
                                </p>
                              </div>
                            </div>
                            <div style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '12px',
                              padding: '16px',
                              background: '#f8fafc',
                              borderRadius: '8px',
                              border: '1px solid #e2e8f0'
                            }}>
                              <div style={{
                                width: '32px',
                                height: '32px',
                                background: '#3b82f6',
                                borderRadius: '6px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '14px',
                                fontWeight: '600'
                              }}>
                                3
                              </div>
                              <div>
                                <h4 style={{
                                  fontSize: '14px',
                                  fontWeight: '600',
                                  color: '#111827',
                                  marginBottom: '4px'
                                }}>
                                  Get results
                                </h4>
                                <p style={{
                                  fontSize: '13px',
                                  color: '#6b7280',
                                  lineHeight: '1.5',
                                  margin: 0
                                }}>
                                  Download your enhanced content instantly
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div style={{
                          background: '#f8fafc',
                          borderRadius: '8px',
                          padding: '24px',
                          border: '1px solid #e2e8f0'
                        }}>
                          <h3 style={{
                            fontSize: '16px',
                            fontWeight: '600',
                            color: '#111827',
                            marginBottom: '16px'
                          }}>
                            Key Features
                          </h3>
                          <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '12px'
                          }}>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px'
                            }}>
                              <div style={{
                                width: '4px',
                                height: '4px',
                                background: '#10b981',
                                borderRadius: '50%'
                              }}></div>
                              <span style={{
                                fontSize: '14px',
                                color: '#374151'
                              }}>
                                {tool?.name === 'AI Image Generator' ? 'Multiple AI models' :
                                 tool?.name === 'Background Remover' ? 'Instant processing' :
                                 tool?.name === 'Image Enhancer' ? 'Quality enhancement' : 'Advanced AI features'}
                              </span>
                            </div>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px'
                            }}>
                              <div style={{
                                width: '4px',
                                height: '4px',
                                background: '#10b981',
                                borderRadius: '50%'
                              }}></div>
                              <span style={{
                                fontSize: '14px',
                                color: '#374151'
                              }}>
                                {tool?.name === 'AI Image Generator' ? 'High-resolution output' :
                                 tool?.name === 'Background Remover' ? 'Precise cutout' :
                                 tool?.name === 'Image Enhancer' ? 'Smart algorithms' : 'Professional results'}
                              </span>
                            </div>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px'
                            }}>
                              <div style={{
                                width: '4px',
                                height: '4px',
                                background: '#10b981',
                                borderRadius: '50%'
                              }}></div>
                              <span style={{
                                fontSize: '14px',
                                color: '#374151'
                              }}>
                                {tool?.name === 'AI Image Generator' ? 'Custom styles' :
                                 tool?.name === 'Background Remover' ? 'Edge detection' :
                                 tool?.name === 'Image Enhancer' ? 'Batch processing' : 'Easy to use'}
                              </span>
                            </div>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px'
                            }}>
                              <div style={{
                                width: '4px',
                                height: '4px',
                                background: '#10b981',
                                borderRadius: '50%'
                              }}></div>
                              <span style={{
                                fontSize: '14px',
                                color: '#374151'
                              }}>
                                {tool?.name === 'AI Image Generator' ? 'Commercial safe' :
                                 tool?.name === 'Background Remover' ? 'Multiple formats' :
                                 tool?.name === 'Image Enhancer' ? 'Fast processing' : 'Free to try'}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div style={{
                          marginTop: '24px',
                          background: '#fef3c7',
                          borderRadius: '8px',
                          padding: '20px',
                          border: '1px solid #fbbf24'
                        }}>
                          <h3 style={{
                            fontSize: '16px',
                            fontWeight: '600',
                            color: '#92400e',
                            marginBottom: '12px'
                          }}>
                            ⚡ Quick Start
                          </h3>
                          <div style={{
                            fontSize: '14px',
                            color: '#92400e',
                            lineHeight: '1.6'
                          }}>
                            <p style={{ marginBottom: '8px' }}>
                              <strong>Ready to try?</strong> {tool?.name === 'AI Image Generator' ? 
                                `Start creating amazing images in seconds. No design skills needed.` :
                                tool?.name === 'Background Remover' ?
                                `Upload any image and watch the magic happen. Background removed instantly.` :
                                tool?.name === 'Image Enhancer' ?
                                `Transform your photos with one click. Professional quality guaranteed.` :
                                `Experience the power of AI with our advanced ${tool?.name || 'tool'}.`
                              }
                            </p>
                            <button style={{
                              background: '#dc2626',
                              color: 'white',
                              border: 'none',
                              padding: '12px 24px',
                              borderRadius: '6px',
                              fontSize: '14px',
                              fontWeight: '600',
                              cursor: 'pointer',
                              transition: 'all 0.2s',
                              width: '100%'
                            }}>
                              Get Started Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* FAQ Section */}
                  <div style={{
                    background: '#f8fafc',
                    borderRadius: '8px',
                    padding: '24px',
                    marginTop: '24px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      color: '#111827',
                      marginBottom: '16px'
                    }}>
                      Frequently Asked Questions
                    </h3>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                      gap: '16px'
                    }}>
                      <div style={{
                        background: 'white',
                        padding: '16px',
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb'
                      }}>
                        <h4 style={{
                          fontSize: '16px',
                          fontWeight: '600',
                          color: '#111827',
                          marginBottom: '8px'
                        }}>
                            {tool?.name === 'AI Image Generator' ? 
                              'How does AI image generation work?' :
                              tool?.name === 'Background Remover' ?
                              'How accurate is the background removal?' :
                              tool?.name === 'Image Enhancer' ?
                              'What image formats are supported?' :
                              'How does the AI processing work?'
                            }
                        </h4>
                        <p style={{
                          fontSize: '14px',
                          color: '#6b7280',
                          lineHeight: '1.6',
                          margin: 0
                        }}>
                          {tool?.name === 'AI Image Generator' ? 
                            `Our AI uses advanced machine learning models like DALL-E 3 and Stable Diffusion to transform your text descriptions into high-quality images. Simply describe what you want, and our AI creates it for you.` :
                            tool?.name === 'Background Remover' ?
                            `Our AI uses advanced computer vision algorithms to accurately detect and remove backgrounds. The technology preserves fine details like hair and edges while cleanly separating the subject from the background.` :
                            tool?.name === 'Image Enhancer' ?
                            `We support all major image formats including JPG, PNG, WebP, and GIF. The AI automatically detects the format and applies the appropriate enhancement algorithms for the best results.` :
                            `Our AI analyzes your input using advanced neural networks to understand your requirements and process them efficiently using cloud-based computing for optimal performance.`
                          }
                        </p>
                      </div>
                      <div style={{
                        background: 'white',
                        padding: '16px',
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb'
                      }}>
                        <h4 style={{
                          fontSize: '16px',
                          fontWeight: '600',
                          color: '#111827',
                          marginBottom: '8px'
                        }}>
                            {tool?.name === 'AI Image Generator' ? 
                              'What image sizes can I generate?' :
                              tool?.name === 'Background Remover' ?
                              'Can I use this for commercial purposes?' :
                              tool?.name === 'Image Enhancer' ?
                              'How long does enhancement take?' :
                              'Is my data secure and private?'
                            }
                        </h4>
                        <p style={{
                          fontSize: '14px',
                          color: '#6b7280',
                          lineHeight: '1.6',
                          margin: 0
                        }}>
                          {tool?.name === 'AI Image Generator' ? 
                            `You can generate images in various sizes from small (512x512) to large (2048x2048). Common aspect ratios like 1:1, 16:9, and 4:3 are also supported. Perfect for social media, web, and print use.` :
                            tool?.name === 'Background Remover' ?
                            `Yes! All processed images are suitable for commercial use. You retain full rights to use the enhanced images for your business, marketing, and professional projects.` :
                            tool?.name === 'Image Enhancer' ?
                            `Most enhancements complete in under 30 seconds. Complex images may take up to 2 minutes. Processing time depends on image size and selected enhancement options.` :
                            `Absolutely! We use enterprise-grade encryption and never store your original images. All processing is done securely in the cloud, and your data is automatically deleted after processing.`
                          }
                        </p>
                      </div>
                      <div style={{
                        background: 'white',
                        padding: '16px',
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb'
                      }}>
                        <h4 style={{
                          fontSize: '16px',
                          fontWeight: '600',
                          color: '#111827',
                          marginBottom: '8px'
                        }}>
                            {tool?.name === 'AI Image Generator' ? 
                              'Can I customize the style?' :
                              tool?.name === 'Background Remover' ?
                              'What if the background is complex?' :
                              tool?.name === 'Image Enhancer' ?
                              'Is there a limit on file size?' :
                              'What payment methods are accepted?'
                            }
                        </h4>
                        <p style={{
                          fontSize: '14px',
                          color: '#6b7280',
                          lineHeight: '1.6',
                          margin: 0
                        }}>
                          {tool?.name === 'AI Image Generator' ? 
                            `Yes! You can specify art styles, photorealistic, digital art, 3D render, and more. Use descriptive prompts to guide the AI toward your desired aesthetic and style.` :
                            tool?.name === 'Background Remover' ?
                            `Our AI is trained on millions of images and can handle complex backgrounds including gradients, patterns, and semi-transparent elements. For extremely complex cases, you can use manual touch-up tools for fine-tuning.` :
                            tool?.name === 'Image Enhancer' ?
                            `Free users can enhance images up to 10MB. Pro users can process files up to 50MB. Larger files are automatically optimized for faster processing.` :
                            `We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and various digital payment methods. All transactions are secure and encrypted.`
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Additional Resources */}
                  <div style={{
                    background: '#eff6ff',
                    borderRadius: '8px',
                    padding: '24px',
                    marginTop: '24px',
                    border: '1px solid #dbeafe'
                  }}>
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      color: '#1e40af',
                      marginBottom: '16px'
                    }}>
                      Additional Resources
                    </h3>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                      gap: '16px'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '16px',
                        background: 'white',
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb'
                      }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          background: '#3b82f6',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '18px',
                          fontWeight: '600'
                        }}>
                          📚
                        </div>
                        <div>
                          <h4 style={{
                            fontSize: '16px',
                            fontWeight: '600',
                            color: '#111827',
                            marginBottom: '4px'
                          }}>
                            Documentation
                          </h4>
                          <p style={{
                            fontSize: '14px',
                            color: '#6b7280',
                            lineHeight: '1.5',
                            margin: 0
                          }}>
                            Comprehensive guides and API documentation for developers
                          </p>
                        </div>
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '16px',
                        background: 'white',
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb'
                      }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          background: '#3b82f6',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '18px',
                          fontWeight: '600'
                        }}>
                          🎥
                        </div>
                        <div>
                          <h4 style={{
                            fontSize: '16px',
                            fontWeight: '600',
                            color: '#111827',
                            marginBottom: '4px'
                          }}>
                            Video Tutorials
                          </h4>
                          <p style={{
                            fontSize: '14px',
                            color: '#6b7280',
                            lineHeight: '1.5',
                            margin: 0
                          }}>
                            Step-by-step video guides for all features
                          </p>
                        </div>
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '16px',
                        background: 'white',
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb'
                      }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          background: '#3b82f6',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '18px',
                          fontWeight: '600'
                        }}>
                          💬
                        </div>
                        <div>
                          <h4 style={{
                            fontSize: '16px',
                            fontWeight: '600',
                            color: '#111827',
                            marginBottom: '4px'
                          }}>
                            Community Forum
                          </h4>
                          <p style={{
                            fontSize: '14px',
                            color: '#6b7280',
                            lineHeight: '1.5',
                            margin: 0
                          }}>
                            Connect with other users and share tips
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pricing Section */}
                  <div style={{
                    background: 'linear-gradient(135deg, #fef3c7 0%, #fbbf24 100%)',
                    borderRadius: '8px',
                    padding: '24px',
                    marginTop: '24px',
                    border: '1px solid #fbbf24'
                  }}>
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      color: '#92400e',
                      marginBottom: '16px'
                    }}>
                      💰 Pricing Plans
                    </h3>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                      gap: '16px'
                    }}>
                      <div style={{
                        background: 'white',
                        padding: '20px',
                        borderRadius: '8px',
                        border: '2px solid #10b981',
                        textAlign: 'center'
                      }}>
                        <h4 style={{
                          fontSize: '18px',
                          fontWeight: '700',
                          color: '#10b981',
                          marginBottom: '8px'
                        }}>
                          Free
                        </h4>
                        <div style={{
                          fontSize: '32px',
                          fontWeight: '700',
                          color: '#10b981',
                          marginBottom: '12px'
                        }}>
                          $0
                        </div>
                        <ul style={{
                          fontSize: '14px',
                          color: '#6b7280',
                          textAlign: 'left',
                          margin: 0,
                          paddingLeft: '20px'
                        }}>
                          <li style={{ marginBottom: '6px' }}>10 {tool?.name === 'AI Image Generator' ? 'image generations' : 'processes'} per day</li>
                          <li style={{ marginBottom: '6px' }}>Basic features</li>
                          <li style={{ marginBottom: '6px' }}>Community support</li>
                          <li style={{ marginBottom: '6px' }}>Standard quality</li>
                        </ul>
                        <button style={{
                          background: '#10b981',
                          color: 'white',
                          border: 'none',
                          padding: '12px 24px',
                          borderRadius: '6px',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          marginTop: '16px',
                          width: '100%'
                        }}>
                          Get Started Free
                        </button>
                      </div>
                      <div style={{
                        background: 'white',
                        padding: '20px',
                        borderRadius: '8px',
                        border: '2px solid #3b82f6',
                        textAlign: 'center'
                      }}>
                        <h4 style={{
                          fontSize: '18px',
                          fontWeight: '700',
                          color: '#3b82f6',
                          marginBottom: '8px'
                        }}>
                          Pro
                        </h4>
                        <div style={{
                          fontSize: '32px',
                          fontWeight: '700',
                          color: '#3b82f6',
                          marginBottom: '12px'
                        }}>
                          $19<span style={{
                            fontSize: '16px',
                            fontWeight: '400'
                          }}>/month</span>
                        </div>
                        <ul style={{
                          fontSize: '14px',
                          color: '#6b7280',
                          textAlign: 'left',
                          margin: 0,
                          paddingLeft: '20px'
                        }}>
                          <li style={{ marginBottom: '6px' }}>Unlimited {tool?.name === 'AI Image Generator' ? 'image generations' : 'processes'}</li>
                          <li style={{ marginBottom: '6px' }}>Priority processing</li>
                          <li style={{ marginBottom: '6px' }}>Advanced features</li>
                          <li style={{ marginBottom: '6px' }}>Premium quality</li>
                          <li style={{ marginBottom: '6px' }}>24/7 support</li>
                        </ul>
                        <button style={{
                          background: '#3b82f6',
                          color: 'white',
                          border: 'none',
                          padding: '12px 24px',
                          borderRadius: '6px',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          marginTop: '16px',
                          width: '100%'
                        }}>
                          Upgrade to Pro
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            )}
            {/* Right Sidebar - Additional Content */}
            <div className="lg:col-span-1 space-y-6">
              {/* Model Selection */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  🤖 Available AI Models
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Choose AI model that best fits your needs
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">🖼️ Image Models</h4>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                        <span className="text-sm">Flux Krea</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Free</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                        <span className="text-sm">Nano Banana 2</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Free</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                        <span className="text-sm">Nano Banana Pro</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Free</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                        <span className="text-sm">Imagen 4.0</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Free</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                        <span className="text-sm">Seedream 4.0</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Free</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                        <span className="text-sm">Seedream 4.5</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Free</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                        <span className="text-sm">Seedream 5.0 Lite</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Free</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                        <span className="text-sm">Qwen Image Edit</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Free</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                        <span className="text-sm">Gpt Image 1.5</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Free</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">🎬 Video Models</h4>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                        <span className="text-sm">Seedance 1.5 Pro (With Audio)</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Free</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                        <span className="text-sm">Sora 2.0 (With Audio)</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Free</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                        <span className="text-sm">Seedance 1.0 pro fast</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Free</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                        <span className="text-sm">Seedance 1.0 pro</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Free</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                        <span className="text-sm">Veo 3.0</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Free</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                        <span className="text-sm">Veo 3.1</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Free</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                        <span className="text-sm">Vidu Q2</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Free</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                        <span className="text-sm">Seedance 2.0</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Free</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      💡 <strong>All models are available for free!</strong> Choose any model based on your specific needs.
                    </p>
                  </div>
                </div>
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
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
