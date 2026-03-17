'use client';

import { useState, useRef } from 'react';
import { Upload, X, Sparkles, Wand2, Download, Image, Palette, Zap, ArrowRight, RefreshCw, Settings, Layers } from 'lucide-react';

interface CapCutImageGeneratorProps {
  toolName: string;
  toolSlug: string;
  onGenerate: (input: string, file?: File) => Promise<string>;
  isGenerating: boolean;
  generatedImage?: string;
}

export default function CapCutImageGenerator({ toolName, toolSlug, onGenerate, isGenerating, generatedImage }: CapCutImageGeneratorProps) {
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [imageStyle, setImageStyle] = useState('realistic');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [quality, setQuality] = useState('standard');
  const [selectedResolution, setSelectedResolution] = useState('750px'); // Add resolution state
  const [showAdvanced, setShowAdvanced] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const imageStyles = [
    {
      id: 'realistic',
      name: 'Realistic',
      icon: <Image className="h-5 w-5" />,
      description: 'Photorealistic',
      gradient: 'from-blue-500 to-purple-500',
      prompt: 'photorealistic, high detail, professional photography'
    },
    {
      id: 'artistic',
      name: 'Artistic',
      icon: <Palette className="h-5 w-5" />,
      description: 'Creative style',
      gradient: 'from-purple-500 to-pink-500',
      prompt: 'artistic, creative, digital art'
    },
    {
      id: 'anime',
      name: 'Anime',
      icon: <Sparkles className="h-5 w-5" />,
      description: 'Japanese style',
      gradient: 'from-pink-500 to-red-500',
      prompt: 'anime style, manga, Japanese animation'
    },
    {
      id: '3d',
      name: '3D Render',
      icon: <Wand2 className="h-5 w-5" />,
      description: '3D visualization',
      gradient: 'from-green-500 to-blue-500',
      prompt: '3d render, CGI, digital 3d'
    },
    {
      id: 'cinematic',
      name: 'Cinematic',
      icon: <Layers className="h-5 w-5" />,
      description: 'Movie style',
      gradient: 'from-orange-500 to-red-500',
      prompt: 'cinematic, dramatic lighting, film style'
    },
    {
      id: 'fantasy',
      name: 'Fantasy',
      icon: <Sparkles className="h-5 w-5" />,
      description: 'Magical style',
      gradient: 'from-indigo-500 to-purple-500',
      prompt: 'fantasy, magical, ethereal'
    }
  ];

  const aspectRatios = [
    { id: '1:1', name: 'Square', size: '1024x1024' },
    { id: '16:9', name: 'Landscape', size: '1024x576' },
    { id: '9:16', name: 'Portrait', size: '576x1024' },
    { id: '4:3', name: 'Standard', size: '1024x768' },
    { id: '3:2', name: 'Classic', size: '1024x683' }
  ];

  const qualityOptions = [
    { id: 'standard', name: 'Standard', description: 'Good quality, fast generation' },
    { id: 'high', name: 'High', description: 'Better quality, slower generation' },
    { id: 'ultra', name: 'Ultra', description: 'Best quality, slowest generation' }
  ];

  const resolutionOptions = [
    { id: '750px', name: '750px', description: 'Free - Good quality' },
    { id: '1024px', name: '1024px', description: 'Standard - Better quality' },
    { id: '2048px', name: '2048px', description: 'High - Professional quality' },
    { id: '4096px', name: '4096px', description: 'Ultra - Maximum quality' }
  ];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
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

  const buildFullPrompt = () => {
    const stylePrompt = imageStyles.find(s => s.id === imageStyle)?.prompt || '';
    const qualityPrompt = quality === 'ultra' ? 'masterpiece, best quality, ultra detailed' : 
                        quality === 'high' ? 'high quality, detailed' : '';
    const aspectPrompt = aspectRatio === '16:9' ? 'wide angle' : 
                       aspectRatio === '9:16' ? 'portrait' : '';
    const resolutionPrompt = selectedResolution === '4096px' ? '4K resolution, extremely detailed' :
                          selectedResolution === '2048px' ? '2K resolution, highly detailed' :
                          selectedResolution === '1024px' ? 'HD resolution, detailed' : 
                          selectedResolution === '750px' ? 'standard resolution' : '';
    
    const prompts = [prompt, stylePrompt, qualityPrompt, aspectPrompt, resolutionPrompt].filter(p => p.trim());
    return prompts.join(', ');
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert('Please enter a description for the image you want to generate');
      return;
    }
    
    console.log('Starting image generation with prompt:', prompt);
    console.log('Selected style:', imageStyle);
    console.log('Selected resolution:', selectedResolution);
    console.log('Selected quality:', quality);
    console.log('Selected aspect ratio:', aspectRatio);
    
    try {
      const fullPrompt = buildFullPrompt();
      console.log('Full prompt being sent:', fullPrompt);
      await onGenerate(fullPrompt, selectedFile || undefined);
    } catch (error) {
      console.error('Generation failed:', error);
      alert('Image generation failed. Please try again.');
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
      link.download = `ai-generated-${toolSlug}-${selectedResolution}-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const regenerateImage = () => {
    handleGenerate();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md border-b border-purple-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {toolName}
                </h1>
                <p className="text-xs text-gray-600">Transform ideas into stunning AI images</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
              >
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Main Controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* Prompt Input */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-purple-100 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Describe Your Image</h3>
                <span className="text-xs text-gray-500">{prompt.length}/1000</span>
              </div>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="A majestic dragon soaring through clouds at sunset, digital art style..."
                className="w-full h-32 px-4 py-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-gray-800 placeholder-gray-400"
                maxLength={1000}
              />
              
              {/* Example Prompts */}
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Example prompts:</p>
                <div className="flex flex-wrap gap-2">
                  {['A futuristic city', 'Fantasy landscape', 'Portrait of a warrior', 'Abstract art'].map((example) => (
                    <button
                      key={example}
                      onClick={() => setPrompt(example)}
                      className="px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Advanced Options */}
            {showAdvanced && (
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-purple-100 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Advanced Options</h3>
                
                {/* Negative Prompt */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Negative Prompt</label>
                  <textarea
                    value={negativePrompt}
                    onChange={(e) => setNegativePrompt(e.target.value)}
                    placeholder="Things to avoid in the image (e.g., blurry, low quality, text)"
                    className="w-full h-20 px-4 py-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-gray-800 placeholder-gray-400"
                    maxLength={500}
                  />
                </div>

                {/* Reference Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reference Image (Optional)</label>
                  <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-purple-300 rounded-lg p-6 text-center cursor-pointer hover:border-purple-500 transition-colors bg-purple-50/50"
                  >
                    {previewUrl ? (
                      <div className="space-y-4">
                        <img src={previewUrl} alt="Preview" className="max-h-32 mx-auto rounded-lg shadow-md" />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedFile(null);
                            setPreviewUrl('');
                          }}
                          className="text-red-500 hover:text-red-700 flex items-center space-x-1 mx-auto text-sm"
                        >
                          <X className="h-4 w-4" />
                          <span>Remove</span>
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Upload className="h-10 w-10 text-purple-400 mx-auto" />
                        <div>
                          <p className="text-gray-700 font-medium text-sm">Drop reference image here</p>
                          <p className="text-xs text-gray-500">or click to browse</p>
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
              </div>
            )}

            {/* Style Selection */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-purple-100 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Image Style</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {imageStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setImageStyle(style.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      imageStyle === style.id
                        ? 'border-purple-500 bg-purple-50 shadow-md'
                        : 'border-gray-200 hover:border-purple-300 hover:shadow-sm'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${style.gradient} flex items-center justify-center text-white mb-3 mx-auto shadow-sm`}>
                      {style.icon}
                    </div>
                    <div className="text-sm font-medium text-gray-800">{style.name}</div>
                    <div className="text-xs text-gray-500">{style.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Aspect Ratio and Quality */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Aspect Ratio */}
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-purple-100 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Aspect Ratio</h3>
                <div className="space-y-2">
                  {aspectRatios.map((ratio) => (
                    <button
                      key={ratio.id}
                      onClick={() => setAspectRatio(ratio.id)}
                      className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                        aspectRatio === ratio.id
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-800">{ratio.name}</div>
                          <div className="text-xs text-gray-500">{ratio.size}</div>
                        </div>
                        {aspectRatio === ratio.id && (
                          <div className="w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quality */}
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-purple-100 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Quality</h3>
                <div className="space-y-2">
                  {qualityOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setQuality(option.id)}
                      className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                        quality === option.id
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-800">{option.name}</div>
                          <div className="text-xs text-gray-500">{option.description}</div>
                        </div>
                        {quality === option.id && (
                          <div className="w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Resolution */}
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-purple-100 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Resolution</h3>
                <div className="space-y-2">
                  {resolutionOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSelectedResolution(option.id)}
                      className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                        selectedResolution === option.id
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-800">{option.name}</div>
                          <div className="text-xs text-gray-500">{option.description}</div>
                        </div>
                        {selectedResolution === option.id && (
                          <div className="w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 shadow-lg"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Generating Magic...</span>
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
            {generatedImage ? (
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-purple-100 shadow-lg sticky top-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Generated Image</h3>
                  <button
                    onClick={regenerateImage}
                    disabled={isGenerating}
                    className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="relative group">
                    <img 
                      src={generatedImage} 
                      alt="Generated" 
                      className="w-full rounded-lg shadow-md"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-lg"></div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={downloadGenerated}
                      className="py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-colors flex items-center justify-center space-x-2 shadow-md"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download {selectedResolution}</span>
                    </button>
                    <button
                      onClick={regenerateImage}
                      disabled={isGenerating}
                      className="py-3 bg-white border-2 border-purple-200 text-purple-600 font-medium rounded-lg hover:bg-purple-50 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
                    >
                      <RefreshCw className="h-4 w-4" />
                      <span>Regenerate</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 border border-purple-100 shadow-lg text-center sticky top-6">
                <div className="space-y-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <Sparkles className="h-10 w-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Create Amazing Images</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Describe what you want to see, choose your style, and let AI create stunning images for you
                    </p>
                  </div>
                  
                  {/* Quick Tips */}
                  <div className="bg-purple-50 rounded-lg p-4 text-left">
                    <h4 className="font-medium text-purple-900 mb-2">Quick Tips:</h4>
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li>• Be specific in your descriptions</li>
                      <li>• Include style and mood keywords</li>
                      <li>• Try different aspect ratios</li>
                      <li>• Use reference images for better results</li>
                    </ul>
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
