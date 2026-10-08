import React, { useState } from 'react';
import {
  Heart,
  Brain,
  AlertCircle,
  ShieldCheck,
  User,
  Quote,
  Sparkles,
  Zap,
  Smile,
  Shield,
  ArrowRight,
} from 'lucide-react';
import { TiltCard } from './CursorEffects.tsx';

interface HumanStory {
  id: string;
  name: string;
  role: string;
  location: string;
  avatarBg: string;
  avatarEmoji: string;
  scamType: string;
  story: string;
  theTurningPoint: string;
  theLesson: string;
}

const HUMAN_STORIES: HumanStory[] = [
  {
    id: 'story-1',
    name: 'Sarah Chen',
    role: 'Freelance Graphic Designer',
    location: 'Austin, Texas',
    avatarBg: 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300',
    avatarEmoji: '🎨',
    scamType: 'The Fake Client Project (.zip trap)',
    story:
      'I got an email from someone claiming to be a marketing director at a boutique hotel wanting to hire me for $4,500. They sent an attachment: "Brand_Inspiration_Assets.zip". My heart leaped with excitement—I really needed the work.',
    theTurningPoint:
      'I almost double-clicked it right away. But I noticed my heart was racing from excitement. I stopped, inspected the unzipped folder, and saw the file was actually "Assets.pdf.exe". An executable file disguised as a PDF!',
    theLesson:
      'When an opportunity feels too exciting, our excitement blinds us. Take 30 seconds to breathe before opening any unexpected file from strangers.',
  },
  {
    id: 'story-2',
    name: 'David & Linda Miller',
    role: 'Retired School Principal & Nurse',
    location: 'Columbus, Ohio',
    avatarBg: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
    avatarEmoji: '☕',
    scamType: 'The "Grandchild in Distress" Voice Call',
    story:
      'The phone rang at 7:30 PM. A voice that sounded eerily like our 21-year-old grandson Ethan was crying, saying he got arrested abroad after a misunderstanding and needed $1,800 bail immediately before morning.',
    theTurningPoint:
      'Linda remembered a tip from our local library seminar: "Always have a family secret question." She asked: "Ethan, what did we bake together last Thanksgiving?" The caller hesitated, mumbled, and hung up.',
    theLesson:
      'Scammers leverage family love and terror. A simple family safe-word or calling the relative\'s known number directly will instantly expose the fraud.',
  },
  {
    id: 'story-3',
    name: 'Liam Patel',
    role: '2nd-Year College Student',
    location: 'Seattle, Washington',
    avatarBg: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
    avatarEmoji: '💻',
    scamType: 'The "Urgent Bank Fraud Dept" SMS',
    story:
      'I was cramming for exams at 2 AM when a text popped up: "Wells Fargo Alert: $840 zelle transfer pending. If not you, reply NO." In my half-asleep panic, I replied NO, and my phone immediately rang from a caller ID showing "Wells Fargo Fraud".',
    theTurningPoint:
      'The caller was polite and professional. But then they said: "To cancel the transfer, we sent a 6-digit passcode to your phone. Read it back to me." That was the red flag—the text message itself said "NEVER SHARE THIS CODE WITH ANYONE".',
    theLesson:
      'Real banks will NEVER call you and ask for a one-time login passcode. Passcodes are the keys to your front door; never hand them to someone over the phone.',
  },
];

const EMOTIONAL_TRIGGERS = [
  {
    id: 'panic',
    name: 'Panic & Urgency',
    icon: <Zap className="w-4 h-4 text-amber-500" />,
    badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300',
    scamHook: '"Your account will be terminated in 30 minutes unless you verify now!"',
    brainReaction:
      'Triggers the amygdala (fight-or-flight). Cortisol spikes, which shuts down logical contemplation and forces quick impulsive action.',
    counterMeasure:
      'The 10-Second Breathe Rule: Legitimate institutions give days or weeks to resolve issues, never 30 minutes.',
  },
  {
    id: 'empathy',
    name: 'Kindness & Empathy',
    icon: <Heart className="w-4 h-4 text-rose-500" />,
    badgeColor: 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300',
    scamHook: '"Hi Mom/Dad, I dropped my phone in water and this is a friend\'s phone. Can you send $250 for rent?"',
    brainReaction:
      'Triggers oxytocin and protective instincts. We feel an overwhelming urge to help someone we care about before questioning authenticity.',
    counterMeasure:
      'The Direct Call Rule: Hang up and call your loved one\'s regular phone number or ask a shared childhood memory.',
  },
  {
    id: 'authority',
    name: 'Fear of Authority',
    icon: <Shield className="w-4 h-4 text-purple-500" />,
    badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300',
    scamHook: '"This is Officer Bradley from the Federal Tax Enforcement. A warrant is being issued for your arrest."',
    brainReaction:
      'Humans are conditioned from childhood to obey authority figures and avoid punishment, causing compliance without resistance.',
    counterMeasure:
      'The Formal Channel Rule: Government agencies communicate legal actions through official postal mail, never threatening phone calls or gift cards.',
  },
  {
    id: 'greed',
    name: 'Excitement & Opportunity',
    icon: <Sparkles className="w-4 h-4 text-emerald-500" />,
    badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300',
    scamHook: '"You were selected for a $1,500 Amazon mystery shopper grant! Claim your gift card today."',
    brainReaction:
      'Dopamine release tricks the brain into imagining the reward, lowering natural skepticism and making small fees seem negligible.',
    counterMeasure:
      'The Reality Check: You cannot win a contest or lottery you never entered. Free money always comes with a hidden hook.',
  },
];

