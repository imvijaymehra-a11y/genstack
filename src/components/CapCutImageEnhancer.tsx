'use client';

import { useState, useRef, useEffect } from 'react';
import { Upload, X, Sparkles, Zap, Camera, Sun, Palette, Wand2, Download, ArrowRight, ChevronLeft, ChevronRight, Scissors } from 'lucide-react';

interface CapCutImageEnhancerProps {
  toolName: string;
  toolSlug: string;
  onGenerate: (input: string, file?: File) => Promise<string>;
  isGenerating: boolean;
  generatedImage?: string;
}

export default function CapCutImageEnhancer({ 
  toolName, 
  toolSlug, 
  onGenerate, 
  isGenerating, 
  generatedImage 
}: CapCutImageEnhancerProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [dragActive, setDragActive] = useState(false);
  const [enhancementType, setEnhancementType] = useState<string>('auto');
  const [showResult, setShowResult] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const enhancementTypes = [
    {
      id: 'auto',
      name: 'Auto Enhance',
      icon: <Sparkles className="h-5 w-5" />,
      description: 'AI-powered enhancement',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      id: 'resolution',
      name: 'Resolution',
      icon: <Zap className="h-5 w-5" />,
      description: 'Increase image quality',
      gradient: 'from-blue-500 to-purple-500'
    },
    {
      id: 'color',
      name: 'Color',
      icon: <Palette className="h-5 w-5" />,
      description: 'Enhance colors',
      gradient: 'from-pink-500 to-red-500'
    },
    {
      id: 'portrait',
      name: 'Portrait',
      icon: <Camera className="h-5 w-5" />,
      description: 'Face enhancement',
      gradient: 'from-green-500 to-blue-500'
    },
    {
      id: 'landscape',
      name: 'Landscape',
      icon: <Sun className="h-5 w-5" />,
      description: 'Scene enhancement',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'background-removal',
      name: 'Background',
      icon: <Scissors className="h-5 w-5" />,
      description: 'Remove background',
      gradient: 'from-red-500 to-pink-500'
    }
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
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setShowResult(false);
    }
  };

  const handleGenerate = async () => {
    if (!selectedFile) return;
    
    try {
      await onGenerate(enhancementType, selectedFile);
      setShowResult(true);
    } catch (error) {
      console.error('Enhancement failed:', error);
    }
  };

  const downloadEnhanced = async () => {
    if (!generatedImage) return;
    
    try {
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `enhanced-${selectedFile?.name || 'photo.jpg'}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {toolName}
                </h1>
                <p className="text-xs text-gray-600">Enhance your images with AI</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Input */}
          <div className="space-y-6">
            {/* Image Upload */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-purple-100 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Upload Image</h3>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  dragActive 
                    ? 'border-purple-500 bg-purple-50' 
                    : 'border-purple-300 hover:border-purple-500 bg-purple-50/50'
                }`}
              >
                {previewUrl ? (
                  <div className="space-y-4">
                    <img src={previewUrl} alt="Preview" className="max-h-40 mx-auto rounded-lg" />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFile(null);
                        setPreviewUrl('');
                        setShowResult(false);
                      }}
                      className="text-red-500 hover:text-red-700 flex items-center space-x-1 mx-auto"
                    >
                      <X className="h-4 w-4" />
                      <span>Remove</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="h-12 w-12 text-purple-400 mx-auto" />
                    <div>
                      <p className="text-gray-700 font-medium">Drop image here</p>
                      <p className="text-sm text-gray-500">or click to browse</p>
                    </div>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            </div>

            {/* Enhancement Type Selection */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-purple-100 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Enhancement Type</h3>
              <div className="grid grid-cols-2 gap-3">
                {enhancementTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setEnhancementType(type.id)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      enhancementType === type.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${type.gradient} flex items-center justify-center text-white mb-2 mx-auto`}>
                      {type.icon}
                    </div>
                    <div className="text-sm font-medium text-gray-800">{type.name}</div>
                    <div className="text-xs text-gray-500">{type.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-purple-100 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Features</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-700">Professional quality enhancement</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-pink-400 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-700">AI-powered processing</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-700">Multiple enhancement options</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-700">Fast processing</span>
                </div>
              </div>
            </div>

            {/* Enhance Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !selectedFile}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Enhancing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  <span>Enhance Image</span>
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </div>

          {/* Right Panel - Result */}
          <div className="space-y-6">
            {showResult && generatedImage ? (
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-purple-100 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Enhanced Image</h3>
                <div className="space-y-4">
                  <img 
                    src={generatedImage} 
                    alt="Enhanced" 
                    className="w-full rounded-lg shadow-md"
                  />
                  <button 
                    onClick={downloadEnhanced}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download Enhanced</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-12 border border-purple-100 shadow-lg text-center">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Ready to Enhance</h3>
                    <p className="text-gray-600">Upload an image and choose enhancement type to transform your photos</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
