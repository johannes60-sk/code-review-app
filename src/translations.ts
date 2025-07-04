import type { UILang } from './src/types';

export const translations: Record<UILang, any> = {
  en: {
    title: 'SkillQuest Code Reviewer',
    error: 'Error',

    // CodeInput component
    enterCode: 'Enter Code',
    codeInputPlaceholder: (lang: string) => `Paste your ${lang} code here...`,
    analysisOptions: 'Analysis Options',
    solidPrinciples: 'SOLID Principles',
    dryPrinciple: "DRY (Don't Repeat Yourself)",
    kissPrinciple: 'KISS (Keep It Simple, Stupid)',
    yagniPrinciple: "YAGNI (You Ain't Gonna Need It)",
    reviewCode: 'Review Code',
    analyzing: 'Analyzing...',
    generateTests: 'Generate Tests',
    explainCode: 'Explain Code',
    generateDocs: 'Generate Docs',
    
    // ReviewOutput component
    // Tabs
    tabReview: 'Review',
    tabTests: 'Tests',
    tabExplanation: 'Explanation',
    tabDocs: 'Documentation',
    // Initial states
    initialStateTitle: 'Ready for Analysis',
    initialStateMessage: 'Your code review will appear here.',
    initialStateTestsTitle: 'Generate Unit Tests',
    initialStateTestsMessage: 'Click the "Generate Tests" action to create tests for your code.',
    initialStateExplainTitle: 'Explain Code',
    initialStateExplainMessage: 'Click the "Explain Code" action to get a detailed explanation.',
    initialStateDocsTitle: 'Generate Documentation',
    initialStateDocsMessage: 'Click the "Generate Docs" action to add documentation to your code.',
    // Review content
    greatJob: 'Great job!',
    noIssuesFound: 'No critical issues were found.',
    aiSummary: 'AI Summary',
    overallSummary: 'Overall Summary',
    detailedFeedback: 'Detailed Feedback',
    // Test content
    testContentMessage: (lang: string) => `AI-generated tests using a framework suitable for ${lang}.`,
    // Docs content
    docsContentMessage: 'AI-generated documentation has been added to your code.',

    // FeedbackCard component
    line: 'Line',
    severity: 'Severity',
    severityHigh: 'High',
    severityMedium: 'Medium',
    severityLow: 'Low',
    description: 'Description',
    suggestion: 'Suggestion',
    copySuggestion: 'Copy suggestion',

    // Gemini Service Prompts
    promptReviewRole: (lang: string) => `You are an expert senior software engineer and an automated code review assistant named 'Gemini Code Reviewer'. Your task is to perform a thorough code review of the following ${lang} code. Your entire response and all analysis MUST be in English.`,
    promptReviewAnalyze: 'Analyze the code for: 1. Potential Bugs, 2. Performance Issues, 3. Style & Conventions, 4. Readability & Maintainability.',
    promptArchitecture: 'Architectural & Design Principles',
    promptArchAnalyse: 'Analyze the code\'s adherence to the following principles:',
    promptArchViolation: 'For any violations found, you MUST use the "Architecture" category.',
    promptReviewJsonFormat: 'CRITICAL: You MUST format your entire response as a single, valid JSON object. Do not include any explanatory text, markdown, or any characters outside of this JSON object. The JSON object must have two root keys: "summary" and "review".',
    promptReviewSummary: 'A string containing a concise, high-level summary of the code quality, its main strengths, and areas for improvement. This must be 2-4 sentences long.',
    promptReviewReview: 'An array of feedback item objects. Each object MUST have the following schema:',
    promptReviewCategory: 'String. Must be one of: "Bug", "Performance", "Style", "Readability", "Architecture".',
    promptReviewSeverity: 'String. Must be one of: "High", "Medium", "Low".',
    promptReviewDescription: 'String. A concise explanation of the issue.',
    promptReviewSuggestion: 'String. A concrete, actionable suggestion.',
    promptReviewLineNumber: 'Integer or null. The specific line number the feedback pertains to.',
    promptCodeToReview: 'Here is the code to review:',
    promptTestFramework: (lang: string) => `an appropriate, modern testing framework for the language`,
    promptTestBody: (lang: string, framework: string, code: string) => `You are a software quality assurance expert. Write a suite of unit tests for the following ${lang} code using ${framework}. Cover main logic, edge cases, and potential failures. Your entire response and all generated code MUST be in English. Your response MUST ONLY contain the raw code for the test file. Do not include any explanatory text or markdown code fences.\n\nCode to test:\n---\n${code}\n---`,
    promptExplainBody: (lang: string, code: string) => `You are an expert software engineer and technical writer. Provide a clear, concise explanation of the following ${lang} code. Your entire response MUST be in English. Instructions:\n1. Start with a high-level summary of the code's purpose.\n2. Describe the main logic, algorithms, or data structures.\n3. Detail function signatures, parameters (inputs), and return values (outputs).\n4. Point out any important dependencies or side effects.\n5. Format your response in simple markdown for readability. Do not use code fences.\n\nCode to explain:\n---\n${code}\n---`,
    promptDocsStyle: (lang: string) => `the most common documentation style for that language`,
    promptDocsBody: (lang: string, style: string, code: string) => `You are an expert software engineer. Add comprehensive documentation to the following ${lang} code. Your entire response and all generated documentation MUST be in English. Instructions:\n1. Use ${style}.\n2. Document all public functions, classes, and methods, explaining purpose, parameters, and return values.\n3. Your response MUST ONLY contain the complete, raw code with the added documentation. Do not add any explanatory text or markdown code fences.\n\nCode to document:\n---\n${code}\n---`,
  },
  fr: {
    title: 'SkillQuest Réviseur de Code',
    error: 'Erreur',

    // CodeInput component
    enterCode: 'Entrez le code',
    codeInputPlaceholder: (lang: string) => `Collez votre code ${lang} ici...`,
    analysisOptions: 'Options d\'analyse',
    solidPrinciples: 'Principes SOLID',
    dryPrinciple: "DRY (Ne vous répétez pas)",
    kissPrinciple: 'KISS (Restez simple)',
    yagniPrinciple: "YAGNI (Vous n'en aurez pas besoin)",
    reviewCode: 'Analyser le code',
    analyzing: 'Analyse en cours...',
    generateTests: 'Générer les tests',
    explainCode: 'Expliquer le code',
    generateDocs: 'Générer la documentation',

    // ReviewOutput component
    // Tabs
    tabReview: 'Revue',
    tabTests: 'Tests',
    tabExplanation: 'Explication',
    tabDocs: 'Documentation',
    // Initial states
    initialStateTitle: 'Prêt pour l\'analyse',
    initialStateMessage: 'La revue de votre code apparaîtra ici.',
    initialStateTestsTitle: 'Générer des tests unitaires',
    initialStateTestsMessage: 'Cliquez sur l\'action "Générer les tests" pour créer des tests pour votre code.',
    initialStateExplainTitle: 'Expliquer le code',
    initialStateExplainMessage: 'Cliquez sur l\'action "Expliquer le code" pour obtenir une explication détaillée.',
    initialStateDocsTitle: 'Générer la documentation',
    initialStateDocsMessage: 'Cliquez sur l\'action "Générer la documentation" pour ajouter de la documentation à votre code.',
    // Review content
    greatJob: 'Excellent travail !',
    noIssuesFound: 'Aucun problème critique n\'a été trouvé.',
    aiSummary: 'Résumé de l\'IA',
    overallSummary: 'Résumé global',
    detailedFeedback: 'Commentaires détaillés',
    // Test content
    testContentMessage: (lang: string) => `Tests générés par l'IA utilisant un framework adapté pour ${lang}.`,
    // Docs content
    docsContentMessage: 'La documentation générée par l\'IA a été ajoutée à votre code.',

    // FeedbackCard component
    line: 'Ligne',
    severity: 'Sévérité',
    severityHigh: 'Haute',
    severityMedium: 'Moyenne',
    severityLow: 'Faible',
    description: 'Description',
    suggestion: 'Suggestion',
    copySuggestion: 'Copier la suggestion',

    // Gemini Service Prompts
    promptReviewRole: (lang: string) => `Vous êtes un ingénieur logiciel senior expert et un assistant de revue de code automatisé nommé 'Réviseur de Code Gemini'. Votre tâche est d'effectuer une revue de code approfondie du code ${lang} suivant. Votre réponse entière et toute l'analyse DOIVENT être en Français.`,
    promptReviewAnalyze: 'Analysez le code pour : 1. Bogues potentiels, 2. Problèmes de performance, 3. Style et conventions, 4. Lisibilité et maintenabilité.',
    promptArchitecture: 'Principes d\'architecture et de conception',
    promptArchAnalyse: 'Analysez l\'adhésion du code aux principes suivants :',
    promptArchViolation: 'Pour toute violation trouvée, vous DEVEZ utiliser la catégorie "Architecture".',
    promptReviewJsonFormat: 'CRITIQUE : Vous DEVEZ formater toute votre réponse en un seul objet JSON valide. N\'incluez aucun texte explicatif, markdown ou tout autre caractère en dehors de cet objet JSON. L\'objet JSON doit avoir deux clés racine : "summary" et "review".',
    promptReviewSummary: 'Une chaîne de caractères contenant un résumé concis et de haut niveau de la qualité du code, ses principales forces et ses points à améliorer. Doit faire 2 à 4 phrases.',
    promptReviewReview: 'Un tableau d\'objets de commentaires. Chaque objet DOIT avoir le schéma suivant :',
    promptReviewCategory: 'Chaîne. Doit être l\'un des suivants : "Bug", "Performance", "Style", "Readability", "Architecture".',
    promptReviewSeverity: 'Chaîne. Doit être l\'un des suivants : "High", "Medium", "Low".',
    promptReviewDescription: 'Chaîne. Une explication concise du problème.',
    promptReviewSuggestion: 'Chaîne. Une suggestion concrète et exploitable.',
    promptReviewLineNumber: 'Entier ou null. Le numéro de ligne spécifique auquel le commentaire se rapporte.',
    promptCodeToReview: 'Voici le code à analyser :',
    promptTestFramework: (lang: string) => `un framework de test moderne et approprié pour le langage ${lang}`,
    promptTestBody: (lang: string, framework: string, code: string) => `Vous êtes un expert en assurance qualité logicielle. Rédigez une suite de tests unitaires pour le code ${lang} suivant en utilisant ${framework}. Couvrez la logique principale, les cas limites et les échecs potentiels. Votre réponse entière et tout le code généré DOIVENT être en Français. Votre réponse DOIT UNIQUEMENT contenir le code brut du fichier de test. N'incluez aucun texte explicatif ni de blocs de code markdown.\n\nCode à tester :\n---\n${code}\n---`,
    promptExplainBody: (lang: string, code: string) => `Vous êtes un ingénieur logiciel expert et un rédacteur technique. Fournissez une explication claire et concise du code ${lang} suivant. Votre réponse entière DOIT être en Français. Instructions :\n1. Commencez par un résumé de haut niveau de l'objectif du code.\n2. Décrivez la logique principale, les algorithmes ou les structures de données.\n3. Détaillez les signatures des fonctions, les paramètres (entrées) et les valeurs de retour (sorties).\n4. Signalez toutes les dépendances importantes ou les effets de bord.\n5. Formatez votre réponse en markdown simple pour la lisibilité. N'utilisez pas de blocs de code.\n\nCode à expliquer :\n---\n${code}\n---`,
    promptDocsStyle: (lang: string) => `le style de documentation le plus courant pour ce langage`,
    promptDocsBody: (lang: string, style: string, code: string) => `Vous êtes un ingénieur logiciel expert. Ajoutez une documentation complète au code ${lang} suivant. Votre réponse entière et toute la documentation générée DOIVENT être en Français. Instructions :\n1. Utilisez ${style}.\n2. Documentez toutes les fonctions, classes et méthodes publiques, en expliquant leur but, leurs paramètres et leurs valeurs de retour.\n3. Votre réponse DOIT UNIQUEMENT contenir le code brut complet avec la documentation ajoutée. N'ajoutez aucun texte explicatif ni de blocs de code markdown.\n\nCode à documenter :\n---\n${code}\n---`,
  },
};
