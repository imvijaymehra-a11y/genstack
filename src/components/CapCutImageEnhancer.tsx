'use client';

import { useState, useRef, useEffect } from 'react';
import { Upload, X, Sparkles, Zap, Camera, Sun, Palette, Wand2, Download, ArrowRight } from 'lucide-react';

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
  const [showComparison, setShowComparison] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const comparisonRef = useRef<HTMLDivElement>(null);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
        setShowComparison(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    setShowComparison(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) return;
    if (isGenerating) return;

    try {
      const enhancedInput = `${enhancementType}: enhance photo`;
      await onGenerate(enhancedInput, selectedFile);
      if (generatedImage) {
        setShowComparison(true);
      }
    } catch (error) {
      console.error('Enhancement failed:', error);
    }
  };

  const enhancementOptions = [
    {
      id: 'auto',
      name: 'Auto Enhance',
      icon: <Zap className="h-5 w-5" />,
      description: 'One-tap AI enhancement',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      id: 'portrait',
      name: 'Portrait',
      icon: <Camera className="h-5 w-5" />,
      description: 'Perfect for faces',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'landscape',
      name: 'Landscape',
      icon: <Sun className="h-5 w-5" />,
      description: 'Nature & scenery',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      id: 'color',
      name: 'Color Boost',
      icon: <Palette className="h-5 w-5" />,
      description: 'Vibrant colors',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              AI Photo Enhancer
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Transform your photos with one-tap AI enhancement using Nano Banana model
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column - Upload & Enhancement */}
          <div className="space-y-6">
            
            {/* Upload Area */}
            <div
              className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
                dragActive
                  ? 'border-purple-500 bg-purple-500/10 scale-[1.02]'
                  : 'border-gray-600 bg-gray-800/50 hover:border-purple-400 hover:bg-gray-800/70'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={isGenerating}
              />
              
              <div className="space-y-4">
                <div className="flex justify-center">
                  {previewUrl ? (
                    <div className="relative">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="max-h-64 max-w-full rounded-xl shadow-2xl"
                      />
                      <button
                        type="button"
                        onClick={removeFile}
                        className="absolute -top-2 -right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        disabled={isGenerating}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex justify-center">
                        <Upload className="h-16 w-16 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-xl font-medium text-white mb-2">
                          Drop your photo here
                        </p>
                        <p className="text-gray-400">
                          or click to browse
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="text-xs text-gray-500">
                  Supported: JPG, PNG, WebP (Max 10MB)
                </div>
              </div>
            </div>

            {/* Enhancement Options */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Choose Enhancement</h3>
              <div className="grid grid-cols-2 gap-3">
                {enhancementOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setEnhancementType(option.id)}
                    className={`relative p-4 rounded-xl transition-all duration-300 ${
                      enhancementType === option.id
                        ? 'bg-gradient-to-r ' + option.gradient + ' text-white shadow-lg scale-[1.05]'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                    }`}
                    disabled={isGenerating}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        {option.icon}
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-sm">{option.name}</div>
                        <div className="text-xs opacity-80">{option.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Enhance Button */}
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={!selectedFile || isGenerating}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Enhancing...</span>
                </>
              ) : (
                <>
                  <Wand2 className="h-5 w-5" />
                  <span>Enhance Photo</span>
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </div>

          {/* Right Column - Result */}
          <div className="space-y-6">
            
            {/* Before/After Comparison */}
            {generatedImage && (
              <div className="bg-gray-800/50 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Result</h3>
                  <button
                    onClick={() => setShowComparison(!showComparison)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                  >
                    {showComparison ? 'Hide' : 'Show'} Comparison
                  </button>
                </div>

                {showComparison ? (
                  <div className="relative rounded-xl overflow-hidden border border-gray-700">
                    <div
                      ref={comparisonRef}
                      className="relative w-full h-96 cursor-ew-resize select-none"
                    >
                      {/* Before Image */}
                      <img
                        src={previewUrl}
                        alt="Before"
                        className="absolute inset-0 w-full h-full object-contain bg-gray-900"
                      />
                      
                      {/* After Image */}
                      <div
                        className="absolute inset-0 overflow-hidden"
                        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                      >
                        <img
                          src={generatedImage}
                          alt="After"
                          className="absolute inset-0 w-full h-full object-contain bg-gray-900"
                        />
                      </div>

                      {/* Labels */}
                      <div className="absolute top-4 left-4 px-3 py-1 bg-black/70 text-white text-sm rounded">
                        Before
                      </div>
                      <div className="absolute top-4 right-4 px-3 py-1 bg-purple-600/70 text-white text-sm rounded">
                        Enhanced
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-2">Enhanced Photo</h4>
                      <img
                        src={generatedImage}
                        alt="Enhanced"
                        className="w-full rounded-xl"
                      />
                    </div>
                    <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors flex items-center justify-center space-x-2">
                      <Download className="h-4 w-4" />
                      <span>Download Enhanced</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* AI Model Info */}
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-6 border border-purple-500/30">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white">Nano Banana AI</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Advanced AI model trained on millions of photos for professional enhancement results
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <div className="text-purple-400 font-medium">Processing Time</div>
                  <div className="text-white">2-3 seconds</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <div className="text-purple-400 font-medium">Quality</div>
                  <div className="text-white">Professional</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
