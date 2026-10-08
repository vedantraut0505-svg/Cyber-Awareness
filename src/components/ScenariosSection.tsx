import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  MessageSquare,
  Eye,
  ArrowRight,
  Smartphone,
} from 'lucide-react';
import { ScenarioItem } from '../types.ts';
import { TiltCard } from './CursorEffects.tsx';

const SCENARIOS: ScenarioItem[] = [
  {
    id: 'sc-1',
    title: 'Electricity Bill Disconnection SMS',
    type: 'SMS',
    context: 'You receive this SMS at 6:45 PM on an ordinary weekday evening from a regular 10-digit mobile number.',
    senderOrSource: 'SMS from: +91 98321-04592',
    contentBody: `Dear Consumer,

Your electricity power will be disconnected tonight at 9.30 PM from head office because your previous month bill was not updated.

Please immediately contact our Electricity Officer / JE Sir at 9832104592 or install the bill update APK to avoid disconnection.

- Electricity Board Office`,
    indicators: [
      {
        label: 'Sender is a Private Mobile Number',
        description: 'Official electricity boards (MSEDCL, UPPCL, Bescom, PSPCL, etc.) always use sender headers like "VM-MSEDCL" or "AD-UPPCL", never a personal 10-digit phone number.',
        isSuspicious: true,
      },
      {
        label: 'Threatening Nighttime Deadline',
        description: '"Power will be cut tonight at 9:30 PM" creates panic so you call without checking your real bill receipt.',
        isSuspicious: true,
      },
      {
        label: 'Asking to Call Personal Number or Download APK',
        description: 'Scammers on this number will ask you to pay ₹10 on a malicious link or download AnyDesk/QuickSupport to drain your account.',
        isSuspicious: true,
      },
    ],
    options: [
      {
        id: 'opt-1',
        text: 'Call 9832104592 right away and pay ₹10 through whatever link they send so power is not cut.',
        isCorrect: false,
        feedback: 'Dangerous! The scammer will guide you to install remote access apps (AnyDesk/RustDesk) or click phishing links that wipe out your savings.',
      },
      {
        id: 'opt-2',
        text: 'Ignore the SMS; check your electricity status on your official electricity board app or your physical printed bill receipt.',
        isCorrect: true,
        feedback: 'Correct! Never call personal mobile numbers given in disconnection SMS. Real electricity boards never cut power without formal postal notices.',
      },
      {
        id: 'opt-3',
        text: 'Forward the message to your family group to warn everyone that power is going out.',
        isCorrect: false,
        feedback: 'Forwarding creates unnecessary panic for family members who might fall for the scammer\'s phone number.',
      },
    ],
  },
  {
    id: 'sc-2',
    title: 'OLX / Marketplace QR Code Payment Trap',
    type: 'Social',
    context: 'You posted an advertisement on OLX to sell an old bicycle for ₹4,000. An interested buyer contacts you on WhatsApp.',
    senderOrSource: 'WhatsApp Chat from buyer: "Subhash Kumar" (+91 91234-88219)',
    contentBody: `Buyer: "Hello Sir, I like the bicycle. I am an Army officer posted out of town, so my brother will pick it up tomorrow. 

I am sending you ₹4,000 right now in advance so you hold it for me.

I have generated this PhonePe/GPay QR code for ₹4,000. Just scan this QR code on your phone and enter your 4-digit UPI PIN to receive the money immediately into your bank account."`,
    indicators: [
      {
        label: 'Asking to Enter UPI PIN to "Receive" Money',
        description: 'The Golden Rule: You NEVER enter your UPI PIN to receive money! Entering a PIN ALWAYS transfers money OUT of your account.',
        isSuspicious: true,
      },
      {
        label: 'Impersonating Military / Army Personnel',
        description: 'Scammers frequently send stolen army ID cards and photos to create artificial trust and respect.',
        isSuspicious: true,
      },
      {
        label: 'Willing to Pay in Full Without Seeing the Item',
        description: 'Real buyers usually inspect goods or negotiate before transferring full advance payment.',
        isSuspicious: true,
      },
    ],
    options: [
      {
        id: 'opt-1',
        text: 'Scan the QR code on Google Pay or PhonePe and enter your UPI PIN to collect the ₹4,000.',
        isCorrect: false,
        feedback: 'Disaster! As soon as you enter your UPI PIN, ₹4,000 will be DEDUCTED from your bank account and transferred to the fraudster!',
      },
      {
        id: 'opt-2',
        text: 'Tell the buyer: "I do not need to scan any QR code or enter my PIN to receive money. Share money directly to my UPI ID or pay cash on pickup."',
        isCorrect: true,
        feedback: 'Exactly right! To receive money, someone only needs your UPI ID or mobile number. QR codes requiring a PIN are ALWAYS debit traps.',
      },
    ],
  },
  {
    id: 'sc-3',
    title: 'WhatsApp "Wedding_Card.apk" Malware File',
    type: 'SMS',
    context: 'You receive a message from an unknown number on WhatsApp containing an attached file.',
    senderOrSource: 'WhatsApp message from +91 94102-77189',
    contentBody: `Unknown Contact: "Dear Uncle/Aunty,

Hearty greetings! My elder sister\'s wedding is on December 12th. Please join us with your family. 

We have designed a digital invitation card. Please click the file below to open and view the card:

📎 Wedding_Invitation_Card.apk (4.2 MB)"`,
    indicators: [
      {
        label: 'File extension is ".apk" (Android App, NOT an image or PDF)',
        description: 'A genuine wedding invitation is always a JPEG image, PNG, PDF document, or video link. It is NEVER an application (.apk) file.',
        isSuspicious: true,
      },
      {
        label: 'Stealth Banking OTP Thief',
        description: 'When tapped, this APK installs background spyware that steals your SMS and silently forwards bank OTPs to the cyber criminals.',
        isSuspicious: true,
      },
    ],
    options: [
      {
        id: 'opt-1',
        text: 'Tap on the .apk file to open and view the wedding card.',
        isCorrect: false,
        feedback: 'Never tap it! This is Android malware that reads all your bank SMS and drains your accounts within minutes.',
      },
      {
        id: 'opt-2',
        text: 'Do NOT open or install the file. Delete the message, block the number, and warn family members.',
        isCorrect: true,
        feedback: 'Perfect response! Never install .apk files received via WhatsApp or Telegram. Legitimate apps only come from Google Play Store.',
      },
    ],
  },
  {
    id: 'sc-4',
    title: '"Digital Arrest" Skype Video Call Extortion',
    type: 'Social',
    context: 'You get an unexpected video call from a user named "Cyber Cell Head Office - Mumbai Police".',
    senderOrSource: 'Skype Video Call: "Inspector Vikram Shinde, Mumbai Crime Branch"',
    contentBody: `Caller (wearing police uniform in a staged room with Indian flag and police emblem):

"Listen carefully! Customs at Mumbai International Airport intercepted an international FedEx parcel bound for Cambodia containing 500 grams of MDMA drugs and 16 fake passports. 

Your Aadhaar card and mobile number are linked to this consignment! 

An urgent warrant has been issued by the Supreme Court. You are now under DIGITAL ARREST. Do not disconnect this video call or local police will storm your house. 

To clear your name, you must immediately transfer ₹1,50,000 to the official RBI Escrow Account for biometric security verification."`,
    indicators: [
      {
        label: '"Digital Arrest" is 100% Non-Existent in Indian Law',
        description: 'The Supreme Court, CBI, and Ministry of Home Affairs have clarified that no Indian law allows arrest or trial over video calls.',
        isSuspicious: true,
      },
      {
        label: 'Government Agencies Never Demand Money Over Video Calls',
        description: 'Police, CBI, or ED never ask citizens to transfer money to "RBI verification accounts" to clear criminal charges.',
        isSuspicious: true,
      },
      {
        label: 'High-Pressure Intimidation Tactics',
        description: 'Demanding you do not hang up or talk to anyone is designed to isolate you from your family so you cannot verify the truth.',
        isSuspicious: true,
      },
    ],
    options: [
      {
        id: 'opt-1',
        text: 'Follow the officer\'s instructions and transfer the ₹1,50,000 to avoid police raiding your home.',
        isCorrect: false,
        feedback: 'You will lose all your money! The RBI never has personal escrow accounts, and the uniform and background were a theatrical setup.',
      },
      {
        id: 'opt-2',
        text: 'Hang up the video call immediately. Report the fraudster to 1930 and file a complaint on cybercrime.gov.in.',
        isCorrect: true,
        feedback: '100% correct! Digital Arrest is a psychological extortion racket. Hang up without fear—real police never arrest citizens on video calls.',
      },
    ],
  },
];

