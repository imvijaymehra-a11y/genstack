'use client';

import { useState, useRef } from 'react';
import { Upload, X, Sparkles, Wand2, Download, Image, Palette, Zap, ArrowRight } from 'lucide-react';

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
      description: '3D visualization',
      gradient: 'from-green-500 to-blue-500'
    }
  ];

  const aspectRatios = [
    { id: '1:1', name: 'Square', size: '1024x1024' },
    { id: '16:9', name: 'Landscape', size: '1024x576' },
    { id: '9:16', name: 'Portrait', size: '576x1024' },
    { id: '4:3', name: 'Standard', size: '1024x768' }
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

  const handleGenerate = async () => {
    if (!input.trim() && !selectedFile) return;
    
    try {
      await onGenerate(input, selectedFile || undefined);
      setShowResult(true);
    } catch (error) {
      console.error('Generation failed:', error);
    }
  };

  const downloadGenerated = async () => {
    if (!generatedImage) return;
    
    try {
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `generated-${toolSlug}-${Date.now()}.png`;
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
                <p className="text-xs text-gray-600">Create stunning AI images</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Input */}
          <div className="space-y-6">
            {/* Prompt Input */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-purple-100 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Describe Your Image</h3>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="A futuristic city skyline at sunset with flying cars..."
                className="w-full h-32 px-4 py-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                maxLength={1000}
              />
              <div className="text-right text-sm text-gray-500 mt-2">
                {input.length}/1000
              </div>
            </div>

            {/* Reference Image Upload */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-purple-100 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Reference Image (Optional)</h3>
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-purple-300 rounded-lg p-8 text-center cursor-pointer hover:border-purple-500 transition-colors bg-purple-50/50"
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
                      <p className="text-gray-700 font-medium">Drop reference image here</p>
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

            {/* Style Selection */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-purple-100 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Image Style</h3>
              <div className="grid grid-cols-2 gap-3">
                {imageStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setImageStyle(style.id)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      imageStyle === style.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${style.gradient} flex items-center justify-center text-white mb-2 mx-auto`}>
                      {style.icon}
                    </div>
                    <div className="text-sm font-medium text-gray-800">{style.name}</div>
                    <div className="text-xs text-gray-500">{style.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Aspect Ratio */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-purple-100 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Aspect Ratio</h3>
              <div className="grid grid-cols-2 gap-3">
                {aspectRatios.map((ratio) => (
                  <button
                    key={ratio.id}
                    onClick={() => setAspectRatio(ratio.id)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      aspectRatio === ratio.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="text-sm font-medium text-gray-800">{ratio.name}</div>
                    <div className="text-xs text-gray-500">{ratio.size}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating || (!input.trim() && !selectedFile)}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg"
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
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </div>

          {/* Right Panel - Result */}
          <div className="space-y-6">
            {showResult && generatedImage ? (
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-purple-100 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Generated Image</h3>
                <div className="space-y-4">
                  <img 
                    src={generatedImage} 
                    alt="Generated" 
                    className="w-full rounded-lg shadow-md"
                  />
                  <button 
                    onClick={downloadGenerated}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download Image</span>
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
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Ready to Create</h3>
                    <p className="text-gray-600">Enter a description and choose your style to generate an amazing image</p>
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
