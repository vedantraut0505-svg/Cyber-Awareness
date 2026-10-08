import React from 'react';
import { ShieldCheck, PhoneCall, ExternalLink } from 'lucide-react';
import { ThemeSelector } from './ThemeSelector.tsx';

interface FooterProps {
  onNavigate: (section: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-neutral-300 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 transition-colors py-10 text-neutral-900 dark:text-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-neutral-300 dark:border-neutral-800">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-none bg-neutral-900 dark:bg-neutral-800 border border-emerald-500/70 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <span className="font-bold text-sm sm:text-base text-neutral-900 dark:text-white">
                Cyber<span className="text-emerald-600 dark:text-emerald-400">Safe</span> India
              </span>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                National Cyber Safety Awareness Campaign
              </p>
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-semibold text-neutral-700 dark:text-neutral-300">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => onNavigate('rules')}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
            >
              4 Golden Rules
            </button>
            <button
              type="button"
              onClick={() => onNavigate('scams')}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Common Scams
            </button>
            <button
              type="button"
              onClick={() => onNavigate('scenarios')}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Scam Spotter
            </button>
            <button
              type="button"
              onClick={() => onNavigate('quiz')}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
            >
              AI Quiz
            </button>
            <button
              type="button"
              onClick={() => onNavigate('helplines')}
              className="text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1 transition-colors cursor-pointer font-bold"
            >
              <PhoneCall className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              <span>Helpline 1930</span>
            </button>
          </div>

          {/* Theme Switcher in footer */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-500 dark:text-neutral-400">Theme:</span>
            <ThemeSelector />
          </div>
        </div>

        {/* Disclaimer & Copyright with 1930 emphasis */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 gap-3 text-center sm:text-left">
          <p>
            Public Cyber Safety Campaign for Indian Citizens, Elders & Tier 2-3 Towns. In case of financial cyber fraud, dial <strong className="text-neutral-900 dark:text-white font-bold">1930</strong> immediately within 2 hours or file a formal complaint at <strong className="text-emerald-700 dark:text-emerald-400">cybercrime.gov.in</strong>.
          </p>
          <div className="shrink-0 flex items-center justify-center gap-2 font-medium">
            <a
              href="https://cybercrime.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
            >
              <span>cybercrime.gov.in</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
