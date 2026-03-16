'use client';

import { useState, useRef } from 'react';
import { Upload, X, Sparkles, Wand2, Download, Image, Palette, Zap, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface CapCutImageGeneratorProps {
  toolName: string;
  toolSlug: string;
  onGenerate: (input: string, file?: File) => Promise<string>;
  isGenerating: boolean;
  generatedImage?: string;
}

export default function CapCutImageGenerator({ toolName, toolSlug, onGenerate, isGenerating, generatedImage }: CapCutImageGeneratorProps) {
  const [input, setInput] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [imageStyle, setImageStyle] = useState('realistic');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [showResult, setShowResult] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const imageStyles = [
    {
      id: 'realistic',
      name: 'Realistic',
      icon: <Image className="h-5 w-5" />,
      description: 'Photorealistic',
      gradient: 'from-blue-500 to-purple-500'
    },
    {
      id: 'artistic',
      name: 'Artistic',
      icon: <Palette className="h-5 w-5" />,
      description: 'Creative style',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      id: 'anime',
      name: 'Anime',
      icon: <Sparkles className="h-5 w-5" />,
      description: 'Japanese style',
      gradient: 'from-pink-500 to-red-500'
    },
    {
      id: '3d',
      name: '3D Render',
      icon: <Wand2 className="h-5 w-5" />,
      description: '3D graphics',
      gradient: 'from-green-500 to-teal-500'
    }
  ];

  const aspectRatios = [
    { id: '1:1', name: 'Square', label: '1:1' },
    { id: '16:9', name: 'Landscape', label: '16:9' },
    { id: '9:16', name: 'Portrait', label: '9:16' },
    { id: '4:3', name: 'Standard', label: '4:3' }
  ];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    if (isGenerating) return;

    try {
      const enhancedInput = `${imageStyle} style, ${aspectRatio} aspect ratio: ${input}`;
      const result = await onGenerate(enhancedInput);
      setShowResult(true);
    } catch (error) {
      console.error('Generation failed:', error);
    }
  };

  const downloadImage = async () => {
    if (!generatedImage) return;
    
    try {
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `generated-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              AI Image Generator
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Create stunning images from text descriptions with advanced AI technology
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Tool */}
          <div className="lg:col-span-2 space-y-8">
            {/* Input Section */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6">Create Your Image</h2>
              
              {/* Text Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Describe your image
                </label>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="A beautiful sunset over mountains with vibrant colors..."
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  rows={4}
                />
              </div>

              {/* Style Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Choose Style
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {imageStyles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setImageStyle(style.id)}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                        imageStyle === style.id
                          ? 'border-purple-500 bg-purple-500/20'
                          : 'border-white/20 bg-white/5 hover:border-purple-400'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${style.gradient} flex items-center justify-center mb-2 mx-auto`}>
                        {style.icon}
                      </div>
                      <div className="text-white font-medium text-sm">{style.name}</div>
                      <div className="text-gray-400 text-xs">{style.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Aspect Ratio Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Aspect Ratio
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {aspectRatios.map((ratio) => (
                    <button
                      key={ratio.id}
                      onClick={() => setAspectRatio(ratio.id)}
                      className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                        aspectRatio === ratio.id
                          ? 'border-purple-500 bg-purple-500/20 text-white'
                          : 'border-white/20 bg-white/5 text-gray-300 hover:border-purple-400'
                      }`}
                    >
                      <div className="font-medium text-sm">{ratio.name}</div>
                      <div className="text-xs opacity-75">{ratio.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleSubmit}
                disabled={!input.trim() || isGenerating}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    <span>Generate Image</span>
                  </>
                )}
              </button>
            </div>

            {/* Result Section */}
            {showResult && generatedImage && (
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6">Generated Image</h3>
                <div className="space-y-4">
                  <div>
                    <img
                      src={generatedImage}
                      alt="Generated"
                      className="w-full rounded-xl"
                    />
                  </div>
                  <button 
                    onClick={downloadImage}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download Image</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Info & Tips */}
          <div className="space-y-6">
            {/* AI Model Info */}
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-6 border border-purple-500/30">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Sparkles className="h-5 w-5 mr-2" />
                AI Model
              </h3>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  <span>Advanced DALL-E 3</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  <span>High-quality output</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  <span>Multiple styles</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-pink-400 rounded-full mr-3"></div>
                  <span>Fast generation</span>
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">Quick Tips</h3>
              <div className="space-y-3 text-gray-300 text-sm">
                <div className="flex items-start">
                  <ArrowRight className="h-4 w-4 text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Be specific about details and colors</span>
                </div>
                <div className="flex items-start">
                  <ArrowRight className="h-4 w-4 text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Include art style references</span>
                </div>
                <div className="flex items-start">
                  <ArrowRight className="h-4 w-4 text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Describe lighting and mood</span>
                </div>
                <div className="flex items-start">
                  <ArrowRight className="h-4 w-4 text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Use aspect ratio for composition</span>
                </div>
              </div>
            </div>

            {/* Examples */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">Example Prompts</h3>
              <div className="space-y-2 text-gray-300 text-sm">
                <div className="p-3 bg-white/5 rounded-lg">
                  "A futuristic city at sunset with flying cars"
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  "A cute robot reading a book in a library"
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  "Abstract art with vibrant colors and geometric shapes"
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
