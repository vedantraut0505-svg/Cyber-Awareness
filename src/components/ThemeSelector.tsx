import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Laptop, Check, ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.tsx';
import { ThemeMode } from '../types.ts';

interface ThemeSelectorProps {
  compact?: boolean;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ compact = false }) => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const options: { mode: ThemeMode; label: string; icon: React.ReactNode; desc: string }[] = [
    {
      mode: 'light',
      label: 'Light Mode',
      icon: <Sun className="w-4 h-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />,
      desc: 'Clean grey & white theme',
    },
    {
      mode: 'dark',
      label: 'Dark Mode',
      icon: <Moon className="w-4 h-4 text-emerald-400" aria-hidden="true" />,
      desc: 'Dark grey background with crisp white text',
    },
    {
      mode: 'system',
      label: 'System Default',
      icon: <Laptop className="w-4 h-4 text-slate-400" aria-hidden="true" />,
      desc: 'Matches device setting',
    },
  ];

  const currentIcon =
    theme === 'light' ? (
      <Sun className="w-4 h-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
    ) : theme === 'dark' ? (
      <Moon className="w-4 h-4 text-emerald-400" aria-hidden="true" />
    ) : (
      <Laptop className="w-4 h-4 text-emerald-500" aria-hidden="true" />
    );

  const currentLabel =
    theme === 'light' ? 'Light' : theme === 'dark' ? 'Dark' : 'System';

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={`Theme options. Current theme is ${currentLabel} mode`}
        className="flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-semibold rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 hover:border-emerald-500 transition-colors cursor-pointer"
      >
        <span className="flex items-center justify-center">{currentIcon}</span>
        {!compact && (
          <span className="text-xs sm:text-sm">
            {currentLabel}
          </span>
        )}
        <ChevronDown className={`w-3.5 h-3.5 text-neutral-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="theme-menu-button"
          className="absolute right-0 mt-2 w-52 rounded-md border border-neutral-300 dark:border-neutral-750 bg-white dark:bg-neutral-900 p-1.5 shadow-lg z-50 text-neutral-800 dark:text-neutral-100"
        >
          <div className="px-3 py-1.5 border-b border-neutral-200 dark:border-neutral-800 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Theme Setting
            </span>
          </div>

          {options.map((option) => {
            const isSelected = theme === option.mode;
            return (
              <button
                key={option.mode}
                type="button"
                role="menuitem"
                onClick={() => {
                  setTheme(option.mode);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs sm:text-sm rounded-sm text-left transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold border-l-2 border-emerald-600'
                    : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="shrink-0">{option.icon}</span>
                  <div>
                    <div className="font-medium">{option.label}</div>
                    <div className="text-[10px] text-neutral-500 dark:text-neutral-400">
                      {option.desc}
                    </div>
                  </div>
                </div>
                {isSelected && (
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 ml-2" aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
