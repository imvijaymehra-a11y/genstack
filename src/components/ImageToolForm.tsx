'use client';

import { useState, useRef, useEffect } from 'react';
import { Upload, X, Image as ImageIcon, Sparkles, Wand2, Palette, Sun, Camera, ShoppingCart, ArrowLeftRight, Eye } from 'lucide-react';

interface ImageToolFormProps {
  toolName: string;
  toolSlug: string;
  onGenerate: (input: string, file?: File) => Promise<string>;
  isGenerating: boolean;
  generatedImage?: string;
}

export default function ImageToolForm({ toolName, toolSlug, onGenerate, isGenerating, generatedImage }: ImageToolFormProps) {
  const [input, setInput] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [dragActive, setDragActive] = useState(false);
  const [enhancementType, setEnhancementType] = useState<string>('auto');
  const [showComparison, setShowComparison] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const comparisonRef = useRef<HTMLDivElement>(null);

  const imageTools = ['background-remover', 'image-enhancer', 'ai-image-generator'];
  const isImageTool = imageTools.includes(toolSlug);
  const isEnhancer = toolSlug === 'image-enhancer';
  const hasGeneratedImage = generatedImage && (toolSlug === 'background-remover' || toolSlug === 'image-enhancer');

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

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
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
    
    if (isImageTool && !selectedFile && !input.trim()) {
      return;
    }
    
    if (!isImageTool && !input.trim()) {
      return;
    }

    if (isGenerating) return;

    try {
      const enhancedInput = isEnhancer ? `${enhancementType}: ${input}` : input;
      await onGenerate(enhancedInput, selectedFile || undefined);
      if (hasGeneratedImage) {
        setShowComparison(true);
      }
    } catch (error) {
      console.error('Generation failed:', error);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !comparisonRef.current) return;
    
    const rect = comparisonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || !comparisonRef.current) return;
    
    const rect = comparisonRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging]);

  const getPlaceholder = () => {
    const placeholders: Record<string, string> = {
      'background-remover': 'Describe any specific requirements for the background removal (optional)...',
      'image-enhancer': 'Describe what kind of enhancement you want (e.g., "make colors more vibrant", "reduce noise")...',
      'ai-image-generator': 'Describe the image you want to generate. Include style, subject, colors, mood, and any specific details...'
    };

    return placeholders[toolSlug] || `Enter your ${toolName.toLowerCase()} request here...`;
  };

  const getFileSizeLimit = () => {
    const limits: Record<string, number> = {
      'background-remover': 10, // 10MB
      'image-enhancer': 15,     // 15MB
      'ai-image-generator': 5   // 5MB (for reference images)
    };
    return (limits[toolSlug] || 10) * 1024 * 1024; // Convert to bytes
  };

  const getEnhancementOptions = () => {
    return [
      {
        id: 'auto',
        name: 'Auto Enhancement',
        description: 'Automatically improve overall image quality',
        icon: <Wand2 className="h-5 w-5" />,
        time: '2-3 seconds'
      },
      {
        id: 'resolution',
        name: '4K Upscaling',
        description: 'Increase image resolution to 4K quality',
        icon: <Camera className="h-5 w-5" />,
        time: '3-5 seconds'
      },
      {
        id: 'colors',
        name: 'Color Enhancement',
        description: 'Improve color balance and saturation',
        icon: <Palette className="h-5 w-5" />,
        time: '2-3 seconds'
      },
      {
        id: 'lighting',
        name: 'Lighting Fix',
        description: 'Optimize lighting and exposure',
        icon: <Sun className="h-5 w-5" />,
        time: '2-3 seconds'
      },
      {
        id: 'portrait',
        name: 'Portrait Enhancement',
        description: 'Professional portrait retouching',
        icon: <ImageIcon className="h-5 w-5" />,
        time: '3-4 seconds'
      },
      {
        id: 'product',
        name: 'Product Enhancement',
        description: 'E-commerce product photo optimization',
        icon: <ShoppingCart className="h-5 w-5" />,
        time: '2-3 seconds'
      }
    ];
  };

  const getPromptExamples = () => {
    const examples: Record<string, string[]> = {
      'ai-image-generator': [
        'A photorealistic portrait of a woman with freckles, soft natural lighting, shallow depth of field, professional photography',
        'A futuristic cityscape at sunset with flying cars, neon lights, cyberpunk aesthetic, highly detailed, 8k',
        'A cute cartoon panda eating bamboo in a bamboo forest, digital art, vibrant colors, adorable',
        'A minimalist product photo of a luxury watch on a marble surface, studio lighting, clean background',
        'An oil painting of a stormy sea with lighthouse, dramatic lighting, romanticism style'
      ]
    };
    return examples[toolSlug] || [];
  };

  const getBestPractices = () => {
    const practices: Record<string, string[]> = {
      'ai-image-generator': [
        'Be specific about style: photorealistic, digital art, oil painting, watercolor, etc.',
        'Include lighting details: soft morning light, dramatic sunset, studio lighting',
        'Specify composition: close-up, wide angle, bird\'s eye view, rule of thirds',
        'Add mood and atmosphere: mysterious, cheerful, melancholic, energetic',
        'Describe colors and textures: vibrant pastels, earthy tones, metallic finish',
        'Include quality terms: highly detailed, 8k, professional photography, sharp focus'
      ],
      'background-remover': [
        'Use images with clear subject-background separation',
        'Avoid complex backgrounds with similar colors to subject',
        'Higher resolution images give better results',
        'PNG format preserves transparency best',
        'For portraits, ensure hair is well-lit and separated'
      ],
      'image-enhancer': [
        'Choose enhancement type based on your needs',
        'Auto enhancement works well for most images',
        '4K upscaling works best with high-quality originals',
        'Portrait enhancement optimizes skin tones and facial features',
        'Product enhancement focuses on clarity and color accuracy'
      ]
    };
    return practices[toolSlug] || [];
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Image Upload Section */}
      {isImageTool && (
        <div className="space-y-4">
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
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
                      className="max-h-64 max-w-full rounded-lg shadow-lg"
                    />
                    <button
                      type="button"
                      onClick={removeFile}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      disabled={isGenerating}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <ImageIcon className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                    </div>
                    <div>
                      <p className="text-lg font-medium text-gray-900 dark:text-white">
                        Upload your image
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Drag and drop, or click to browse
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Supported formats: JPG, PNG, GIF, WebP (Max {Math.round(getFileSizeLimit() / 1024 / 1024)}MB)
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Before/After Comparison */}
      {hasGeneratedImage && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Before & After Comparison
            </h3>
            <button
              type="button"
              onClick={() => setShowComparison(!showComparison)}
              className="flex items-center space-x-2 px-3 py-1.5 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors"
            >
              <Eye className="h-4 w-4" />
              <span className="text-sm">{showComparison ? 'Hide' : 'Show'} Comparison</span>
            </button>
          </div>

          {showComparison && (
            <div className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
              <div
                ref={comparisonRef}
                className="relative w-full h-96 cursor-ew-resize select-none"
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
              >
                {/* Before Image */}
                <img
                  src={previewUrl}
                  alt="Before"
                  className="absolute inset-0 w-full h-full object-contain bg-gray-100 dark:bg-gray-800"
                />
                
                {/* After Image */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                  <img
                    src={generatedImage}
                    alt="After"
                    className="absolute inset-0 w-full h-full object-contain bg-gray-100 dark:bg-gray-800"
                  />
                </div>

                {/* Slider Line */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
                    <ArrowLeftRight className="h-4 w-4 text-gray-600" />
                  </div>
                </div>

                {/* Labels */}
                <div className="absolute top-4 left-4 px-2 py-1 bg-black bg-opacity-50 text-white text-sm rounded">
                  Before
                </div>
                <div className="absolute top-4 right-4 px-2 py-1 bg-black bg-opacity-50 text-white text-sm rounded">
                  After
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Enhancement Options for Image Enhancer */}
      {isEnhancer && (
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Enhancement Type
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {getEnhancementOptions().map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setEnhancementType(option.id)}
                className={`p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                  enhancementType === option.id
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
                disabled={isGenerating}
              >
                <div className="flex items-start space-x-3">
                  <div className="mt-0.5">
                    {option.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-gray-900 dark:text-white">
                      {option.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {option.description}
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                      {option.time}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Text Input Section */}
      <div className="space-y-4">
        <div>
          <label htmlFor="input" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            {isImageTool ? 'Additional Instructions (Optional)' : 'Your Request'}
          </label>
          <textarea
            id="input"
            value={input}
            onChange={handleInputChange}
            placeholder={getPlaceholder()}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-none"
            disabled={isGenerating}
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isGenerating || (isImageTool && !selectedFile && !input.trim()) || (!isImageTool && !input.trim())}
        className="w-full flex justify-center items-center py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
      >
        {isGenerating ? (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
        ) : (
          <>
            <Sparkles className="h-5 w-5 mr-2" />
            {toolSlug === 'background-remover' && 'Remove Background'}
            {toolSlug === 'image-enhancer' && 'Enhance Image'}
            {toolSlug === 'ai-image-generator' && 'Generate Image'}
            {!isImageTool && 'Generate Content'}
          </>
        )}
      </button>

      {/* Prompt Examples */}
      {toolSlug === 'ai-image-generator' && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-3">💡 Prompt Examples:</h4>
          <div className="space-y-2">
            {getPromptExamples().map((example, index) => (
              <div key={index} className="text-sm text-blue-800 dark:text-blue-200 bg-white dark:bg-blue-900/30 p-2 rounded border border-blue-200 dark:border-blue-700">
                "{example}"
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Best Practices */}
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
        <h4 className="font-medium text-green-900 dark:text-green-100 mb-3">🎯 Best Practices:</h4>
        <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
          {getBestPractices().map((practice, index) => (
            <li key={index} className="flex items-start">
              <span className="mr-2">•</span>
              <span>{practice}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Tool-specific tips */}
      {isImageTool && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
          <h4 className="font-medium text-amber-900 dark:text-amber-100 mb-2">💡 Professional Tips:</h4>
          <ul className="text-sm text-amber-800 dark:text-amber-200 space-y-1">
            {toolSlug === 'background-remover' && (
              <>
                <li>• Use high-contrast images for best results</li>
                <li>• PNG format recommended for transparent backgrounds</li>
                <li>• Avoid complex backgrounds with similar colors to subject</li>
                <li>• Professional cutout quality in 2-3 seconds</li>
              </>
            )}
            {toolSlug === 'image-enhancer' && (
              <>
                <li>• Higher resolution images give better enhancement results</li>
                <li>• Select specific enhancement type for optimal results</li>
                <li>• Multiple enhancements can be applied sequentially</li>
                <li>• Professional quality processing with AI technology</li>
              </>
            )}
            {toolSlug === 'ai-image-generator' && (
              <>
                <li>• Be specific about style, mood, and composition</li>
                <li>• Include details about colors, lighting, and atmosphere</li>
                <li>• Reference images can help guide the generation</li>
                <li>• Professional AI models for photorealistic results</li>
              </>
            )}
          </ul>
        </div>
      )}
    </form>
  );
}
