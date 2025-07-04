export enum FeedbackCategory {
  BUG = 'Bug',
  PERFORMANCE = 'Performance',
  STYLE = 'Style',
  READABILITY = 'Readability',
  ARCHITECTURE = 'Architecture',
}

export enum FeedbackSeverity {
  HIGH = 'High',
  MEDIUM = 'Medium',
  LOW = 'Low',
}

export interface FeedbackItem {
  category: FeedbackCategory;
  severity: FeedbackSeverity;
  description: string;
  suggestion: string;
  lineNumber?: number;
}

export interface CodeReview {
  summary: string;
  review: FeedbackItem[];
}

export type ActiveTab = 'review' | 'tests' | 'explanation' | 'docs';
export type LoadingAction = 'review' | 'tests' | 'explain' | 'docs';

export type UILang = 'en' | 'fr';

export type Translations = any;
