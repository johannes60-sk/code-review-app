import React, { useState, useCallback, useMemo } from "react";
import { CodeInput } from "./components/CodeInput";
import { ReviewOutput } from "./components/ReviewOutput";
import { SparklesIcon } from "./components/icons/SparklesIcon";
import {
  reviewCode,
  generateTests,
  explainCode,
  generateDocs,
} from "./services/geminiService";
import type { CodeReview, ActiveTab, UILang } from "./types";
import { SUPPORTED_LANGUAGES, ANALYSIS_OPTIONS } from "./constants";
import { translations } from "./translations";

const App: React.FC = () => {
  const [code, setCode] = useState<string>("");
  const [language, setLanguage] = useState<string>(SUPPORTED_LANGUAGES[0]);
  const [review, setReview] = useState<CodeReview | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [reviewedCode, setReviewedCode] = useState<string>("");
  const [selectedFeedbackIndex, setSelectedFeedbackIndex] = useState<
    number | null
  >(null);
  const [selectedAnalyses, setSelectedAnalyses] = useState<string[]>(
    ANALYSIS_OPTIONS.map((p) => p.id)
  );

  const [uiLang, setUiLang] = useState<UILang>("en");
  const t = useMemo(() => translations[uiLang], [uiLang]);

  // Loading states
  const [isLoadingReview, setIsLoadingReview] = useState<boolean>(false);
  const [isGeneratingTests, setIsGeneratingTests] = useState<boolean>(false);
  const [isExplainingCode, setIsExplainingCode] = useState<boolean>(false);
  const [isGeneratingDocs, setIsGeneratingDocs] = useState<boolean>(false);

  // Result states
  const [generatedTests, setGeneratedTests] = useState<string>("");
  const [codeExplanation, setCodeExplanation] = useState<string>("");
  const [generatedDocs, setGeneratedDocs] = useState<string>("");

  const [activeTab, setActiveTab] = useState<ActiveTab>("review");

  const clearResults = () => {
    setError(null);
    setReview(null);
    setGeneratedTests("");
    setCodeExplanation("");
    setGeneratedDocs("");
    setReviewedCode("");
    setSelectedFeedbackIndex(null);
  };

  const handleReview = useCallback(async () => {
    if (!code.trim()) return;
    setIsLoadingReview(true);
    clearResults();
    setActiveTab("review");

    try {
      const result = await reviewCode(code, language, selectedAnalyses, uiLang);
      setReview(result);
      setReviewedCode(code);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred."
      );
    } finally {
      setIsLoadingReview(false);
    }
  }, [code, language, selectedAnalyses, uiLang]);

  const handleGenerateTests = useCallback(async () => {
    if (!code.trim()) return;
    setIsGeneratingTests(true);
    clearResults();
    setActiveTab("tests");

    try {
      const result = await generateTests(code, language, uiLang);
      setGeneratedTests(result);
      setReviewedCode(code);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred."
      );
    } finally {
      setIsGeneratingTests(false);
    }
  }, [code, language, uiLang]);

  const handleExplainCode = useCallback(async () => {
    if (!code.trim()) return;
    setIsExplainingCode(true);
    clearResults();
    setActiveTab("explanation");

    try {
      const result = await explainCode(code, language, uiLang);
      setCodeExplanation(result);
      setReviewedCode(code);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred."
      );
    } finally {
      setIsExplainingCode(false);
    }
  }, [code, language, uiLang]);

  const handleGenerateDocs = useCallback(async () => {
    if (!code.trim()) return;
    setIsGeneratingDocs(true);
    clearResults();
    setActiveTab("docs");

    try {
      const result = await generateDocs(code, language, uiLang);
      setGeneratedDocs(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred."
      );
    } finally {
      setIsGeneratingDocs(false);
    }
  }, [code, language, uiLang]);

  return (
    <div className="h-screen bg-gray-900 text-gray-200 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <header className="w-full max-w-7xl mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <SparklesIcon className="w-8 h-8 text-cyan-400" />
          <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            {t.title}
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setUiLang("en")}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
              uiLang === "en"
                ? "bg-cyan-600 text-white"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setUiLang("fr")}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
              uiLang === "fr"
                ? "bg-cyan-600 text-white"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            FR
          </button>
        </div>
      </header>

      {error && (
        <div
          className="w-full max-w-7xl bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-md mb-4"
          role="alert"
        >
          <strong>{t.error}:</strong> <p className="inline">{error}</p>
        </div>
      )}

      <main className="w-full max-w-7xl flex-grow grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
        <CodeInput
          t={t}
          code={code}
          setCode={setCode}
          language={language}
          setLanguage={setLanguage}
          languages={SUPPORTED_LANGUAGES}
          selectedAnalyses={selectedAnalyses}
          setSelectedAnalyses={setSelectedAnalyses}
          onReview={handleReview}
          onGenerateTests={handleGenerateTests}
          onExplainCode={handleExplainCode}
          onGenerateDocs={handleGenerateDocs}
          isLoading={
            isLoadingReview ||
            isGeneratingTests ||
            isExplainingCode ||
            isGeneratingDocs
          }
          loadingAction={
            isLoadingReview
              ? "review"
              : isGeneratingTests
              ? "tests"
              : isExplainingCode
              ? "explain"
              : isGeneratingDocs
              ? "docs"
              : null
          }
        />
        <ReviewOutput
          t={t}
          review={review}
          generatedTests={generatedTests}
          codeExplanation={codeExplanation}
          generatedDocs={generatedDocs}
          isLoading={
            isLoadingReview ||
            isGeneratingTests ||
            isExplainingCode ||
            isGeneratingDocs
          }
          loadingAction={
            isLoadingReview
              ? "review"
              : isGeneratingTests
              ? "tests"
              : isExplainingCode
              ? "explain"
              : isGeneratingDocs
              ? "docs"
              : null
          }
          code={reviewedCode}
          language={language}
          selectedFeedbackIndex={selectedFeedbackIndex}
          onFeedbackSelect={setSelectedFeedbackIndex}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </main>
    </div>
  );
};

export default App;