export const ScenariosSection: React.FC = () => {
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const [showIndicators, setShowIndicators] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const scenario = SCENARIOS[activeScenarioIdx];

  const handleNextScenario = () => {
    setActiveScenarioIdx((prev) => (prev + 1) % SCENARIOS.length);
    setShowIndicators(false);
    setSelectedOptionId(null);
  };

  const handleSelectOption = (optId: string) => {
    setSelectedOptionId(optId);
  };

  const chosenOption = scenario.options.find((o) => o.id === selectedOptionId);

  return (
    <section id="scenarios" className="py-14 sm:py-20 bg-white dark:bg-neutral-900 border-b border-neutral-300 dark:border-neutral-800 transition-colors text-neutral-900 dark:text-neutral-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-emerald-700 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Smartphone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Interactive Scam Simulator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Spot the Scam: Real-World Scenarios
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
            Inspect real scam messages received by citizens in India. Spot the hidden red flags and practice making the safe decision.
          </p>
        </div>

        {/* Scenario Switcher Tabs - Plain rectangular tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-5">
          {SCENARIOS.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                setActiveScenarioIdx(idx);
                setShowIndicators(false);
                setSelectedOptionId(null);
              }}
              className={`px-3 py-1.5 rounded-sm text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
                idx === activeScenarioIdx
                  ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-bold border border-neutral-900 dark:border-neutral-100'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700 hover:border-emerald-500'
              }`}
            >
              <span>Case {idx + 1}:</span>
              <span>{s.title}</span>
            </button>
          ))}
        </div>

        {/* Active Scenario Card - Plain rectangular box with Tilt */}
        <TiltCard
          maxTilt={2}
          className="bg-neutral-50 dark:bg-neutral-950 rounded-sm border border-neutral-300 dark:border-neutral-800 p-5 sm:p-7 shadow-xs"
        >
          {/* Scenario Context & Source */}
          <div className="mb-4 pb-3 border-b border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                Case #{activeScenarioIdx + 1} of {SCENARIOS.length}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white mt-0.5">
                {scenario.title}
              </h3>
            </div>

            {/* Inspect Clues Button */}
            <button
              type="button"
              onClick={() => setShowIndicators(!showIndicators)}
              className="px-3 py-1.5 text-xs font-semibold rounded-sm border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:border-emerald-500 flex items-center gap-1.5 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              {showIndicators ? 'Hide Red Flags' : 'Inspect Red Flags'}
            </button>
          </div>

          <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-3 italic">
            Context: {scenario.context}
          </p>

          {/* Simulated Email / Message Viewer - Flat plain box */}
          <div className="rounded-sm border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden mb-5">
            <div className="bg-neutral-100 dark:bg-neutral-800 px-3 py-1.5 border-b border-neutral-200 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-300 flex items-center gap-2">
              <MessageSquare className="w-3.5 h-3.5 text-neutral-400" />
              <span className="font-semibold">Incoming source:</span>
              <span className="font-mono text-emerald-700 dark:text-emerald-400 truncate">{scenario.senderOrSource}</span>
            </div>

            <div className="p-4 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 whitespace-pre-line leading-relaxed font-sans">
              {scenario.contentBody}
            </div>
          </div>

          {/* Indicators Reveal Box */}
          {showIndicators && (
            <div className="mb-5 p-3.5 rounded-sm bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-xs">
              <h4 className="font-bold uppercase tracking-wider text-neutral-900 dark:text-white mb-2 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Detected Red Flags:
              </h4>
              <div className="space-y-1.5">
                {scenario.indicators.map((ind, i) => (
                  <div key={i} className="text-neutral-700 dark:text-neutral-300 flex items-start gap-2">
                    <span className="font-bold text-emerald-700 dark:text-emerald-400 shrink-0">
                      • {ind.label}:
                    </span>
                    <span>{ind.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* User Decision Options - Plain flat rectangular boxes */}
          <div className="space-y-2.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">
              Select Defense Action:
            </label>

            {scenario.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelectOption(opt.id)}
                  className={`w-full p-3.5 rounded-sm text-left text-xs sm:text-sm border transition-colors flex items-start gap-3 cursor-pointer ${
                    isSelected
                      ? 'bg-neutral-100 dark:bg-neutral-900 border-emerald-600 text-neutral-900 dark:text-white font-semibold'
                      : 'bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-none border flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                      isSelected
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-neutral-400 dark:border-neutral-600 text-transparent'
                    }`}
                  >
                    ✓
                  </span>
                  <span className="leading-snug">{opt.text}</span>
                </button>
              );
            })}
          </div>

          {/* Feedback Card */}
          {chosenOption && (
            <div
              className={`mt-5 p-3.5 rounded-sm border text-xs sm:text-sm ${
                chosenOption.isCorrect
                  ? 'bg-neutral-100 dark:bg-neutral-900 border-emerald-600 text-emerald-900 dark:text-emerald-200'
                  : 'bg-neutral-100 dark:bg-neutral-900 border-neutral-400 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200'
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold mb-1">
                {chosenOption.isCorrect ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">Correct Decision</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-neutral-500" />
                    <span className="text-neutral-900 dark:text-white uppercase tracking-wide">High Risk Action</span>
                  </>
                )}
              </div>
              <p className="leading-relaxed">
                {chosenOption.feedback}
              </p>
            </div>
          )}

          {/* Next Scenario Button */}
          <div className="mt-5 pt-3 border-t border-neutral-200 dark:border-neutral-800 flex justify-end">
            <button
              type="button"
              onClick={handleNextScenario}
              className="px-4 py-2 rounded-sm text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>Next Scenario</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </TiltCard>
      </div>
    </section>
  );
};
