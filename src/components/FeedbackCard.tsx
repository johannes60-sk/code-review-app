import React, { useState } from 'react';
import type { FeedbackItem, Translations } from '../types';
import { FeedbackSeverity, FeedbackCategory } from '../types';
import { ClipboardIcon } from './icons/ClipboardIcon';
import { CheckIcon } from './icons/CheckIcon';

interface FeedbackCardProps {
  t: Translations;
  item: FeedbackItem;
  isSelected: boolean;
  onClick: () => void;
}

const severityConfig = {
  [FeedbackSeverity.HIGH]: {
    color: 'border-red-500',
    text: 'text-red-400',
    nameKey: 'severityHigh',
  },
  [FeedbackSeverity.MEDIUM]: {
    color: 'border-yellow-500',
    text: 'text-yellow-400',
    nameKey: 'severityMedium',
  },
  [FeedbackSeverity.LOW]: {
    color: 'border-blue-500',
    text: 'text-blue-400',
    nameKey: 'severityLow',
  },
};

const categoryConfig = {
  [FeedbackCategory.BUG]: { bg: 'bg-red-900/50', text: 'text-red-300' },
  [FeedbackCategory.PERFORMANCE]: { bg: 'bg-purple-900/50', text: 'text-purple-300' },
  [FeedbackCategory.STYLE]: { bg: 'bg-blue-900/50', text: 'text-blue-300' },
  [FeedbackCategory.READABILITY]: { bg: 'bg-green-900/50', text: 'text-green-300' },
  [FeedbackCategory.ARCHITECTURE]: { bg: 'bg-orange-900/50', text: 'text-orange-300' },
};

export const FeedbackCard: React.FC<FeedbackCardProps> = ({ t, item, isSelected, onClick }) => {
  const [isCopied, setIsCopied] = useState(false);
  const sevConfig = severityConfig[item.severity] || severityConfig[FeedbackSeverity.LOW];
  const catConfig = categoryConfig[item.category] || categoryConfig[FeedbackCategory.STYLE];
  
  const handleCopy = (e: React.MouseEvent) => {
      e.stopPropagation(); // Prevent card click when copying
      if (!item.suggestion) return;
      navigator.clipboard.writeText(item.suggestion);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
  }

  return (
    <div 
        className={`border-l-4 ${sevConfig.color} rounded-r-lg p-4 shadow-md transition-all duration-200 cursor-pointer ${isSelected ? 'bg-gray-700/50 ring-2 ring-cyan-500' : 'bg-gray-800/50 hover:bg-gray-700/40'}`}
        onClick={onClick}
    >
      <div className="flex items-center justify-between mb-2 gap-2">
        <div className='flex items-center gap-2 flex-wrap'>
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${catConfig.bg} ${catConfig.text}`}>
            {item.category}
          </span>
          {item.lineNumber && (
            <span className="text-xs text-cyan-300 font-mono bg-cyan-900/50 px-2 py-1 rounded-full">
                {t.line}: {item.lineNumber}
            </span>
          )}
        </div>
        <span className={`text-xs font-bold ${sevConfig.text} flex-shrink-0`}>
          {t[sevConfig.nameKey]} {t.severity}
        </span>
      </div>
      
      <div>
        <h4 className="font-semibold text-gray-300 mb-1">{t.description}</h4>
        <p className="text-sm text-gray-400 mb-3">{item.description}</p>
        <h4 className="font-semibold text-gray-300 mb-1">{t.suggestion}</h4>
        <div className="relative">
            <p className="text-sm text-gray-400 bg-gray-900/50 p-3 pr-10 rounded font-mono whitespace-pre-wrap">{item.suggestion}</p>
            <button
                onClick={handleCopy}
                className="absolute top-2 right-2 p-1 rounded-md text-gray-400 hover:bg-gray-600 hover:text-gray-100 transition-colors"
                aria-label={t.copySuggestion}
                title={t.copySuggestion}
            >
                {isCopied ? <CheckIcon className="w-4 h-4 text-green-400" /> : <ClipboardIcon className="w-4 h-4" />}
            </button>
        </div>
      </div>
    </div>
  );
};