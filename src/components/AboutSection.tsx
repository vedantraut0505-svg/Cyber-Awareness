import React from 'react';
import {
  PhoneCall,
  Clock,
  ExternalLink,
  Building2,
} from 'lucide-react';
import { TiltCard } from './CursorEffects.tsx';

export const AboutSection: React.FC = () => {
  const indiaHelplines = [
    {
      title: 'National Cyber Financial Fraud Helpline',
      number: '1930',
      timing: '24x7 • Toll-Free • Multi-lingual',
      desc: 'Dial immediately if you have lost money to any UPI, net banking, or fake call fraud. Available in Hindi, English, and regional languages.',
      actionUrl: 'tel:1930',
      actionText: 'Direct Call: 1930',
      badge: 'URGENT (GOLDEN HOUR)',
      isHighlight: true,
    },
    {
      title: 'National Cyber Crime Reporting Portal',
      number: 'cybercrime.gov.in',
      timing: '24x7 Online Filing',
      desc: 'Official Government of India portal (Ministry of Home Affairs - I4C) to register complaints for financial fraud, extortion, digital arrest, and cyber crimes.',
      actionUrl: 'https://cybercrime.gov.in',
      actionText: 'cybercrime.gov.in',
      badge: 'OFFICIAL PORTAL',
      isHighlight: false,
    },
    {
      title: 'Chakshu (Sanchar Saathi Portal)',
      number: 'sancharsaathi.gov.in',
      timing: 'DoT Portal',
      desc: 'Report suspected fraud phone calls, fake electricity disconnection SMS, and scam WhatsApp numbers so the Department of Telecommunications can disconnect them.',
      actionUrl: 'https://sancharsaathi.gov.in',
      actionText: 'sancharsaathi.gov.in',
      badge: 'BLOCK SCAM NUMBERS',
      isHighlight: false,
    },
    {
      title: 'UIDAI Aadhaar Biometric Lock Helpline',
      number: '1947',
      timing: 'Toll-Free Helpline',
      desc: 'Call to lock your Aadhaar biometrics or resolve AePS fingerprint withdrawal issues. You can also lock biometrics directly on the official mAadhaar app.',
      actionUrl: 'tel:1947',
      actionText: 'Call 1947',
      badge: 'AADHAAR DEFENSE',
      isHighlight: false,
    },
    {
      title: 'Emergency Police Assistance',
      number: '112',
      timing: '24x7 Emergency',
      desc: 'National single emergency number for immediate physical police assistance in cases of extortion threats, coercion, or physical danger.',
      actionUrl: 'tel:112',
      actionText: 'Call 112',
      badge: 'POLICE DISPATCH',
      isHighlight: false,
    },
  ];

  const goldenHourSteps = [
    {
      step: '01',
      title: 'Note Down Details Fast',
      desc: 'Keep your Bank Name, Account Number, UPI Transaction ID (UTR), Date/Time, and fraudster phone number ready.',
    },
    {
      step: '02',
      title: 'Dial 1930 Immediately',
      desc: 'Explain the fraud to the 1930 operator. They will register a ticket in the Citizen Financial Cyber Fraud Reporting System.',
    },
    {
      step: '03',
      title: 'Banks Freeze Stolen Funds',
      desc: 'The 1930 system sends real-time alerts to beneficiary banks and wallets (Paytm, PhonePe, SBI, etc.) to freeze funds before ATM withdrawal.',
    },
    {
      step: '04',
      title: 'File Formal Police Report',
      desc: 'Within 24 hours, visit cybercrime.gov.in with the acknowledgement SMS you received from 1930 to finalize your report.',
    },
  ];

  return (
    <section id="helplines" className="py-14 sm:py-20 bg-neutral-100 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 border-b border-neutral-300 dark:border-neutral-800 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-emerald-700 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <PhoneCall className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Emergency Contacts & Helplines</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            India Official Cyber Helplines
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
            Lost money to an online scam? Act fast. The Citizen Financial Cyber Fraud Reporting System can freeze stolen funds if reported in time.
          </p>
        </div>

        {/* 1930 Golden Hour Banner - Plain rectangular box with Tilt */}
        <TiltCard
          maxTilt={2}
          className="mb-10 rounded-sm bg-neutral-900 text-white p-6 sm:p-8 border border-emerald-500/80 shadow-md relative overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-none bg-neutral-800 border border-emerald-500/50 text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                <Clock className="w-3 h-3" />
                <span>The "Golden Hour" Protocol (First 2 Hours)</span>
              </div>
              <h3 className="text-xl sm:text-3xl font-black leading-tight text-white">
                National Cyber Financial Fraud Helpline: <br className="hidden sm:inline" />
                <span className="text-emerald-400">Dial 1930 (Toll Free)</span>
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl leading-relaxed">
                If you made an accidental UPI transfer, clicked a fake link, or were scammed by a caller, <strong>calling 1930 within 2 hours gives banks the highest chance to freeze your stolen funds</strong> before criminals withdraw them from ATMs.
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs text-neutral-400 pt-1 font-mono">
                <span>✓ 24x7 Active</span>
                <span>•</span>
                <span>✓ Hindi, English & Regional Languages</span>
                <span>•</span>
                <span>✓ Ministry of Home Affairs</span>
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row items-center gap-2.5">
              <a
                href="tel:1930"
                className="w-full sm:w-auto px-6 py-3.5 rounded-sm bg-emerald-600 text-white font-extrabold text-sm sm:text-base hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Tap to Call 1930</span>
              </a>
              <a
                href="https://cybercrime.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3.5 rounded-sm bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs border border-neutral-700 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>cybercrime.gov.in</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </TiltCard>

        {/* 4 Steps of Golden Hour - Plain rectangular boxes */}
        <div className="mb-10">
          <div className="text-center max-w-xl mx-auto mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">
              What Happens When You Dial 1930?
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Follow these 4 steps to maximize your chances of recovering lost funds:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {goldenHourSteps.map((s) => (
              <div
                key={s.step}
                className="p-4 rounded-sm bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 flex flex-col justify-between"
              >
                <div>
                  <div className="w-6 h-6 rounded-none bg-neutral-100 dark:bg-neutral-800 text-emerald-700 dark:text-emerald-400 font-mono font-bold text-xs flex items-center justify-center mb-2.5 border border-neutral-300 dark:border-neutral-700">
                    {s.step}
                  </div>
                  <h4 className="text-xs font-bold text-neutral-900 dark:text-white mb-1">
                    {s.title}
                  </h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Directory of All Government Helplines - Plain rectangular cards */}
        <div>
          <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Complete Directory of Verified Government Desks</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {indiaHelplines.map((item, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-sm border transition-colors flex flex-col justify-between ${
                  item.isHighlight
                    ? 'bg-white dark:bg-neutral-900 border-emerald-600'
                    : 'bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-none bg-neutral-100 dark:bg-neutral-800 text-emerald-700 dark:text-emerald-400 border border-neutral-300 dark:border-neutral-700">
                      {item.badge}
                    </span>
                    <span className="text-[10px] text-neutral-500 font-medium">
                      {item.timing}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-neutral-900 dark:text-white mb-1">
                    {item.title}
                  </h4>

                  <div className="text-base font-black text-emerald-700 dark:text-emerald-400 font-mono mb-2">
                    {item.number}
                  </div>

                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                    {item.desc}
                  </p>
                </div>

                <a
                  href={item.actionUrl}
                  target={item.actionUrl.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className={`w-full py-2 px-3 rounded-sm text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    item.isHighlight
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-neutral-100 dark:bg-neutral-800 hover:border-emerald-500 border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200'
                  }`}
                >
                  {item.actionUrl.startsWith('tel:') ? (
                    <PhoneCall className="w-3.5 h-3.5" />
                  ) : (
                    <ExternalLink className="w-3.5 h-3.5" />
                  )}
                  <span>{item.actionText}</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
