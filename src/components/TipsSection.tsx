import React from 'react';
import {
  ShieldCheck,
  Key,
  Smartphone,
  Globe,
  HardDrive,
  RefreshCw,
  CheckCircle2,
  Circle,
  AlertCircle,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { useUser } from '../context/UserContext.tsx';

export const TipsSection: React.FC = () => {
  const { preferences, toggleHygieneItem, resetHygiene } = useUser();

  const checklistItems = [
    {
      id: 'mfa',
      title: 'Multi-Factor Authentication (2FA) Activated',
      description: 'Turned on for my email, bank, and social media accounts via an authenticator app.',
      weight: 20,
    },
    {
      id: 'pwd_mgr',
      title: 'Using a Password Manager or Long Passphrases',
      description: 'I do NOT reuse passwords across websites; every sensitive service has a unique password.',
      weight: 20,
    },
    {
      id: 'updates',
      title: 'Automatic Security Updates Enabled',
      description: 'Operating system (Windows/macOS/iOS/Android) and browser auto-updates are active.',
      weight: 15,
    },
    {
      id: 'backup',
      title: 'Offline or Cloud Backups (3-2-1 Rule)',
      description: 'Essential documents and precious photos are backed up where ransomware cannot reach.',
      weight: 15,
    },
    {
      id: 'url_check',
      title: 'I Inspect Links & Senders Before Clicking',
      description: 'I verify sender domain addresses and look out for urgent or threatening language.',
      weight: 15,
    },
    {
      id: 'public_wifi',
      title: 'Caution on Public Wi-Fi & USB Charging',
      description: 'I avoid unencrypted banking on public Wi-Fi or use a reputable VPN when traveling.',
      weight: 15,
    },
  ];

  // Calculate score
  const totalScore = checklistItems.reduce((acc, item) => {
    return preferences.hygieneChecklist[item.id] ? acc + item.weight : acc;
  }, 0);

  const getScoreRating = (score: number) => {
    if (score >= 90) return { label: 'Ironclad Defense', color: 'text-emerald-600 dark:text-emerald-400', badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' };
    if (score >= 70) return { label: 'Strong Security', color: 'text-blue-600 dark:text-blue-400', badge: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300' };
    if (score >= 45) return { label: 'Moderate Protection', color: 'text-amber-600 dark:text-amber-400', badge: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' };
    return { label: 'Needs Immediate Attention', color: 'text-red-600 dark:text-red-400', badge: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300' };
  };

  const rating = getScoreRating(totalScore);

  const practicalTips = [
    {
      icon: <Key className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      title: 'The Passphrase Formula',
      desc: 'Instead of "P@ssw0rd1", combine 4 random, memorable words: "coffee-granite-sunset-bicycle". They are exponentially harder for brute-force attacks while being easy to recall.',
    },
    {
      icon: <Smartphone className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
      title: 'Prefer App 2FA Over SMS',
      desc: 'SMS codes are vulnerable to SIM-swapping and cellular interception. Use authenticator apps (Google Authenticator, Aegis, 1Password) or hardware FIDO2 keys instead.',
    },
    {
      icon: <Globe className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      title: 'The "Padlock" Myth',
      desc: 'A green lock or "HTTPS" in your address bar only means the connection is encrypted; it does NOT guarantee the website is honest. Phishing sites use HTTPS too.',
    },
    {
      icon: <RefreshCw className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
      title: 'Never Postpone Critical Patches',
      desc: 'Security patches are published when vulnerabilities are publicly disclosed. Attackers reverse-engineer updates to target machines that haven\'t restarted yet.',
    },
  ];

  return (
    <section id="tips" className="py-12 sm:py-16 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            Everyday Cyber Hygiene
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Practical Safety Tips & Interactive Checklist
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2">
            90% of cyber breaches begin with avoidable user mistakes. Master these simple habits to keep yourself and your family secure.
          </p>
        </div>

        {/* 2-Column Layout: Checklist on left, Tips on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Interactive Checklist Card */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  Your Cyber Hygiene Score
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Check off the safeguards you currently practice
                </p>
              </div>

              {/* Score pill */}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xl font-black text-slate-900 dark:text-white leading-none">
                    {totalScore}/100
                  </div>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${rating.badge}`}>
                    {rating.label}
                  </span>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden my-4">
              <div
                className="h-full bg-blue-600 transition-all duration-300 rounded-full"
                style={{ width: `${totalScore}%` }}
              ></div>
            </div>

            {/* Checklist Items */}
            <div className="space-y-3 mt-4">
              {checklistItems.map((item) => {
                const isChecked = !!preferences.hygieneChecklist[item.id];
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleHygieneItem(item.id)}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                      isChecked
                        ? 'bg-blue-50/60 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900/60 text-slate-900 dark:text-white'
                        : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0 text-blue-600 dark:text-blue-400">
                      {isChecked ? (
                        <CheckCircle2 className="w-5 h-5 fill-blue-600 text-white dark:fill-blue-500 dark:text-slate-900" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-400 dark:text-slate-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold flex items-center justify-between">
                        <span>{item.title}</span>
                        <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
                          +{item.weight} pts
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Score Guidance */}
            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Your selections are saved locally on your device.</span>
              <button
                type="button"
                onClick={resetHygiene}
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Reset Checklist
              </button>
            </div>
          </div>

          {/* Practical Tips Pillars */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Golden Rules of Defense
            </h3>

            {practicalTips.map((tip, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-xs"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0">
                    {tip.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                      {tip.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {tip.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
