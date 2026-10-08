import React, { useState } from 'react';
import {
  AlertTriangle,
  Search,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

interface ThreatItem {
  id: string;
  code: string;
  title: string;
  category: string;
  severity: string;
  summary: string;
  howItWorks: string;
  realCase: string;
  redFlags: string[];
  countermeasures: string[];
}

const THREAT_MATRIX: ThreatItem[] = [
  {
    id: 'upi-qr',
    code: 'SCAM 01',
    title: 'UPI "Scan to Receive Money" QR Code Trap',
    category: 'UPI & Payments',
    severity: 'HIGH RISK',
    summary: 'Fraudulent QR codes sent over WhatsApp falsely claiming you must enter your PIN to receive money.',
    howItWorks:
      'Scammers target marketplace sellers (OLX, Facebook) or lottery winners. They send a PhonePe/GPay QR code image and instruct you to scan and enter your 4 or 6-digit PIN to "credit" funds. In reality, entering your PIN initiates a debit request that immediately empties your bank balance.',
    realCase:
      'A seller listing a sofa for ₹6,000 on OLX was sent a QR code by a fake buyer. The seller entered their UPI PIN thinking they were receiving ₹6,000, but ₹6,000 was debited instantly from their savings account.',
    redFlags: [
      'The caller insists you must enter your UPI PIN to receive money',
      'QR code images sent on WhatsApp with "PAY" or "TRANSFER" hidden in the text',
      'Buyer is overly eager and refuses to inspect items in person',
    ],
    countermeasures: [
      'Remember: You NEVER need to enter your UPI PIN to receive money.',
      'To receive money, simply sharing your mobile number or UPI ID is 100% sufficient.',
      'Report fraudulent UPI IDs immediately on the BHIM/PhonePe app and dial 1930.',
    ],
  },
  {
    id: 'electricity-sms',
    code: 'SCAM 02',
    title: 'Fake Electricity Disconnection Alert SMS',
    category: 'SMS & Utilities',
    severity: 'HIGH RISK',
    summary: 'Phishing SMS threatening power cuts at 9:30 PM unless you call a personal mobile number.',
    howItWorks:
      'Attackers send mass SMS stating your electricity bill is unpaid and power will be cut in a few hours. When panicking citizens call the number, scammers instruct them to install AnyDesk/QuickSupport or pay ₹10 on a malicious link that captures net-banking credentials.',
    realCase:
      'A homeowner received an SMS claiming power would be cut at 9:30 PM. They called the number, installed a "bill update APK", and lost ₹1,20,000 from their linked savings account.',
    redFlags: [
      'SMS sent from regular 10-digit mobile numbers (+91 98xxxxxx) instead of official department headers (e.g. VM-MSEDCL)',
      'Artificial nighttime deadline ("Power disconnected at 9:30 PM")',
      'Demands to install screen-sharing software or call personal numbers',
    ],
    countermeasures: [
      'Electricity boards never send personal disconnection threats via 10-digit numbers.',
      'Verify bill status solely through official board apps or printed physical bill receipts.',
      'Report the fraudulent phone number on the Department of Telecommunications "Chakshu" portal.',
    ],
  },
  {
    id: 'apk-spyware',
    code: 'SCAM 03',
    title: 'WhatsApp ".APK" Spyware Files',
    category: 'Malware & APKs',
    severity: 'HIGH RISK',
    summary: 'Disguised Android application files sent on WhatsApp (Wedding Cards, Government Subsidies) that steal banking OTPs.',
    howItWorks:
      'Criminals send files named "Wedding_Card.apk" or "PM_Kisan_Yojana.apk". When a victim taps the file, it installs a malicious Android background service that requests SMS permissions and silently forwards all incoming bank OTPs to the attacker.',
    realCase:
      'A user received "Invitation_Card.apk" in a family WhatsApp group. Within 20 minutes of opening it, four unauthorized net-banking transactions occurred with zero OTP alerts appearing on the screen.',
    redFlags: [
      'File names ending in ".apk" rather than ".pdf", ".jpg", or ".png"',
      'Prompts asking to enable "Install from Unknown Sources" in phone settings',
      'Unsolicited WhatsApp forwards promising cash subsidies or celebration invites',
    ],
    countermeasures: [
      'Never install files ending in .apk received via WhatsApp, Telegram, or websites.',
      'Only download apps from the official Google Play Store with Play Protect enabled.',
      'If accidentally clicked, disconnect Wi-Fi and factory-reset the phone immediately.',
    ],
  },
  {
    id: 'digital-arrest',
    code: 'SCAM 04',
    title: '"Digital Arrest" Extortion Video Calls',
    category: 'Extortion Calls',
    severity: 'HIGH RISK',
    summary: 'Fake police video calls falsely accusing victims of narcotics parcels and forcing emergency fund transfers.',
    howItWorks:
      'Scammers impersonate CBI, Mumbai Police, or Narcotics Control Bureau on Skype/WhatsApp video calls wearing uniforms in staged police setups. They falsely claim a parcel in your name was seized with narcotics, issue fake Supreme Court arrest warrants, and order you not to leave the video call ("Digital Arrest") until you transfer verification deposits.',
    realCase:
      'A retired government official was held on a continuous 48-hour video call by fake "CBI officers" and coerced into transferring ₹45 Lakhs to a "temporary RBI clearance account".',
    redFlags: [
      'Any claim of "Digital Arrest" — no such legal provision exists in Indian law',
      'Police officers conducting formal trials or interrogations over Skype/WhatsApp',
      'Demands to transfer money to "RBI verification accounts" to cancel arrest warrants',
    ],
    countermeasures: [
      'Hang up immediately. Real police never interrogate or arrest citizens over video calls.',
      'Police always serve physical summons through your local jurisdictional police station.',
      'Dial 1930 and report the video call account to cybercrime.gov.in right away.',
    ],
  },
  {
    id: 'task-job',
    code: 'SCAM 05',
    title: 'Part-Time "YouTube Like & Earn" Task Scams',
    category: 'Job & Investment',
    severity: 'HIGH RISK',
    summary: 'Telegram groups promising ₹3,000/day for liking videos, which evolve into prepaid investment traps.',
    howItWorks:
      'Victims are recruited via WhatsApp to like 3 videos or review Google Maps places, receiving real initial payouts of ₹150 to ₹300 to build false trust. They are then added to a "VIP Telegram group" where they must deposit ₹5,000 to ₹50,000 to unlock higher commission rates, after which the scammers lock the funds and vanish.',
    realCase:
      'A college student earned ₹200 on day one, then deposited their savings of ₹35,000 on day two to unlock a "Platinum Task". The funds were frozen and the administrators deleted the Telegram group.',
    redFlags: [
      'Offers paying unrealistic amounts (₹50 per click) for unskilled video likes',
      'Requirement to pay money or deposit funds to receive your earned salary',
      'Recruitment and coordination conducted exclusively on Telegram channels',
    ],
    countermeasures: [
      'Legitimate employers never demand upfront investment deposits from employees.',
      'Never invest money in unverified Telegram cryptocurrency or task groups.',
      'Block and report the recruiting numbers on WhatsApp and Telegram.',
    ],
  },
  {
    id: 'aeps-biometric',
    code: 'SCAM 06',
    title: 'Aadhaar AePS Biometric Cash Theft',
    category: 'Aadhaar & Identity',
    severity: 'HIGH RISK',
    summary: 'Unauthorized micro-ATM cash withdrawals using cloned silicon fingerprints extracted from public documents.',
    howItWorks:
      'Fraudsters obtain land registry deeds or public documents containing physical thumbprints, clone the fingerprint onto silicone rubber, and withdraw cash via Aadhaar Enabled Payment System (AePS) micro-ATMs without an OTP or debit card.',
    realCase:
      'A citizen discovered ₹10,000 was debited in three consecutive AePS transactions from their rural bank account without receiving any OTP or using their debit card.',
    redFlags: [
      'AePS cash withdrawal SMS alerts when you have not visited a micro-ATM',
      'Unfamiliar fingerprint requests at unofficial utility stalls',
    ],
    countermeasures: [
      'Lock your Aadhaar biometrics via the official mAadhaar mobile app or resident.uidai.gov.in.',
      'Locked biometrics block 100% of unauthorized AePS fingerprint withdrawals.',
      'You can temporarily unlock biometrics in 5 seconds whenever you legitimately need KYC.',
    ],
  },
];

export const CrimesSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>('upi-qr');

  const categories = [
    'All',
    'UPI & Payments',
    'SMS & Utilities',
    'Malware & APKs',
    'Extortion Calls',
    'Job & Investment',
    'Aadhaar & Identity',
  ];

  const filteredThreats = THREAT_MATRIX.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.howItWorks.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="scams" className="py-14 sm:py-20 bg-neutral-100 dark:bg-neutral-950 border-b border-neutral-300 dark:border-neutral-800 transition-colors text-neutral-900 dark:text-neutral-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-emerald-700 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <AlertTriangle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Common Cyber Threats in India</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Recognize the Most Common Online Scams
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
            Real scam patterns currently targeting citizens, small shopkeepers, and families across Tier 2 and Tier 3 cities.
          </p>
        </div>

        {/* Filter and Search Bar - Plain rectangular styling */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-sm whitespace-nowrap transition-colors cursor-pointer text-xs font-medium ${
                  selectedCategory === cat
                    ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-bold border border-neutral-900 dark:border-neutral-100'
                    : 'bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700 hover:border-emerald-500'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search scams..."
              className="w-full pl-8 pr-3 py-1.5 rounded-sm border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder:text-neutral-400 text-xs focus:outline-hidden focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Threat Cards - Simple plane rectangular boxes */}
        <div className="space-y-3">
          {filteredThreats.map((threat) => {
            const isExpanded = expandedId === threat.id;

            return (
              <div
                key={threat.id}
                className="rounded-sm bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : threat.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-3 cursor-pointer focus:outline-hidden"
                  aria-expanded={isExpanded}
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 px-1.5 py-0.5 rounded-sm bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700">
                        {threat.code}
                      </span>
                      <h3 className="font-bold text-sm sm:text-base text-neutral-900 dark:text-white">
                        {threat.title}
                      </h3>
                      <span className="text-[10px] font-semibold text-neutral-500 dark:text-neutral-400 px-1.5 py-0.5 rounded-sm bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                        {threat.severity}
                      </span>
                    </div>

                    <p className="text-xs text-neutral-600 dark:text-neutral-400">
                      {threat.summary}
                    </p>
                  </div>

                  <div className="p-1 rounded-sm border border-neutral-300 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400 shrink-0">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-4 pb-5 sm:px-5 pt-2 border-t border-neutral-200 dark:border-neutral-800 space-y-3 text-xs">
                    <div>
                      <span className="font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block mb-1">
                        How the scam operates:
                      </span>
                      <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                        {threat.howItWorks}
                      </p>
                    </div>

                    {/* Real Case - Plain rectangular box */}
                    <div className="p-3 rounded-sm bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                      <span className="font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 block mb-0.5">
                        Documented Case:
                      </span>
                      <p className="text-neutral-600 dark:text-neutral-400 italic leading-relaxed">
                        "{threat.realCase}"
                      </p>
                    </div>

                    {/* Red Flags & Countermeasures - Clean rectangular boxes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                      <div className="p-3 rounded-sm bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800">
                        <span className="font-bold uppercase tracking-wider text-neutral-900 dark:text-white block mb-2 flex items-center gap-1.5">
                          <XCircle className="w-3.5 h-3.5 text-neutral-500" />
                          Red Flags:
                        </span>
                        <ul className="space-y-1 list-disc list-inside text-neutral-600 dark:text-neutral-300">
                          {threat.redFlags.map((flag, idx) => (
                            <li key={idx} className="leading-snug">{flag}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3 rounded-sm bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800">
                        <span className="font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block mb-2 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          How to Protect:
                        </span>
                        <ul className="space-y-1 list-disc list-inside text-neutral-600 dark:text-neutral-300">
                          {threat.countermeasures.map((tip, idx) => (
                            <li key={idx} className="leading-snug">{tip}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
