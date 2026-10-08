import React from 'react';
import {
  CreditCard,
  Zap,
  Video,
  FileCode,
  CheckCircle2,
  XCircle,
  ShieldCheck,
} from 'lucide-react';
import { TiltCard } from './CursorEffects.tsx';

export const CampaignRulesSection: React.FC = () => {
  const everydayRules = [
    {
      num: '01',
      title: 'UPI PIN is ONLY for Sending Money',
      subtitle: 'Never enter your PIN to receive money',
      icon: <CreditCard className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      explanation:
        'If a buyer on OLX, a lottery caller, or anyone tells you: "Scan this QR code and enter your PIN to receive your money / advance payment", IT IS A SCAM. Entering your UPI PIN ALWAYS subtracts money from your bank account.',
      ruleDo: 'Scan QR codes only when YOU are paying at a shop or to an authorized merchant.',
      ruleDont: 'Never enter your 4 or 6-digit UPI PIN to "receive" cash, prizes, or refunds.',
    },
    {
      num: '02',
      title: 'Fake "Electricity Bill Unpaid" SMS Scams',
      subtitle: 'Power departments never threaten night cuts on personal SMS',
      icon: <Zap className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      explanation:
        'Messages warning: "Dear user, electricity power will be cut tonight at 9:30 PM. Call JE/Officer at 98xxxxxx" are sent by thieves. They trick you into downloading AnyDesk/QuickSupport or paying on fake links to siphon off your savings.',
      ruleDo: 'Pay and check your electricity bills solely on official electricity board apps (e.g. MSEDCL, UPPCL, TNEB, Bescom).',
      ruleDont: 'Never call personal mobile numbers given in sudden threatening disconnection SMS.',
    },
    {
      num: '03',
      title: 'There is NO SUCH THING as "Digital Arrest"',
      subtitle: 'Police & CBI never arrest people on video calls or demand money',
      icon: <Video className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      explanation:
        'Fraudsters dress in fake police uniforms and make Skype or WhatsApp video calls claiming: "A parcel with drugs was seized in Mumbai or Cambodia with your Aadhaar, and you are under Digital Arrest." They intimidate people into transferring lakhs of rupees to "clear charges".',
      ruleDo: 'Disconnect the video call immediately. Real police never interrogate over Skype or WhatsApp.',
      ruleDont: 'Never transfer money to any "RBI verification account" or "security clearance deposit".',
    },
    {
      num: '04',
      title: 'Never Install .APK Files on WhatsApp',
      subtitle: 'Hidden Android malware disguised as wedding cards or subsidy forms',
      icon: <FileCode className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      explanation:
        'Scammers send files named "Wedding_Card.apk", "PM_Kisan_Yojana.apk", or "Free_Recharge.apk". Once you click, this hidden app installs silently, reads your incoming SMS, and forwards your bank OTPs to the attacker.',
      ruleDo: 'Download apps only from the official Google Play Store or Apple App Store.',
      ruleDont: 'Never tap files ending in .APK sent by unknown or even familiar WhatsApp contacts.',
    },
  ];

  return (
    <section id="rules" className="py-14 sm:py-20 bg-white dark:bg-neutral-900 border-b border-neutral-300 dark:border-neutral-800 transition-colors text-neutral-900 dark:text-neutral-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-emerald-700 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Essential Security Checklist</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            The 4 Golden Rules for Everyday Cyber Safety
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
            Remember these 4 simple principles to protect yourself and your family from 95% of online financial scams in India.
          </p>
        </div>

        {/* 4 Plain Rectangular Cards Grid with Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {everydayRules.map((rule) => (
            <TiltCard
              key={rule.num}
              maxTilt={3}
              className="p-5 sm:p-6 rounded-sm bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 hover:border-emerald-500/80 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-sm bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700">
                    {rule.icon}
                  </div>
                  <span className="font-mono text-xl font-bold text-neutral-400 dark:text-neutral-600">
                    {rule.num}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white mb-1">
                  {rule.title}
                </h3>
                <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-2.5">
                  {rule.subtitle}
                </p>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                  {rule.explanation}
                </p>
              </div>

              {/* Do's and Don'ts - Plain rectangular boxes */}
              <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 space-y-2 text-xs">
                <div className="p-2 rounded-sm bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-start gap-2 text-neutral-800 dark:text-neutral-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">DO: </strong>
                    <span>{rule.ruleDo}</span>
                  </div>
                </div>

                <div className="p-2 rounded-sm bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-start gap-2 text-neutral-800 dark:text-neutral-200">
                  <XCircle className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-neutral-900 dark:text-white uppercase tracking-wide">DON'T: </strong>
                    <span>{rule.ruleDont}</span>
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};