export const HumanStoriesSection: React.FC = () => {
  const [selectedTrigger, setSelectedTrigger] = useState(EMOTIONAL_TRIGGERS[0]);

  return (
    <section className="py-14 sm:py-20 border-b border-slate-200 dark:border-slate-800 transition-colors relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900 mb-3 shadow-xs">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            The Human Side of Security
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Scammers Don't Hack Code — They Hack Human Feelings
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
            There is zero shame in feeling confused or anxious when targeted by a scam. Scammers are trained psychological manipulators. Understanding your natural emotional reactions is your ultimate shield.
          </p>
        </div>

        {/* Part 1: Interactive Emotion Decoder */}
        <div className="mb-16 bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm transition-colors">
          <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
            <Brain className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Interactive Emotion Decoder: How Scams Exploit Our Biology
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Click an emotion to explore how attackers weaponize it and how your brain can counter it:
              </p>
            </div>
          </div>

          {/* Emotional Trigger Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
            {EMOTIONAL_TRIGGERS.map((trigger) => {
              const isSelected = selectedTrigger.id === trigger.id;
              return (
                <button
                  key={trigger.id}
                  type="button"
                  onClick={() => setSelectedTrigger(trigger)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                    isSelected
                      ? 'bg-blue-50 dark:bg-blue-950/80 border-blue-600 text-blue-900 dark:text-blue-100 shadow-sm ring-2 ring-blue-500/30'
                      : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="p-1.5 rounded-lg bg-white dark:bg-slate-800 shadow-2xs">
                    {trigger.icon}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold truncate">
                    {trigger.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Trigger Breakdown Card */}
          <div className="p-5 sm:p-6 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800/80 animate-fade-in">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${selectedTrigger.badgeColor}`}>
                Target Emotion: {selectedTrigger.name}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-750">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1.5">
                  1. The Scam Hook (What They Say)
                </span>
                <p className="text-slate-800 dark:text-slate-200 font-mono text-xs italic leading-relaxed">
                  "{selectedTrigger.scamHook}"
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-750">
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-500 dark:text-rose-400 block mb-1.5">
                  2. Why Your Brain Falls For It
                </span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {selectedTrigger.brainReaction}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block mb-1.5">
                  3. Your Superpower Defense
                </span>
                <p className="text-emerald-900 dark:text-emerald-100 font-medium leading-relaxed">
                  {selectedTrigger.counterMeasure}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Part 2: Real People Stories */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Smile className="w-5 h-5 text-emerald-500" />
                Real Stories, Real Lessons
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                True experiences from everyday internet users who spotted the traps in time:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HUMAN_STORIES.map((item) => (
              <TiltCard
                key={item.id}
                maxTilt={5}
                className="bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  {/* User Profile */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl shrink-0 ${item.avatarBg} shadow-2xs`}
                    >
                      {item.avatarEmoji}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {item.name}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {item.role} • {item.location}
                      </p>
                    </div>
                  </div>

                  {/* Threat label */}
                  <div className="inline-block px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 mb-3 border border-slate-200 dark:border-slate-700">
                    {item.scamType}
                  </div>

                  {/* Story excerpt */}
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    "{item.story}"
                  </p>

                  {/* The Turning Point */}
                  <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/70 dark:border-amber-900/50 mb-3 text-xs text-slate-800 dark:text-amber-100/90 leading-relaxed">
                    <strong className="text-amber-800 dark:text-amber-300 block mb-0.5 font-semibold">
                      ⚡ The Turning Point:
                    </strong>
                    {item.theTurningPoint}
                  </div>
                </div>

                {/* The Lesson */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-blue-700 dark:text-blue-300 font-medium">
                  <strong>💡 Takeaway:</strong> {item.theLesson}
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
