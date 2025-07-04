import { GoogleGenAI } from "@google/genai";
import type { CodeReview, UILang } from "../types";
import { translations } from "../translations";

const API_KEY = (import.meta as any).env?.VITE_API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const principleDetails: Record<string, {en: string, fr: string}> = {
    'SOLID': { 
        en: 'SOLID Principles: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.',
        fr: 'Principes SOLID : Responsabilité unique, Ouvert/Fermé, Substitution de Liskov, Ségrégation des interfaces, Inversion des dépendances.'
    },
    'DRY': {
        en: "DRY (Don't Repeat Yourself): Look for repetitive code blocks or logic that could be abstracted.",
        fr: "DRY (Ne vous répétez pas) : Recherchez les blocs de code ou la logique répétitifs qui pourraient être abstraits."
    },
    'KISS': {
        en: 'KISS (Keep It Simple, Stupid): Identify overly complex solutions where a simpler approach would suffice.',
        fr: 'KISS (Keep It Simple, Stupid) : Identifiez les solutions trop complexes là où une approche plus simple suffirait.'
    },
    'YAGNI': {
        en: "YAGNI (You Ain't Gonna Need It): Point out code, features, or abstractions that are not currently needed and add unnecessary complexity.",
        fr: "YAGNI (You Ain't Gonna Need It) : Signalez le code, les fonctionnalités ou les abstractions qui ne sont pas nécessaires actuellement et qui ajoutent une complexité inutile."
    }
};

// --- UTILITY FUNCTIONS ---

const cleanJsonString = (str: string): string => {
  let cleanStr = str.trim();
  const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
  const match = cleanStr.match(fenceRegex);
  if (match && match[2]) {
    cleanStr = match[2].trim();
  }
  return cleanStr;
};

const cleanCodeString = (str: string): string => {
    let cleanStr = str.trim();
    const fenceRegex = /^```(?:\w+)?\s*\n(.*?)\n```$/s;
    const match = cleanStr.match(fenceRegex);
    if (match && match[1]) {
        cleanStr = match[1].trim();
    }
    return cleanStr;
};


// --- API PROMPTS ---

const generateReviewPrompt = (code: string, language: string, principles: string[], uiLang: UILang): string => {
    const t = translations[uiLang];
    let principlesSection = '';
    if (principles.length > 0) {
        principlesSection = `
5. **${t.promptArchitecture}**: ${t.promptArchAnalyse}
${principles.map(p => `- **${p}**: ${principleDetails[p]?.[uiLang] || ''}`).join('\n')}
${t.promptArchViolation}
`;
    }

return `
${t.promptReviewRole(language)}
${t.promptReviewAnalyze}
${principlesSection}
${t.promptReviewJsonFormat}
- "summary": ${t.promptReviewSummary}
- "review": ${t.promptReviewReview}
  - "category": ${t.promptReviewCategory}
  - "severity": ${t.promptReviewSeverity}
  - "description": ${t.promptReviewDescription}
  - "suggestion": ${t.promptReviewSuggestion}
  - "lineNumber": ${t.promptReviewLineNumber}

${t.promptCodeToReview}
---
${code}
---
`;
}

const generateTestPrompt = (code: string, language: string, uiLang: UILang): string => {
  const t = translations[uiLang];
  const frameworkMap: Record<string, string> = { 'JavaScript': 'Jest', 'TypeScript': 'Jest with ts-jest', 'Python': 'Pytest', 'Java': 'JUnit 5', 'Go': 'Go standard testing package', 'Rust': 'Rust standard testing framework' };
  const framework = frameworkMap[language] || t.promptTestFramework(language);
  
  return t.promptTestBody(language, framework, code);
};

const generateExplainPrompt = (code: string, language: string, uiLang: UILang): string => {
    const t = translations[uiLang];
    return t.promptExplainBody(language, code);
};

const generateDocsPrompt = (code: string, language: string, uiLang: UILang): string => {
    const t = translations[uiLang];
    const styleMap: Record<string, string> = {
        'JavaScript': 'TSDoc / JSDoc standard format (`/** ... */`)',
        'TypeScript': 'TSDoc / JSDoc standard format (`/** ... */`)',
        'Python': 'Google-style docstrings (`"""..."""`)',
    };
    const style = styleMap[language] || t.promptDocsStyle(language);

    return t.promptDocsBody(language, style, code);
};

// --- API CALLS ---

export const reviewCode = async (code: string, language: string, principles: string[], uiLang: UILang): Promise<CodeReview> => {
  const prompt = generateReviewPrompt(code, language, principles, uiLang);
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-04-17",
      contents: prompt,
      config: { responseMimeType: "application/json", temperature: 0.2 }
    });
    const responseText = response.text;
    if (!responseText) throw new Error("API returned an empty response.");
    
    const parsedData = JSON.parse(cleanJsonString(responseText));
    if (parsedData && typeof parsedData.summary === 'string' && Array.isArray(parsedData.review)) {
      return parsedData as CodeReview;
    }
    throw new Error("Invalid JSON structure received from API.");
  } catch (error) {
    console.error("Error in reviewCode:", error);
    throw new Error(`The code review request failed. ${error instanceof Error ? error.message : ''}`);
  }
};

export const generateTests = async (code: string, language: string, uiLang: UILang): Promise<string> => {
    const prompt = generateTestPrompt(code, language, uiLang);
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-04-17",
            contents: prompt,
            config: { temperature: 0.3 }
        });
        const responseText = response.text;
        if (!responseText) throw new Error("API returned an empty response for tests.");
        return cleanCodeString(responseText);
    } catch(error) {
        console.error("Error in generateTests:", error);
        throw new Error(`The test generation request failed. ${error instanceof Error ? error.message : ''}`);
    }
}

export const explainCode = async (code: string, language: string, uiLang: UILang): Promise<string> => {
    const prompt = generateExplainPrompt(code, language, uiLang);
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-04-17",
            contents: prompt,
            config: { temperature: 0.5 }
        });
        const responseText = response.text;
        if (!responseText) throw new Error("API returned an empty response for explanation.");
        return responseText.trim();
    } catch(error) {
        console.error("Error in explainCode:", error);
        throw new Error(`The code explanation request failed. ${error instanceof Error ? error.message : ''}`);
    }
};

export const generateDocs = async (code: string, language: string, uiLang: UILang): Promise<string> => {
    const prompt = generateDocsPrompt(code, language, uiLang);
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-04-17",
            contents: prompt,
            config: { temperature: 0.3 }
        });
        const responseText = response.text;
        if (!responseText) throw new Error("API returned an empty response for docs.");
        return cleanCodeString(responseText);
    } catch(error) {
        console.error("Error in generateDocs:", error);
        throw new Error(`The documentation generation request failed. ${error instanceof Error ? error.message : ''}`);
    }
};
