import React from 'react';
import {
  Award,
  ShieldCheck,
  ShieldAlert,
  Zap,
  Lock,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { useUser } from '../context/UserContext.tsx';
import { TiltCard } from './CursorEffects.tsx';

export const RanksSection: React.FC = () => {
  const { preferences } = useUser();

  const rankTiers = [
    {
      level: 'LEVEL 01',
      title: 'Digital Civilian',
      scoreReq: '0 - 40%',
      icon: <ShieldAlert className="w-5 h-5 text-amber-400" />,
      color: 'border-amber-500/40 text-amber-400',
      desc: 'Beginning awareness. High risk of falling for urgent electricity SMS or UPI QR code traps.',
      perks: ['Needs 10-Second Pause training', 'Must memorize: UPI PIN is only to send money'],
    },
    {
      level: 'LEVEL 02',
      title: 'Shield Sentinel',
      scoreReq: '41 - 70%',
      icon: <ShieldCheck className="w-5 h-5 text-blue-400" />,
      color: 'border-blue-500/40 text-blue-400',
      desc: 'Solid daily vigilance. Recognizes suspicious WhatsApp APK files and tech support scams.',
      perks: ['2FA enabled on main accounts', 'Verifies senders out-of-band'],
    },
    {
      level: 'LEVEL 03',
      title: 'CyberSuraksha Guardian',
      scoreReq: '71 - 100%',
      icon: <Zap className="w-5 h-5 text-[#00ff66]" />,
      color: 'border-[#00ff66]/60 text-[#00ff66]',
      isTop: true,
      desc: 'Master digital defender. Spots Digital Arrest fraud instantly and educates family members.',
      perks: ['Aadhaar biometrics locked', 'Instant 1930 emergency reflex', 'Zero fear of scam tactics'],
    },
  ];

  return (
    <section id="ranks" className="py-16 sm:py-24 bg-[#070b12] text-white border-b border-emerald-950/60 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 font-mono-tech">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-[#00ff66]/40 bg-black/60 text-[#00ff66] text-xs tracking-widest uppercase mb-3">
            <span>&gt;_</span>
            <span>DEFENCE_TIERS & READINESS</span>
          </div>
          <h2 className="font-cyber font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
            CYBER DEFENCE <span className="text-[#00ff66] text-glow-green">RANKS</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
            Every quiz you complete tests your reflexes against real cyber attacks. Level up your security rank and safeguard your family.
          </p>
        </div>

        {/* 3 Ranks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono-tech">
          {rankTiers.map((tier) => (
            <TiltCard
              key={tier.level}
              maxTilt={4}
              className={`p-6 sm:p-7 rounded-lg bg-black/70 border ${tier.color} flex flex-col justify-between transition-all ${
                tier.isTop ? 'shadow-[0_0_20px_rgba(0,255,102,0.15)] ring-1 ring-[#00ff66]/30' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold tracking-widest text-slate-500">
                    {tier.level}
                  </span>
                  <div className="p-2 rounded-md bg-slate-900/80 border border-slate-800">
                    {tier.icon}
                  </div>
                </div>

                <h3 className="font-cyber text-xl font-bold text-white mb-1">
                  {tier.title}
                </h3>
                <div className="text-xs font-bold text-slate-400 mb-3">
                  Readiness Score: <span className="text-white">{tier.scoreReq}</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-5">
                  {tier.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-2">
                <span className="text-[10px] text-slate-500 tracking-wider uppercase block">
                  Defense Traits:
                </span>
                {tier.perks.map((p, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                    <span className="text-[#00ff66]">✓</span>
                    <span>{p}</span>
                  </div>
                ))}
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};
