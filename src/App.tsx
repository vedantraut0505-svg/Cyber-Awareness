import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { UserProvider } from './context/UserContext.tsx';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { CampaignRulesSection } from './components/CampaignRulesSection.tsx';
import { CrimesSection } from './components/CrimesSection.tsx';
import { ScenariosSection } from './components/ScenariosSection.tsx';
import { QuizSection } from './components/QuizSection.tsx';
import { AboutSection } from './components/AboutSection.tsx';
import { Footer } from './components/Footer.tsx';
import { CursorSpotlight } from './components/CursorEffects.tsx';

function MainApp() {
  const [activeSection, setActiveSection] = useState('home');

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['helplines', 'quiz', 'scenarios', 'scams', 'rules', 'home'];
      const scrollPosition = window.scrollY + 180;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors flex flex-col font-sans selection:bg-emerald-600 selection:text-white relative">
      {/* Interactive Cursor Spotlight Animation Following Mouse Move on Desktop */}
      <CursorSpotlight />

      {/* Sticky Top Navigation with Theme Switcher & 1930 Emergency Button */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Main Campaign Sections */}
      <main className="flex-1">
        {/* Campaign Hero & Personalization */}
        <div id="home">
          <Hero onNavigate={handleNavigate} />
        </div>

        {/* 4 Golden Rules for Tier 2-3 cities everyday digital safety */}
        <div id="rules">
          <CampaignRulesSection />
        </div>

        {/* Common Cyber Scams Breakdown */}
        <div id="scams">
          <CrimesSection />
        </div>

        {/* Real Everyday Scam Spotter (Scenarios) */}
        <div id="scenarios">
          <ScenariosSection />
        </div>

        {/* Interactive AI Cyber Safety Quiz */}
        <div id="quiz">
          <QuizSection />
        </div>

        {/* India Official Helplines: 1930, cybercrime.gov.in, Chakshu */}
        <div id="helplines">
          <AboutSection />
        </div>
      </main>

      {/* Footer with Helpline Reminders & Theme Selector */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <MainApp />
      </UserProvider>
    </ThemeProvider>
  );
}
