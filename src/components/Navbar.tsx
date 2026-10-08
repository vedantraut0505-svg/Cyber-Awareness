import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Menu,
  X,
  PhoneCall,
} from 'lucide-react';
import { ThemeSelector } from './ThemeSelector.tsx';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'rules', label: '4 Golden Rules' },
    { id: 'scams', label: 'Common Scams' },
    { id: 'scenarios', label: 'Scam Spotter' },
    { id: 'quiz', label: 'AI Quiz' },
    { id: 'helplines', label: 'Helplines' },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-300 dark:border-neutral-800 bg-neutral-100/95 dark:bg-neutral-900/95 backdrop-blur-md transition-colors text-neutral-900 dark:text-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* CyberSafe Logo with plane square box */}
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 focus:outline-hidden group cursor-pointer text-left"
            aria-label="CyberSafe India Home"
          >
            <div className="w-8 h-8 rounded-sm bg-neutral-900 dark:bg-neutral-800 border border-emerald-500/70 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>

            <div className="flex items-center text-lg sm:text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
              <span>Cyber</span>
              <span className="text-emerald-600 dark:text-emerald-400">Safe</span>
              <span className="ml-1.5 text-[11px] px-1.5 py-0.5 rounded-sm bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-emerald-700 dark:text-emerald-400 font-semibold tracking-wider uppercase">
                India
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-neutral-700 dark:text-neutral-300" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`px-3 py-1.5 rounded-sm transition-colors cursor-pointer text-xs font-semibold ${
                    isActive
                      ? 'bg-neutral-200 dark:bg-neutral-800 text-emerald-700 dark:text-emerald-400 border-b-2 border-emerald-600 dark:border-emerald-500'
                      : 'hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Emergency 1930 Helpline Button + Theme toggle */}
          <div className="flex items-center gap-2.5">
            <a
              href="tel:1930"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-neutral-900 text-white dark:bg-neutral-800 border border-emerald-500/80 hover:bg-emerald-600 hover:text-white font-bold text-xs transition-colors"
              title="National Cyber Financial Fraud Helpline - Dial 1930"
              aria-label="Call National Cyber Financial Fraud Helpline 1930"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              <span>Helpline <strong className="text-emerald-400">1930</strong></span>
            </a>

            {/* Theme Selector */}
            <ThemeSelector compact />

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              className="lg:hidden p-2 rounded-sm border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 focus:outline-hidden"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-300 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 px-4 pt-3 pb-5 shadow-lg">
          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`w-full text-left py-2 px-3 rounded-sm text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-neutral-200 dark:bg-neutral-800 text-emerald-700 dark:text-emerald-400 border-l-2 border-emerald-600'
                      : 'text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-800'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="mt-4 pt-3 border-t border-neutral-300 dark:border-neutral-800 flex items-center justify-between">
            <span className="text-xs text-neutral-500 dark:text-neutral-400">Theme mode:</span>
            <ThemeSelector />
          </div>
        </div>
      )}
    </header>
  );
};
