'use client';

import { useState, useRef } from 'react';
import { Upload, X, Sparkles, Scissors, Download, Image, CheckCircle, ArrowRight } from 'lucide-react';

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

  const handleGenerate = async () => {
    if (!selectedFile) return;
    
    try {
      await onGenerate('', selectedFile);
      setShowResult(true);
    } catch (error) {
      console.error('Background removal failed:', error);
    }
  };

  const downloadResult = async () => {
    if (!generatedImage) return;
    
    try {
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `background-removed-${toolSlug}-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-red-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg">
                <Scissors className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                  {toolName}
                </h1>
                <p className="text-xs text-gray-600">Remove backgrounds instantly</p>
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
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-red-100 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Upload Image</h3>
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-red-300 rounded-lg p-8 text-center cursor-pointer hover:border-red-500 transition-colors bg-red-50/50"
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
                    <Upload className="h-12 w-12 text-red-400 mx-auto" />
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

            {/* Background Color Selection */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-red-100 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Background Color</h3>
              <div className="grid grid-cols-3 gap-3">
                {backgroundColors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setBackgroundColor(color.id)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      backgroundColor === color.id
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:border-red-300'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg ${color.color} mb-2 mx-auto border border-gray-300`}></div>
                    <div className="text-sm font-medium text-gray-800">{color.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-red-100 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Features</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-red-500 mr-3" />
                  <span className="text-sm text-gray-700">AI-powered background removal</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-red-500 mr-3" />
                  <span className="text-sm text-gray-700">Preserve fine details</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-red-500 mr-3" />
                  <span className="text-sm text-gray-700">Multiple background options</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-red-500 mr-3" />
                  <span className="text-sm text-gray-700">High-quality output</span>
                </div>
              </div>
            </div>

            {/* Remove Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !selectedFile}
              className="w-full py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold rounded-lg hover:from-red-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg"
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
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </div>

          {/* Right Panel - Result */}
          <div className="space-y-6">
            {showResult && generatedImage ? (
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-red-100 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Result</h3>
                <div className="space-y-4">
                  <img 
                    src={generatedImage} 
                    alt="Background removed" 
                    className="w-full rounded-lg shadow-md"
                  />
                  <button 
                    onClick={downloadResult}
                    className="w-full py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white font-medium rounded-lg hover:from-red-700 hover:to-pink-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download Image</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-12 border border-red-100 shadow-lg text-center">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-pink-600 rounded-full flex items-center justify-center mx-auto">
                    <Scissors className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Ready to Remove</h3>
                    <p className="text-gray-600">Upload an image to remove its background with AI precision</p>
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
