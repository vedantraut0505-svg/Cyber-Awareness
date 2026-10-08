import React, { createContext, useContext, useEffect, useState } from 'react';
import { QuizDifficulty, UserPreferences } from '../types.ts';

interface UserContextType {
  preferences: UserPreferences;
  setLearnerName: (name: string) => void;
  setDifficulty: (difficulty: QuizDifficulty) => void;
  setQuestionCount: (count: number) => void;
  toggleHygieneItem: (id: string) => void;
  resetHygiene: () => void;
}

const STORAGE_KEY = 'cybersafe_user_prefs';

const defaultPreferences: UserPreferences = {
  learnerName: '',
  difficulty: 'Mixed',
  questionCount: 5,
  hygieneChecklist: {
    'mfa': true,
    'pwd_mgr': false,
    'updates': true,
    'backup': false,
    'url_check': true,
    'public_wifi': false,
  },
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...defaultPreferences, ...JSON.parse(stored) };
      }
    } catch {
      // ignore
    }
    return defaultPreferences;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    } catch {
      // ignore
    }
  }, [preferences]);

  const setLearnerName = (learnerName: string) => {
    setPreferences((prev) => ({ ...prev, learnerName }));
  };

  const setDifficulty = (difficulty: QuizDifficulty) => {
    setPreferences((prev) => ({ ...prev, difficulty }));
  };

  const setQuestionCount = (questionCount: number) => {
    setPreferences((prev) => ({ ...prev, questionCount }));
  };

  const toggleHygieneItem = (id: string) => {
    setPreferences((prev) => ({
      ...prev,
      hygieneChecklist: {
        ...prev.hygieneChecklist,
        [id]: !prev.hygieneChecklist[id],
      },
    }));
  };

  const resetHygiene = () => {
    setPreferences((prev) => ({
      ...prev,
      hygieneChecklist: defaultPreferences.hygieneChecklist,
    }));
  };

  return (
    <UserContext.Provider
      value={{
        preferences,
        setLearnerName,
        setDifficulty,
        setQuestionCount,
        toggleHygieneItem,
        resetHygiene,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
