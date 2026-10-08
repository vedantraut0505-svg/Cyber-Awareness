export type ThemeMode = 'light' | 'dark' | 'system';

export interface QuizQuestion {
  id: string;
  question: string;
  scenario?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | string;
}

export type QuizDifficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'Mixed';

export interface UserPreferences {
  learnerName: string;
  difficulty: QuizDifficulty;
  questionCount: number;
  hygieneChecklist: Record<string, boolean>;
}

export interface CyberCrimeItem {
  id: string;
  title: string;
  category: 'Phishing' | 'Malware' | 'Social Engineering' | 'Identity & Account' | 'Network & Wi-Fi' | 'AI & Deepfakes';
  severity: 'High' | 'Critical' | 'Medium';
  tagline: string;
  howItWorks: string;
  exampleScenario: string;
  redFlags: string[];
  preventionTips: string[];
}

export interface ScenarioItem {
  id: string;
  title: string;
  type: 'Email' | 'SMS' | 'Website' | 'Social' | 'Hardware';
  context: string;
  senderOrSource: string;
  contentBody: string;
  indicators: {
    label: string;
    description: string;
    isSuspicious: boolean;
  }[];
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
}
