'use client';

import { useState, useRef, useEffect } from 'react';
import { Upload, X, Sparkles, Zap, Camera, Sun, Palette, Wand2, Download, ArrowRight, ChevronLeft, ChevronRight, Scissors } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
  const [selectedResolution, setSelectedResolution] = useState('original');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const comparisonRef = useRef<HTMLDivElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setShowComparison(false);
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
      setShowComparison(false);
    }
  };

  const handleGenerate = async () => {
    if (!selectedFile) return;
    
    try {
      await onGenerate(enhancementType, selectedFile);
      setShowComparison(true);
    } catch (error) {
      console.error('Enhancement failed:', error);
    }
  };

  const downloadEnhanced = async () => {
    if (!generatedImage) return;
    
    try {
      // Check selected resolution
      let maxAllowedSize = Infinity;
      if (selectedResolution === '750px') maxAllowedSize = 750;
      else if (selectedResolution === '500px') maxAllowedSize = 500;
      else if (selectedResolution === '300px') maxAllowedSize = 300;
      // 'original' means no limit
      
      if (maxAllowedSize !== Infinity) {
        // Create a temporary image to check dimensions
        const img = new Image() as HTMLImageElement;
        img.src = generatedImage;
        
        img.onload = async () => {
          const width = img.naturalWidth;
          const height = img.naturalHeight;
          const maxDimension = Math.max(width, height);
          
          if (maxDimension > maxAllowedSize) {
            alert(`Images larger than ${maxAllowedSize}px require a premium subscription. Please upgrade to download high-resolution images.`);
            return;
          }
          
          // Proceed with download
          proceedWithDownload();
        };
        
        img.onerror = () => {
          console.error('Failed to load image for dimension check');
          proceedWithDownload();
        };
      } else {
        // Original resolution - always allow download
        proceedWithDownload();
      }
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const proceedWithDownload = async () => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            {toolName}
          </h1>
          <p className="text-gray-600 text-lg">Enhance your images with professional AI technology</p>
        </div>

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
                        setShowComparison(false);
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

            {/* Resolution Selection */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-purple-100 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Download Resolution</h3>
              <select
                value={selectedResolution}
                onChange={(e) => setSelectedResolution(e.target.value)}
                className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
              >
                <option value="original">Original Resolution (Premium)</option>
                <option value="750px">Up to 750px (Free)</option>
                <option value="500px">Up to 500px (Free)</option>
                <option value="300px">Up to 300px (Free)</option>
              </select>
              <div className="mt-2 text-sm text-gray-600">
                {selectedResolution === 'original' 
                  ? 'Download in original resolution (Premium required for large images)'
                  : `Free download for images up to ${selectedResolution.replace('px', '')}px`
                }
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
            {showComparison && generatedImage && previewUrl ? (
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-purple-100 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Enhanced Result</h3>
                
                {/* Comparison Slider */}
                <div 
                  ref={comparisonRef}
                  className="relative w-full h-96 rounded-lg overflow-hidden mb-4 cursor-ew-resize select-none"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                    const rect = comparisonRef.current?.getBoundingClientRect();
                    if (rect) {
                      const x = e.clientX - rect.left;
                      const percentage = (x / rect.width) * 100;
                      setSliderPosition(Math.min(100, Math.max(0, percentage)));
                    }
                  }}
                  onMouseMove={(e) => {
                    if (!isDragging) return;
                    e.preventDefault();
                    const rect = comparisonRef.current?.getBoundingClientRect();
                    if (rect) {
                      const x = e.clientX - rect.left;
                      const percentage = (x / rect.width) * 100;
                      setSliderPosition(Math.min(100, Math.max(0, percentage)));
                    }
                  }}
                  onMouseUp={() => {
                    setIsDragging(false);
                  }}
                  onMouseLeave={() => {
                    setIsDragging(false);
                  }}
                >
                  {/* Enhanced Image (Left Side) */}
                  <div 
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${sliderPosition}%` }}
                  >
                    <img 
                      src={generatedImage} 
                      alt="Enhanced" 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Original Image (Right Side) */}
                  <img 
                    src={previewUrl} 
                    alt="Original" 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  
                  {/* Slider Line */}
                  <div 
                    className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center cursor-ew-resize">
                      <ChevronLeft className="h-4 w-4 text-gray-600" />
                      <ChevronRight className="h-4 w-4 text-gray-600" />
                    </div>
                  </div>
                  
                  {/* Labels */}
                  <div className="absolute top-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                    Enhanced
                  </div>
                  <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                    Original
                  </div>
                </div>

                {/* Download Button */}
                <button 
                  onClick={downloadEnhanced}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Download className="h-4 w-4" />
                  <span>
                    Download Enhanced (
                    {selectedResolution === 'original' 
                      ? 'Original Resolution' 
                      : `Free up to ${selectedResolution}`
                    })
                  </span>
                </button>
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
      
      <Footer />
    </div>
  );
}
