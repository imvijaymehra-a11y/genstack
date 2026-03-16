'use client';

import { useState, useRef } from 'react';
import { Upload, X, Sparkles, Scissors, Download, Image, CheckCircle, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface CapCutBackgroundRemoverProps {
  toolName: string;
  toolSlug: string;
  onGenerate: (input: string, file?: File) => Promise<string>;
  isGenerating: boolean;
  generatedImage?: string;
}

export default function CapCutBackgroundRemover({ toolName, toolSlug, onGenerate, isGenerating, generatedImage }: CapCutBackgroundRemoverProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('transparent');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const backgroundColors = [
    { id: 'transparent', name: 'Transparent', color: 'bg-gradient-to-br from-gray-100 to-gray-200' },
    { id: 'white', name: 'White', color: 'bg-white' },
    { id: 'black', name: 'Black', color: 'bg-black' },
    { id: 'blue', name: 'Blue', color: 'bg-blue-500' },
    { id: 'green', name: 'Green', color: 'bg-green-500' },
    { id: 'red', name: 'Red', color: 'bg-red-500' }
  ];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setShowResult(false);
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
      setShowResult(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) return;
    if (isGenerating) return;

    try {
      const enhancedInput = `Remove background with ${backgroundColor} background`;
      const result = await onGenerate(enhancedInput, selectedFile);
      setShowResult(true);
    } catch (error) {
      console.error('Background removal failed:', error);
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
      link.download = `background-removed-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const clearImage = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    setShowResult(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-pink-600/20 backdrop-blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              AI Background Remover
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Remove backgrounds from images instantly with professional AI-powered precision
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Tool */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upload Section */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Scissors className="h-6 w-6 mr-2" />
                Remove Background
              </h2>
              
              {!previewUrl ? (
                /* Upload Area */
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-white/30 rounded-xl p-12 text-center cursor-pointer hover:border-purple-400 transition-colors bg-white/5"
                >
                  <Upload className="h-16 w-16 text-white mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Upload Image
                  </h3>
                  <p className="text-gray-400 mb-4">
                    Drag & drop your image here or click to browse
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports: JPG, PNG, WebP (Max 10MB)
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
              ) : (
                /* Preview Area */
                <div className="space-y-4">
                  <div className="relative">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full rounded-xl"
                    />
                    <button
                      onClick={clearImage}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Background Color Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      New Background
                    </label>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                      {backgroundColors.map((bg) => (
                        <button
                          key={bg.id}
                          onClick={() => setBackgroundColor(bg.id)}
                          className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                            backgroundColor === bg.id
                              ? 'border-purple-500 scale-105'
                              : 'border-white/20 hover:border-purple-400'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded ${bg.color} mb-1 mx-auto`}></div>
                          <div className="text-white text-xs font-medium">{bg.name}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={handleSubmit}
                    disabled={isGenerating}
                    className="w-full py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold rounded-xl hover:from-red-700 hover:to-pink-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Removing Background...</span>
                      </>
                    ) : (
                      <>
                        <Scissors className="h-5 w-5" />
                        <span>Remove Background</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Result Section */}
            {showResult && generatedImage && (
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <CheckCircle className="h-6 w-6 mr-2 text-green-400" />
                  Background Removed!
                </h3>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Before */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-2">Original</h4>
                      <img
                        src={previewUrl}
                        alt="Original"
                        className="w-full rounded-xl opacity-75"
                      />
                    </div>
                    {/* After */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-2">Background Removed</h4>
                      <img
                        src={generatedImage}
                        alt="Background Removed"
                        className="w-full rounded-xl"
                      />
                    </div>
                  </div>
                  <button 
                    onClick={downloadImage}
                    className="w-full py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-blue-700 transition-colors flex items-center justify-center space-x-2"
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
            <div className="bg-gradient-to-r from-red-600/20 to-pink-600/20 rounded-2xl p-6 border border-red-500/30">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Scissors className="h-5 w-5 mr-2" />
                AI Technology
              </h3>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  <span>Remove.bg API</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  <span>Precise edge detection</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  <span>Hair & fur preservation</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-pink-400 rounded-full mr-3"></div>
                  <span>Transparent PNG output</span>
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">Quick Tips</h3>
              <div className="space-y-3 text-gray-300 text-sm">
                <div className="flex items-start">
                  <ArrowRight className="h-4 w-4 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Use high contrast images for best results</span>
                </div>
                <div className="flex items-start">
                  <ArrowRight className="h-4 w-4 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Clear backgrounds work better</span>
                </div>
                <div className="flex items-start">
                  <ArrowRight className="h-4 w-4 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Avoid complex backgrounds</span>
                </div>
                <div className="flex items-start">
                  <ArrowRight className="h-4 w-4 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Good lighting improves accuracy</span>
                </div>
              </div>
            </div>

            {/* Use Cases */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">Perfect For</h3>
              <div className="space-y-2 text-gray-300 text-sm">
                <div className="flex items-center p-3 bg-white/5 rounded-lg">
                  <Image className="h-5 w-5 text-red-400 mr-3" />
                  <span>Product photos</span>
                </div>
                <div className="flex items-center p-3 bg-white/5 rounded-lg">
                  <Image className="h-5 w-5 text-red-400 mr-3" />
                  <span>Profile pictures</span>
                </div>
                <div className="flex items-center p-3 bg-white/5 rounded-lg">
                  <Image className="h-5 w-5 text-red-400 mr-3" />
                  <span>Social media posts</span>
                </div>
                <div className="flex items-center p-3 bg-white/5 rounded-lg">
                  <Image className="h-5 w-5 text-red-400 mr-3" />
                  <span>Graphic design</span>
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
