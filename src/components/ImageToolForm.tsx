'use client';

import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Sparkles, Wand2, Palette, Sun, Camera, ShoppingCart } from 'lucide-react';

interface ImageToolFormProps {
  toolName: string;
  toolSlug: string;
  onGenerate: (input: string, file?: File) => Promise<string>;
  isGenerating: boolean;
}

export default function ImageToolForm({ toolName, toolSlug, onGenerate, isGenerating }: ImageToolFormProps) {
  const [input, setInput] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [dragActive, setDragActive] = useState(false);
  const [enhancementType, setEnhancementType] = useState<string>('auto');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const imageTools = ['background-remover', 'image-enhancer', 'ai-image-generator'];
  const isImageTool = imageTools.includes(toolSlug);
  const isEnhancer = toolSlug === 'image-enhancer';

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
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
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation based on tool type
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
    } catch (error) {
      console.error('Generation failed:', error);
    }
  };

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

      {/* Tool-specific tips */}
      {isImageTool && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">💡 Professional Tips:</h4>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
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
