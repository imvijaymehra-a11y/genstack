'use client';

import { useState, useEffect } from 'react';
import { CapCutImageGenerator } from '@/components/CapCutImageGenerator';
import { supabase } from '@/lib/supabase';

export default function AIImageGeneratorPage() {
  const [generatedImage, setGeneratedImage] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [session, setSession] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check user authentication
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setSession(session);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: any, session: any) => {
        setUser(session?.user || null);
        setSession(session);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleGenerate = async (input: string, file?: File): Promise<string> => {
    if (!user) {
      setError('Please sign in to use this tool.');
      throw new Error('Authorization required');
    }

    setIsGenerating(true);
    setError('');

    try {
      // Call the API
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          toolSlug: 'ai-image-generator',
          input,
          modelId: 'free-generator',
          timestamp: Date.now()
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate image');
      }

      setGeneratedImage(data.content);
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
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Error</h1>
          <p className="text-gray-600 dark:text-gray-300">{error}</p>
          <button 
            onClick={() => setError('')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <CapCutImageGenerator
      toolName="AI Image Generator"
      toolSlug="ai-image-generator"
      onGenerate={handleGenerate}
      isGenerating={isGenerating}
      generatedImage={generatedImage}
    />
  );
}
