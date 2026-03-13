'use client';

import { useState } from 'react';
import { AI_MODELS, AIModel, getModelById } from '@/lib/ai-models';
import { ChevronDown, Check, Star, Zap, Crown } from 'lucide-react';

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (modelId: string) => void;
  className?: string;
}

export default function ModelSelector({ selectedModel, onModelChange, className = '' }: ModelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const currentModel = getModelById(selectedModel) || AI_MODELS[0];

  const getModelIcon = (model: AIModel) => {
    if (model.cost === 'free') return <Zap className="h-4 w-4 text-green-500" />;
    if (model.id.includes('gpt-4') || model.id.includes('opus')) return <Crown className="h-4 w-4 text-yellow-500" />;
    return <Star className="h-4 w-4 text-blue-500" />;
  };

  const getModelBadge = (model: AIModel) => {
    if (model.cost === 'free') {
      return (
        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
          Free
        </span>
      );
    }
    return (
      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
        Premium
      </span>
    );
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <span className="text-xl">{currentModel.icon}</span>
          <div className="text-left">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-900 dark:text-white">
                {currentModel.name}
              </span>
              {getModelBadge(currentModel)}
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {currentModel.provider}
            </span>
          </div>
        </div>
        <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          <div className="p-2">
            {AI_MODELS.map((model) => (
              <button
                key={model.id}
                onClick={() => {
                  onModelChange(model.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                  selectedModel === model.id
                    ? 'bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-700'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{model.icon}</span>
                  <div className="text-left flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {model.name}
                      </span>
                      {getModelBadge(model)}
                      {selectedModel === model.id && (
                        <Check className="h-4 w-4 text-indigo-600" />
                      )}
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {model.provider}
                    </span>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {model.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {model.strengths.slice(0, 2).map((strength, index) => (
                        <span
                          key={index}
                          className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded"
                        >
                          {strength}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Compact version for smaller spaces
export function CompactModelSelector({ selectedModel, onModelChange, className = '' }: ModelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const currentModel = getModelById(selectedModel) || AI_MODELS[0];

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <span>{currentModel.icon}</span>
        <span className="font-medium text-gray-900 dark:text-white">
          {currentModel.name}
        </span>
        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-64 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <div className="p-2">
            {AI_MODELS.map((model) => (
              <button
                key={model.id}
                onClick={() => {
                  onModelChange(model.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center space-x-2 p-2 rounded transition-colors ${
                  selectedModel === model.id
                    ? 'bg-indigo-50 dark:bg-indigo-900/20'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <span>{model.icon}</span>
                <div className="text-left flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900 dark:text-white text-sm">
                      {model.name}
                    </span>
                    {selectedModel === model.id && (
                      <Check className="h-3 w-3 text-indigo-600" />
                    )}
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {model.provider}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
