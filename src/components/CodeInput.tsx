import React, { useState, useRef, useEffect } from 'react';
import { LoadingSpinner } from './icons/LoadingSpinner';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { TestTubeIcon } from './icons/TestTubeIcon';
import { QuestionMarkCircleIcon } from './icons/QuestionMarkCircleIcon';
import { DocumentTextIcon } from './icons/DocumentTextIcon';
import { ANALYSIS_OPTIONS } from '../constants';
import type { LoadingAction, Translations } from '../types';

interface CodeInputProps {
  t: Translations;
  code: string;
  setCode: (code: string) => void;
  language: string;
  setLanguage: (lang: string) => void;
  languages: string[];
  selectedAnalyses: string[];
  setSelectedAnalyses: (principles: string[]) => void;
  onReview: () => void;
  onGenerateTests: () => void;
  onExplainCode: () => void;
  onGenerateDocs: () => void;
  isLoading: boolean;
  loadingAction: LoadingAction | null;
}

export const CodeInput: React.FC<CodeInputProps> = ({
  t, code, setCode, language, setLanguage, languages, selectedAnalyses,
  setSelectedAnalyses, onReview, onGenerateTests, onExplainCode,
  onGenerateDocs, isLoading, loadingAction
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handlePrincipleChange = (principleId: string) => {
    setSelectedAnalyses(
      selectedAnalyses.includes(principleId)
        ? selectedAnalyses.filter((p) => p !== principleId)
        : [...selectedAnalyses, principleId]
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const dropdownActions = [
    { label: t.generateTests, icon: <TestTubeIcon />, action: onGenerateTests, key: 'tests' },
    { label: t.explainCode, icon: <QuestionMarkCircleIcon />, action: onExplainCode, key: 'explain' },
    { label: t.generateDocs, icon: <DocumentTextIcon />, action: onGenerateDocs, key: 'docs' },
  ];

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-200">{t.enterCode}</h2>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-gray-700 border border-gray-600 rounded-md px-3 py-1.5 text-gray-200 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
          disabled={isLoading}
        >
          {languages.map((lang) => <option key={lang} value={lang}>{lang}</option>)}
        </select>
      </div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder={t.codeInputPlaceholder(language)}
        className="flex-grow bg-gray-900/70 border border-gray-700 rounded-md p-4 font-mono text-sm text-gray-300 resize-none focus:ring-2 focus:ring-cyan-500 focus:outline-none w-full min-h-[200px]"
        spellCheck="false"
        disabled={isLoading}
      />
      
      <div className="mt-4">
        <h3 className="text-base font-semibold text-gray-300 mb-2">{t.analysisOptions}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
            {ANALYSIS_OPTIONS.map((principle) => (
                <label key={principle.id} className={`flex items-center space-x-3 p-1 rounded-md transition-colors ${isLoading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-gray-700/50'}`}>
                    <input type="checkbox" className="h-4 w-4 rounded bg-gray-700 border-gray-600 text-cyan-600 focus:ring-cyan-500 focus:ring-offset-gray-800"
                        checked={selectedAnalyses.includes(principle.id)} onChange={() => handlePrincipleChange(principle.id)} disabled={isLoading} />
                    <span className="text-sm text-gray-300 select-none">{t[principle.labelKey]}</span>
                </label>
            ))}
        </div>
      </div>
      
      <div className="mt-6 flex gap-2">
        <button onClick={onReview} disabled={isLoading}
          className="flex-grow flex items-center justify-center bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200">
          {loadingAction === 'review' ? (<><LoadingSpinner className="mr-2" />{t.analyzing}</>) : t.reviewCode}
        </button>
        <div className="relative" ref={dropdownRef}>
          <button onClick={() => setIsDropdownOpen(prev => !prev)} disabled={isLoading}
            className="h-full px-3 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors duration-200">
            <ChevronDownIcon className="w-5 h-5" />
          </button>
          {isDropdownOpen && (
            <div className="absolute bottom-full right-0 mb-2 w-56 bg-gray-700 rounded-md shadow-xl z-10 border border-gray-600">
              <div className="p-1">
                {dropdownActions.map(({label, icon, action, key}) => (
                    <button key={key} onClick={() => { action(); setIsDropdownOpen(false); }} disabled={isLoading}
                        className="w-full flex items-center gap-3 text-left px-3 py-2 text-sm text-gray-200 rounded-md hover:bg-cyan-600/50 disabled:opacity-50 disabled:cursor-not-allowed">
                        {loadingAction === key ? <LoadingSpinner className="w-4 h-4" /> : <span className="w-4 h-4">{icon}</span>}
                        <span>{label}</span>
                    </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
