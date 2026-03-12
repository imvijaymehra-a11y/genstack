'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getToolBySlug } from '@/lib/tools';
import ToolForm from '@/components/ToolForm';
import ToolOutput from '@/components/ToolOutput';
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
  }, [slug]);

  const handleGenerate = async (input: string): Promise<string> => {
    setIsGenerating(true);
    setError('');

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toolSlug: slug, input }),
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

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <main className="max-w-3xl mx-auto py-24">
        {tool && (
          <>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">{tool.name}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">{tool.description}</p>

            <ToolForm
              toolName={tool.name}
              toolSlug={slug}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />

            <ToolOutput
              content={generatedContent}
              toolName={tool.name}
              isLoading={isGenerating}
            />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
