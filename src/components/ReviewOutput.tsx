import React from 'react';
import type { CodeReview, ActiveTab, LoadingAction, Translations } from '../types';
import { FeedbackCard } from './FeedbackCard';
import { SparklesIcon } from './icons/SparklesIcon';
import { CodePreview } from './CodePreview';

interface ReviewOutputProps {
  t: Translations;
  review: CodeReview | null;
  generatedTests: string;
  codeExplanation: string;
  generatedDocs: string;
  isLoading: boolean;
  loadingAction: LoadingAction | null;
  code: string;
  language: string;
  selectedFeedbackIndex: number | null;
  onFeedbackSelect: (index: number | null) => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

const TabButton: React.FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
      isActive
        ? 'bg-gray-800 text-cyan-400'
        : 'bg-gray-900 text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
    }`}
  >
    {label}
  </button>
);

const InitialState: React.FC<{ title: string; message: string; icon: React.ReactNode; }> = ({ title, message, icon }) => (
    <div className="flex flex-col items-center justify-center h-full text-gray-500 p-6 text-center">
        {icon}
        <h3 className="text-lg font-semibold">{title}</h3>
        <p>{message}</p>
    </div>
);

const ReviewContent: React.FC<Pick<ReviewOutputProps, 't' | 'review' | 'code' | 'selectedFeedbackIndex' | 'onFeedbackSelect'>> = ({
    t, review, code, selectedFeedbackIndex, onFeedbackSelect
}) => {
    const selectedLineNumber = review?.review[selectedFeedbackIndex ?? -1]?.lineNumber;

    if (!review) return <InitialState title={t.initialStateTitle} message={t.initialStateMessage} icon={<SparklesIcon className="w-16 h-16 mb-4" />} />;
    
    if (review.review.length === 0 && review.summary) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 text-center p-6">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <h3 className="text-lg font-semibold">{t.greatJob}</h3>
                <p className="text-gray-500 mb-4">{t.noIssuesFound}</p>
                <div className="w-full max-w-2xl text-left bg-gray-800 p-4 rounded-lg"><h4 className="font-semibold text-gray-200 mb-2">{t.aiSummary}</h4><p className="text-sm text-gray-300 whitespace-pre-wrap">{review.summary}</p></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full"><div className="flex-shrink-0 p-6 pb-4"><h3 className="text-base font-semibold text-gray-300 mb-2">{t.overallSummary}</h3><div className="bg-gray-900/50 p-3 rounded-md text-sm text-gray-400 whitespace-pre-wrap border border-gray-700">{review.summary}</div></div><div className="flex-grow grid grid-rows-2 min-h-0"><div className="row-span-1 p-6 pt-2 pb-2 min-h-0"><CodePreview code={code} highlightedLine={selectedLineNumber} /></div><div className="row-span-1 overflow-y-auto p-6 pt-4 border-t border-gray-700"><h3 className="text-base font-semibold text-gray-300 mb-3">{t.detailedFeedback}</h3><div className="space-y-4">{review.review.map((item, index) => (<FeedbackCard t={t} key={index} item={item} isSelected={selectedFeedbackIndex === index} onClick={() => onFeedbackSelect(selectedFeedbackIndex === index ? null : index)}/>))}</div></div></div></div>
    );
};

const TestContent: React.FC<Pick<ReviewOutputProps, 't' | 'generatedTests' | 'language'>> = ({ t, generatedTests, language }) => {
    if (!generatedTests) return <InitialState title={t.initialStateTestsTitle} message={t.initialStateTestsMessage} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1"><path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2.25 2.25 0 003.072 0l-.548-.547a.75.75 0 011.06-1.06l.548.547a2.25 2.25 0 10-1.512-4.113l.883-1.529a.75.75 0 011.299.75l-.883 1.529a2.25 2.25 0 00-3.072 0l-.548-.547a.75.75 0 01-1.06-1.06l.548.547a2.25 2.25 0 101.512 4.113l-.883 1.529a.75.75 0 01-1.3-.75l.883-1.529z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.625-6.375l.883-1.529a.75.75 0 011.299.75l-.883 1.529A10.504 10.504 0 0112 22.5c-5.798 0-10.5-4.702-10.5-10.5S6.202 1.5 12 1.5s10.5 4.702 10.5 10.5a.75.75 0 01-1.5 0A9.004 9.004 0 0012 3c-4.962 0-9 4.038-9 9s4.038 9 9 9z" /></svg>} />;
    return <div className="p-6 h-full flex flex-col"><p className="text-sm text-gray-400 mb-4">{t.testContentMessage(language)}</p><div className="flex-grow min-h-0"><CodePreview code={generatedTests} highlightedLine={null} /></div></div>;
};

const ExplanationContent: React.FC<Pick<ReviewOutputProps, 't' | 'codeExplanation'>> = ({ t, codeExplanation }) => {
    if (!codeExplanation) return <InitialState title={t.initialStateExplainTitle} message={t.initialStateExplainMessage} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1"><path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />;
    return <div className="p-6 h-full overflow-y-auto"><div className="prose prose-sm prose-invert max-w-none whitespace-pre-wrap">{codeExplanation}</div></div>;
};

const DocsContent: React.FC<Pick<ReviewOutputProps, 't' | 'generatedDocs'>> = ({ t, generatedDocs }) => {
    if (!generatedDocs) return <InitialState title={t.initialStateDocsTitle} message={t.initialStateDocsMessage} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>} />;
    return <div className="p-6 h-full flex flex-col"><p className="text-sm text-gray-400 mb-4">{t.docsContentMessage}</p><div className="flex-grow min-h-0"><CodePreview code={generatedDocs} highlightedLine={null} /></div></div>;
};

const SkeletonLoader: React.FC = () => (<div className="p-6 space-y-4 animate-pulse"><div className="h-4 bg-gray-700/50 rounded w-1/3 mb-4"></div><div className="h-10 bg-gray-700/50 rounded w-full"></div>{[...Array(3)].map((_, i) => (<div key={i} className="bg-gray-700/50 rounded-lg p-4 mt-6"><div className="h-4 bg-gray-600 rounded w-1/4 mb-3"></div><div className="h-3 bg-gray-600 rounded w-full mb-2"></div><div className="h-3 bg-gray-600 rounded w-5/6"></div></div>))}</div>);

export const ReviewOutput: React.FC<ReviewOutputProps> = (props) => {
  const { t, activeTab, setActiveTab, isLoading } = props;

  const renderContent = () => {
    if (isLoading) return <SkeletonLoader />;
    switch (activeTab) {
      case 'review': return <ReviewContent {...props} />;
      case 'tests': return <TestContent {...props} />;
      case 'explanation': return <ExplanationContent {...props} />;
      case 'docs': return <DocsContent {...props} />;
      default: return null;
    }
  };
  
  const tabConfig = {
      review: t.tabReview,
      tests: t.tabTests,
      explanation: t.tabExplanation,
      docs: t.tabDocs,
  }

  return (
    <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl shadow-lg flex flex-col h-full overflow-hidden">
        <div className="flex-shrink-0 px-6 pt-4 border-b border-gray-700">
            <div className="flex space-x-1">
                <TabButton label={tabConfig.review} isActive={activeTab === 'review'} onClick={() => setActiveTab('review')} />
                <TabButton label={tabConfig.tests} isActive={activeTab === 'tests'} onClick={() => setActiveTab('tests')} />
                <TabButton label={tabConfig.explanation} isActive={activeTab === 'explanation'} onClick={() => setActiveTab('explanation')} />
                <TabButton label={tabConfig.docs} isActive={activeTab === 'docs'} onClick={() => setActiveTab('docs')} />
            </div>
        </div>
        <div className="flex-grow min-h-0 bg-gray-800">
            {renderContent()}
        </div>
    </div>
  );
};
