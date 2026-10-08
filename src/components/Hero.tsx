import React, { useState } from 'react';
import {
  ShieldCheck,
  Sparkles,
  PhoneCall,
  ArrowRight,
  UserCheck,
} from 'lucide-react';
import { useUser } from '../context/UserContext.tsx';
import { TiltCard } from './CursorEffects.tsx';

interface HeroProps {
  onNavigate: (section: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const { preferences, setLearnerName } = useUser();
  const [nameInput, setNameInput] = useState(preferences.learnerName);
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    setLearnerName(nameInput.trim());
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 sm:pt-12 sm:pb-20 bg-neutral-100 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors border-b border-neutral-300 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Urgent Helpline Banner - Clean rectangular plane box */}
        <div className="mb-6 px-4 py-2.5 rounded-sm bg-neutral-200 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-none shrink-0" />
            <span className="font-bold text-neutral-900 dark:text-white">
              Emergency Financial Cyber Fraud Alert:
            </span>
            <span className="text-neutral-600 dark:text-neutral-300">
              Dial India Helpline <strong className="text-emerald-700 dark:text-emerald-400 font-extrabold">1930</strong> within 2 hours to freeze stolen money!
            </span>
          </div>
          <a
            href="tel:1930"
            className="px-2.5 py-1 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-sm transition-colors inline-flex items-center gap-1.5"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Call 1930</span>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Campaign Message */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm bg-neutral-200 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-emerald-700 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>National Cyber Safety Awareness Campaign</span>
            </div>

            <div className="space-y-1">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-neutral-900 dark:text-white tracking-tight leading-tight">
                Think Before <br className="hidden sm:inline" />
                <span className="text-emerald-600 dark:text-emerald-400">You Click.</span>
              </h1>
              <p className="text-base sm:text-lg font-medium text-neutral-700 dark:text-neutral-300">
                Simple everyday protection against online scams, fake WhatsApp APKs, and UPI payment frauds.
              </p>
            </div>

            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-xl leading-relaxed">
              Designed for everyday citizens, students, seniors, and families across Tier 2 and Tier 3 cities in India. Learn the 4 golden rules of cyber hygiene, inspect simulated scam messages, and test your knowledge with our AI quiz.
            </p>

            {/* Quick Action CTAs - Flat rectangular boxes */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onNavigate('quiz')}
                className="px-5 py-3 rounded-sm bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Sparkles className="w-4 h-4" />
                <span>Start AI Cyber Quiz</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('rules')}
                className="px-4 py-3 rounded-sm bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 hover:border-emerald-500 text-neutral-800 dark:text-neutral-200 font-semibold text-xs sm:text-sm transition-all cursor-pointer"
              >
                4 Golden Rules
              </button>

              <button
                type="button"
                onClick={() => onNavigate('helplines')}
                className="px-4 py-3 rounded-sm bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700 hover:border-emerald-500 font-semibold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>India Helplines</span>
              </button>
            </div>

            {/* Personalization Box - Flat Plane Rectangular Box */}
            <div className="pt-2">
              <div className="p-3.5 rounded-sm bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 max-w-md">
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="learnerNameInput" className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Personalize your experience (Optional)</span>
                  </label>
                  {preferences.learnerName && (
                    <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                      Hi, {preferences.learnerName}
                    </span>
                  )}
                </div>

                <form onSubmit={handleSaveName} className="flex gap-2">
                  <input
                    id="learnerNameInput"
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="Enter learner name (e.g., Vedant)"
                    maxLength={30}
                    className="flex-1 px-3 py-1.5 text-xs rounded-sm border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white placeholder:text-neutral-500 focus:outline-hidden focus:border-emerald-500"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 text-xs font-semibold rounded-sm bg-neutral-900 dark:bg-neutral-800 text-white hover:bg-neutral-800 dark:hover:bg-neutral-700 border border-neutral-700 transition-colors shrink-0 cursor-pointer"
                  >
                    {isSaved ? 'Saved' : 'Save'}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Top Scams Box - Simple Plane Rectangular Box with Tilt */}
          <div className="lg:col-span-5">
            <TiltCard
              maxTilt={4}
              className="p-5 sm:p-6 rounded-sm bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-sm bg-neutral-100 dark:bg-neutral-800 border border-emerald-500/50 flex items-center justify-center text-emerald-500">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-xs font-bold text-neutral-900 dark:text-white">
                      Top 3 Scams in India Right Now
                    </h2>
                    <p className="text-[10px] text-neutral-500 dark:text-neutral-400">
                      Stay alert against these common tricks
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-sm bg-neutral-100 dark:bg-neutral-800 border border-emerald-500/40 text-emerald-700 dark:text-emerald-400">
                  Active
                </span>
              </div>

              {/* 3 Plain Rectangular Cards */}
              <div className="space-y-2.5">
                <div className="p-3 rounded-sm bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                  <h3 className="text-xs font-bold text-neutral-900 dark:text-white flex items-center justify-between">
                    <span>1. UPI PIN is ONLY for Sending Money</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[11px]">RULE</span>
                  </h3>
                  <p className="text-[11px] text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed">
                    Never enter your PIN to "receive" cash or refunds on PhonePe, GPay, or Paytm.
                  </p>
                </div>

                <div className="p-3 rounded-sm bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                  <h3 className="text-xs font-bold text-neutral-900 dark:text-white flex items-center justify-between">
                    <span>2. Fake Electricity Bill Cut SMS</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[11px]">RULE</span>
                  </h3>
                  <p className="text-[11px] text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed">
                    Electricity boards never threaten sudden night power cuts from personal 10-digit mobile numbers.
                  </p>
                </div>

                <div className="p-3 rounded-sm bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                  <h3 className="text-xs font-bold text-neutral-900 dark:text-white flex items-center justify-between">
                    <span>3. "Digital Arrest" is 100% Fake</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[11px]">RULE</span>
                  </h3>
                  <p className="text-[11px] text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed">
                    Police or CBI never arrest citizens over WhatsApp/Skype video calls or ask for funds.
                  </p>
                </div>
              </div>

              {/* 1930 Callout Box */}
              <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
                  Govt Cyber Helpline:
                </span>
                <a
                  href="tel:1930"
                  className="px-2.5 py-1 rounded-sm bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs inline-flex items-center gap-1.5 transition-colors"
                >
                  <PhoneCall className="w-3 h-3" />
                  <span>Call 1930 Toll-Free</span>
                </a>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
};
