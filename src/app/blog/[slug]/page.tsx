'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import { getBlogPostBySlug } from '@/lib/blog';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState(getBlogPostBySlug(slug));

  useEffect(() => {
    const foundPost = getBlogPostBySlug(slug);
    setPost(foundPost);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Article Not Found</h1>
          <Link href="/blog" className="text-indigo-600 dark:text-indigo-400 hover:underline">
            Back to Blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back Button */}
        <Link href="/blog" className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:underline mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium">
              {post.category}
            </span>
          </div>

          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
            {post.title}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div>
              <span>{post.readTime} min read</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-12 rounded-lg overflow-hidden h-96 bg-gradient-to-br from-indigo-500 to-purple-600">
          <img 
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="prose dark:prose-invert max-w-none mb-12">
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
            {post.excerpt}
          </p>

          <div className="text-gray-800 dark:text-gray-200 leading-loose whitespace-pre-wrap">
            {post.content}
          </div>
        </div>

        {/* Tags */}
        <div className="mb-12 border-t border-b border-gray-200 dark:border-gray-700 py-6">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span 
                key={tag}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to boost your content creation?
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Start using GenStacker's AI tools to create amazing content in minutes.
          </p>
          <Link 
            href="/tools"
            className="inline-block px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors"
          >
            Explore All Tools
          </Link>
        </div>
      </article>

      <Footer />
    </div>
  );
}
