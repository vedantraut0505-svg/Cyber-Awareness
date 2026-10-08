import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// Initialize Google GenAI
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// High quality curated question bank tailored for everyday users and Tier 2-3 cities threats
const CURATED_QUESTIONS = [
  // Beginner
  {
    id: 'in-b1',
    question: 'A buyer on OLX/Marketplace sends you a QR code on WhatsApp and says: "Scan this QR code and enter your UPI PIN to receive ₹5,000 for your old sofa." What happens if you scan and enter your PIN?',
    scenario: 'WhatsApp message: "Sir, I have sent money via PhonePe QR code. Just scan and enter your 4-digit UPI PIN, money will immediately credit into your bank account."',
    options: [
      '₹5,000 will be instantly credited to your bank account.',
      '₹5,000 will be DEBITED (stolen) from your bank account! UPI PIN is ONLY entered to SEND money.',
      'Your phone will automatically disconnect from the internet.',
      'Your bank will verify your signature.'
    ],
    correctIndex: 1,
    explanation: 'GOLDEN RULE: You NEVER need to enter your UPI PIN to RECEIVE money. Entering your UPI PIN always DEDUCTS money from your bank account. Scammers use fake "Receive Money" QR codes to drain your account.',
    category: 'UPI & Payment Fraud',
    difficulty: 'Beginner'
  },
  {
    id: 'in-b2',
    question: 'You receive an urgent SMS: "Dear Consumer, your electricity bill is unpaid. Power will be disconnected tonight at 9:30 PM. Contact Electricity Officer at 9821xxxxxx immediately." What should you do?',
    scenario: 'SMS: "Dear user, your electricity power will be cut tonight at 9.30 PM from head office because your previous month bill was not updated. Please call our officer at 9832104592 immediately."',
    options: [
      'Call the mobile number in the SMS right away and pay whatever amount they ask over Google Pay.',
      'Do not call the mobile number. Check your official electricity board app (e.g., MSEDCL, UPPCL, TNEB, Bescom) or official bill receipt directly.',
      'Download the "QuickSupport" or "AnyDesk" app they ask you to install so they can update your bill.',
      'Forward the message to your neighbors to panic them.'
    ],
    correctIndex: 1,
    explanation: 'Electricity departments NEVER send SMS from random 10-digit mobile numbers threatening immediate power cut, nor do they ask you to call personal mobile numbers or download remote access apps like AnyDesk.',
    category: 'SMS & Utility Scams',
    difficulty: 'Beginner'
  },
  {
    id: 'in-b3',
    question: 'Someone on WhatsApp sends you a file named "Wedding_Invitation.apk" or "PM_Kisan_Yojana_Beneficiary.apk". What should you do?',
    scenario: 'WhatsApp chat from an unknown number: "Hello Uncle, my sister\'s wedding is on 15th Nov. Please click this file to view the invitation card: Wedding_Card.apk"',
    options: [
      'Tap on the APK file to view the beautiful invitation card.',
      'NEVER install the .APK file. Delete it immediately. It is Android spyware that steals your SMS, OTPs, and bank balances.',
      'Forward the file to your family group so everyone can see the card.',
      'Rename the file to .pdf and open it.'
    ],
    correctIndex: 1,
    explanation: 'Scammers disguise dangerous malicious Android applications (.apk) as wedding cards, government subsidies (PM Kisan), or free mobile recharge. Once installed, it secretly reads all your bank OTPs!',
    category: 'Malware & APK Fraud',
    difficulty: 'Beginner'
  },
  {
    id: 'in-b4',
    question: 'If you unfortunately realize you have just lost money to an online fraud or UPI scam, what is the single most important helpline number to call in India immediately?',
    options: [
      'Call 1930 (National Cyber Crime Helpline) within the "Golden Hour" to freeze the stolen transaction.',
      'Wait 3 days to see if the money automatically refunds.',
      'Search for "Cyber Crime Recovery WhatsApp Number" on Google Search.',
      'Post a public tweet asking the scammer to return your savings.'
    ],
    correctIndex: 0,
    explanation: 'Dial 1930 immediately! Calling within 2 hours ("Golden Hour") allows the Citizen Financial Cyber Fraud Reporting system to alert recipient banks and freeze the stolen money before criminals withdraw it at ATMs.',
    category: 'Emergency & Helplines',
    difficulty: 'Beginner'
  },
  {
    id: 'in-b5',
    question: 'You get a WhatsApp message: "Work From Home! Earn ₹3,000 to ₹8,000 daily by simply liking YouTube videos and rating hotels on Google Maps. No experience needed." How does this scam work?',
    scenario: 'Telegram message: "Hello! Our company is hiring part-time review assistants. We will pay ₹150 for liking 3 videos right now as trial proof."',
    options: [
      'It is a genuine corporate marketing job that pays ₹8,000 daily.',
      'It is a "Task/Prepaid Scam": They pay ₹150 first to gain your trust, then demand ₹5,000 to ₹50,000 "investment deposits" to unlock your fake earnings, which you can never withdraw.',
      'Google officially hires users through random Telegram groups.',
      'YouTube pays viewers directly via UPI.'
    ],
    correctIndex: 1,
    explanation: 'This is the infamous Task / Part-time Job scam. Victims are lured with small real payouts of ₹150-₹300, then added to Telegram "VIP" groups where they are pressured to invest lakhs of rupees before the scammers vanish.',
    category: 'Job & Investment Scams',
    difficulty: 'Beginner'
  },
  // Intermediate
  {
    id: 'in-i1',
    question: 'You receive a Skype/WhatsApp video call from a person in police uniform claiming: "Your Aadhaar was used in a parcel sent to Cambodia with 500g MDMA drugs. You are placed under DIGITAL ARREST." What should you know?',
    scenario: 'Video call displays an officer in khaki uniform with a police station background: "Do not disconnect this call or local police will raid your house in 15 minutes. Send ₹2,00,000 to RBI verification account for security clearance."',
    options: [
      'Obey their orders and transfer your savings because real police are on video.',
      'There is NO SUCH LEGAL THING as "Digital Arrest". Real police, CBI, ED, or Customs NEVER arrest people over Skype/WhatsApp video calls or demand money transfers.',
      'Ask the officer for a discount on the verification fee.',
      'Disconnect your electricity connection.'
    ],
    correctIndex: 1,
    explanation: 'Government and law enforcement agencies (CBI, Police, RBI, Customs) have repeatedly warned that "Digital Arrest" is 100% fake. Police never interrogate or issue arrest orders over video calls, nor do they demand money transfers to "clear charges".',
    category: 'Digital Arrest Scams',
    difficulty: 'Intermediate'
  },
  {
    id: 'in-i2',
    question: 'A caller claiming to be from your bank says: "Sir, your ATM card/debit card is about to be blocked. Please tell me the 16-digit card number and the 3-digit CVV on the back to renew it." What should you do?',
    options: [
      'Give them the CVV because they are speaking very politely in Hindi/English.',
      'Refuse and disconnect immediately; banks never ask for CVV or OTP.',
      'Give the card number but not your name.',
      'Ask the caller for their Aadhaar card photo.'
    ],
    correctIndex: 1,
    explanation: 'The 3-digit CVV on the back of your card is a secret security key. Bank employees already have your account details and will NEVER ask you for your CVV or PIN.',
    category: 'Banking & Card Security',
    difficulty: 'Intermediate'
  },
  {
    id: 'in-i3',
    question: 'How can you protect your Aadhaar card from unauthorized AePS (Aadhaar Enabled Payment System) biometric cash withdrawals without your knowledge?',
    options: [
      'Laminate your physical Aadhaar card 5 times.',
      'Use the official "mAadhaar" app or UIDAI website to LOCK your biometric data when not in use.',
      'Throw away your Aadhaar card.',
      'Write your PIN on the back of the card.'
    ],
    correctIndex: 1,
    explanation: 'By locking your Aadhaar biometrics through the official mAadhaar app or resident.uidai.gov.in, no one can withdraw money using your cloned fingerprints at micro-ATMs. You can unlock it in 5 seconds whenever you need KYC.',
    category: 'Aadhaar & Identity',
    difficulty: 'Intermediate'
  },
  {
    id: 'in-i4',
    question: 'You receive a message: "Congratulations! You have won ₹25,00,000 in Kaun Banega Crorepati (KBC) WhatsApp Lucky Draw. Call Rana Pratap Singh at 9123xxxxxx to claim." What is the truth?',
    scenario: 'WhatsApp image with Amitabh Bachchan\'s photo, fake RBI logo, and audio clip: "Sir, your mobile number won the 25 Lakh draw. Pay ₹12,500 government tax fee to receive the cheque."',
    options: [
      'Pay the ₹12,500 tax fee so you can get the ₹25 Lakhs.',
      'It is 100% fake. KBC never conducts WhatsApp lucky draws, and real lotteries never ask you to pay advance fees to receive prizes.',
      'Send your bank passbook photo so they can wire the money.',
      'Share the lottery letter on Facebook.'
    ],
    correctIndex: 1,
    explanation: 'KBC and Sony TV have issued public notices warning that all WhatsApp lottery audio clips and letters are fraudulent. Never pay "advance tax", "processing fees", or "GST" to claim non-existent prizes.',
    category: 'Lottery & Prize Scams',
    difficulty: 'Intermediate'
  },
  // Advanced
  {
    id: 'in-a1',
    question: 'What is a "SIM Swap Scam", and what is the biggest early warning sign that your SIM card has been hijacked by an attacker?',
    options: [
      'Your phone ringtone changes automatically.',
      'Your mobile phone suddenly displays "No Service" / "Emergency Calls Only" in a familiar location while other people on the same network have full signals.',
      'Your screen brightness becomes dim.',
      'Your battery drains 10% faster.'
    ],
    correctIndex: 1,
    explanation: 'In a SIM swap, an attacker tricks the telecom operator into porting your mobile number to their SIM. When your physical SIM suddenly loses network reception for hours, attackers may be receiving your banking OTPs. Contact your telecom operator immediately!',
    category: 'SIM & Telecommunications',
    difficulty: 'Advanced'
  },
  {
    id: 'in-a2',
    question: 'You want to report a fake scam WhatsApp number or fraudulent SMS in India. Which official government portal operated by the Department of Telecommunications (DoT) allows citizens to report such numbers directly?',
    options: [
      'Chakshu facility on the Sanchar Saathi portal (sancharsaathi.gov.in)',
      'Wikipedia India page',
      'Truecaller premium review section',
      'Google Maps feedback form'
    ],
    correctIndex: 0,
    explanation: 'The Department of Telecommunications launched "Chakshu" on the Sanchar Saathi portal (sancharsaathi.gov.in) to enable citizens to report suspected fraudulent SMS, calls, and WhatsApp messages for fast telecom blocking.',
    category: 'Government Portals',
    difficulty: 'Advanced'
  },
  {
    id: 'in-b6',
    question: 'You receive an SMS: "Dear Customer, your SBI YONO account will be blocked today due to pending PAN/KYC. Click http://sbi-kyc-update.xyz to update immediately." What is this?',
    scenario: 'SMS: "Dear SBI User, your Net Banking will be deactivated within 12 hours. Please complete your KYC verification by updating your PAN at http://sbi-login-update.online"',
    options: [
      'A routine reminder from the State Bank of India.',
      'A phishing scam designed to steal your net-banking username, password, and OTP on a cloned fake website.',
      'A mandatory Reserve Bank of India notification.',
      'A free promotional campaign from your telecom provider.'
    ],
    correctIndex: 1,
    explanation: 'Banks NEVER send SMS links asking you to enter passwords, PINs, or PAN details. Always visit onlinesbi.sbi or the official YONO mobile app directly by typing the URL yourself.',
    category: 'Banking & Card Security',
    difficulty: 'Beginner'
  },
  {
    id: 'in-b7',
    question: 'You are waiting at a railway station and connect to an open, free Wi-Fi network without a password. What should you avoid doing while connected to this public Wi-Fi?',
    options: [
      'Reading public news articles.',
      'Checking the train timetable.',
      'Logging into net banking, making UPI payments, or entering credit card passwords.',
      'Checking the weather forecast.'
    ],
    correctIndex: 2,
    explanation: 'Unsecured public Wi-Fi networks can be intercepted by hackers using "man-in-the-middle" tools to capture credentials and cookies. Always use mobile cellular data (4G/5G) for banking transactions.',
    category: 'Banking & Card Security',
    difficulty: 'Beginner'
  },
  {
    id: 'in-i5',
    question: 'A transaction on Google Pay failed and ₹2,000 was deducted. You search "Google Pay Customer Care Number" on Google Search and find a 10-digit number. What is the risk?',
    options: [
      'The number will connect directly to Google headquarters in California.',
      'Scammers post fake customer care numbers on Google Maps and search results. When called, they instruct you to download AnyDesk or send money to a "refund QR".',
      'The call is automatically recorded by the Indian Police.',
      'Google Pay will give you double the refund.'
    ],
    correctIndex: 1,
    explanation: 'Digital payment apps (Google Pay, PhonePe, Paytm) NEVER provide 10-digit personal phone numbers on Google search. Always raise refund tickets strictly inside the official app under "Help & Support".',
    category: 'UPI & Payment Fraud',
    difficulty: 'Intermediate'
  },
  {
    id: 'in-i6',
    question: 'You get an SMS: "India Post parcel could not be delivered due to missing house number. Click http://indiapost-update.link to update your address and pay ₹25 re-delivery charge." How does this scam work?',
    scenario: 'SMS: "Your parcel arrived at the local sorting hub but delivery was suspended due to incomplete street address. Update details within 24 hours at http://track-indpost.info to avoid return."',
    options: [
      'India Post routinely collects delivery fees via random web links.',
      'It is a Phishing trap: The link mimics India Post and steals your credit/debit card credentials when you attempt to pay the ₹25 fee.',
      'Your parcel will be auctioned by customs if you do not pay.',
      'It is an official postal service SMS.'
    ],
    correctIndex: 1,
    explanation: 'India Post only sends updates from the official handle "IP-INDPOST" or "AD-POST". They never send non-gov.in web links demanding online payment for address corrections.',
    category: 'SMS & Utility Scams',
    difficulty: 'Intermediate'
  },
  {
    id: 'in-a3',
    question: 'During a phone call with someone claiming to fix your bank or mobile app, they ask you to "Tap the Screen Share button" on WhatsApp or install AnyDesk / RustDesk. What happens when you share your screen?',
    options: [
      'Your phone display becomes brighter.',
      'The scammer can see your screen in real time, watch you enter passwords, and read all your private incoming bank OTPs as they pop up!',
      'Your battery automatically recharges.',
      'It allows the bank to verify your facial features.'
    ],
    correctIndex: 1,
    explanation: 'Screen sharing grants cybercriminals full visual visibility into everything displayed on your phone, including secret OTP notifications, passcodes, and banking credentials. Never share your screen with strangers.',
    category: 'Malware & APK Fraud',
    difficulty: 'Advanced'
  },
  {
    id: 'in-a4',
    question: 'What is the "Golden Hour" principle when a citizen discovers they have fallen victim to an unauthorized online financial transaction in India?',
    options: [
      'The hour before sunset when internet speeds are highest.',
      'Reporting the fraud to Helpline 1930 within the first 2 hours, before money is transferred through multiple mule accounts and withdrawn from ATMs.',
      'Waiting 1 hour for the bank server to synchronize.',
      'Calling the local branch during morning banking hours.'
    ],
    correctIndex: 1,
    explanation: 'The first 2 hours after a fraud are critical. When reported immediately to 1930, the Citizen Financial Cyber Fraud Reporting System can freeze the funds in real-time across intermediary banks and digital wallets before cash-out.',
    category: 'Emergency & Helplines',
    difficulty: 'Advanced'
  }
];

// Shuffle helper
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Generate questions from curated fallback
function getCuratedQuiz(difficulty: string, count: number) {
  let pool = [...CURATED_QUESTIONS];
  if (difficulty === 'Beginner') {
    pool = CURATED_QUESTIONS.filter(q => q.difficulty === 'Beginner');
  } else if (difficulty === 'Intermediate') {
    pool = CURATED_QUESTIONS.filter(q => q.difficulty === 'Intermediate');
  } else if (difficulty === 'Advanced') {
    pool = CURATED_QUESTIONS.filter(q => q.difficulty === 'Advanced');
  }

  // If pool is smaller than count, fill with mixed
  if (pool.length < count) {
    const remaining = CURATED_QUESTIONS.filter(q => !pool.some(p => p.id === q.id));
    pool = [...pool, ...shuffleArray(remaining)];
  }

  const shuffled = shuffleArray(pool).slice(0, count);
  return shuffled;
}

// API endpoint for quiz generation
app.post('/api/generate-quiz', async (req: Request, res: Response) => {
  const { difficulty = 'Mixed', count = 5, learnerName = '' } = req.body;
  const numQuestions = Math.min(Math.max(Number(count) || 5, 5), 15);

  // If Gemini API is available, try generating dynamic customized questions
  if (ai) {
    try {
      const prompt = `You are a dedicated Indian cyber safety awareness educator creating an interactive, educational cyber safety quiz for everyday citizens, students, families, and Tier 2 / Tier 3 city residents${
        learnerName ? ` named ${learnerName}` : ''
      }.
Generate exactly ${numQuestions} multiple-choice questions for difficulty level: "${difficulty}".

Focus strongly on real-life scams and everyday situations that affect Indian citizens and Tier 2 / Tier 3 towns:
1. UPI PIN Frauds (e.g., "Scan QR code to receive money", OLX buyer trick - reminder that UPI PIN is ONLY entered to SEND money, never to receive).
2. Electricity Bill Disconnection SMS (e.g., "Power cut at 9:30 PM, call JE/officer at 98xxxxxxxx").
3. WhatsApp APK file traps (e.g., "Shadi_Card.apk", "PM_Kisan.apk", "Free_Recharge.apk").
4. Digital Arrest Scams (fake video calls from fake CBI / Mumbai Police / Narcotics department threatening arrest over drug parcels).
5. Part-time Job / YouTube Like / Telegram Task Scams (promising ₹3000-₹5000/day for liking videos, then asking for investment deposits).
6. Bank KYC Expiry / SBI YONO block SMS with malicious links.
7. Aadhaar AePS biometric fraud and locking biometrics via mAadhaar.
8. National Cyber Crime Helpline 1930 and cybercrime.gov.in awareness ("Golden Hour").
9. SIM Swap and OTP protection.

Tone: Clear, friendly, practical, free of technical jargon.
LANGUAGE REQUIREMENT: All generated text MUST be strictly and exclusively in the ENGLISH language only. Do NOT use any Hindi, Hindi words, or non-English scripts.
Difficulty guideline:
- Beginner: Everyday UPI safety, electricity bill SMS, WhatsApp APK traps, 1930 helpline.
- Intermediate: Digital arrest frauds, Aadhaar AePS biometric locks, KBC lottery, bank KYC expiry.
- Advanced: SIM swap warning signs, Sanchar Saathi / Chakshu portal, out-of-band banking verification.
- Mixed: Balanced combination of beginner and practical real-life scenarios.

Each question must include:
1. "question": Clear, direct question text in English.
2. "scenario": (Encouraged) Realistic SMS text, WhatsApp message, or phone call snippet in English.
3. "options": Exactly 4 distinct plausible options in English.
4. "correctIndex": The 0-based index of the single correct answer (0, 1, 2, or 3).
5. "explanation": Clear, friendly explanation in simple English emphasizing the safety golden rule.
6. "category": One of "UPI & Payment Fraud", "SMS & Utility Scams", "Malware & APK Fraud", "Digital Arrest Scams", "Job & Investment Scams", "Banking & Card Security", "Aadhaar & Identity", or "Emergency & Helplines".
7. "difficulty": One of "Beginner", "Intermediate", or "Advanced".

Output valid JSON matching the schema.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              greeting: {
                type: Type.STRING,
                description: 'Personalized greeting for the learner',
              },
              questions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    question: { type: Type.STRING },
                    scenario: { type: Type.STRING },
                    options: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                    },
                    correctIndex: { type: Type.INTEGER },
                    explanation: { type: Type.STRING },
                    category: { type: Type.STRING },
                    difficulty: { type: Type.STRING },
                  },
                  required: ['question', 'options', 'correctIndex', 'explanation', 'category', 'difficulty'],
                },
              },
            },
            required: ['questions'],
          },
        },
      });

      const responseText = response.text?.trim();
      if (responseText) {
        const parsed = JSON.parse(responseText);
        if (Array.isArray(parsed.questions) && parsed.questions.length > 0) {
          // Format ensure id and 4 options
          const formattedQuestions = parsed.questions.map((q: any, idx: number) => ({
            id: q.id || `ai-${Date.now()}-${idx}`,
            question: q.question,
            scenario: q.scenario || undefined,
            options: Array.isArray(q.options) && q.options.length >= 4 ? q.options.slice(0, 4) : q.options,
            correctIndex: typeof q.correctIndex === 'number' && q.correctIndex >= 0 && q.correctIndex < 4 ? q.correctIndex : 0,
            explanation: q.explanation || 'Always verify sender authenticity and avoid unverified links.',
            category: q.category || 'Phishing',
            difficulty: q.difficulty || (difficulty === 'Mixed' ? 'Intermediate' : difficulty),
          }));

          return res.json({
            success: true,
            source: 'gemini',
            greeting: learnerName ? `Good luck, ${learnerName}! Your AI-generated quiz is ready.` : 'Your AI-generated quiz is ready.',
            questions: formattedQuestions.slice(0, numQuestions),
          });
        }
      }
    } catch (error) {
      console.warn('Gemini quiz generation encountered an issue, falling back to curated bank:', error);
      // Fall through to curated fallback
    }
  }

  // Fallback to high quality curated question bank
  const questions = getCuratedQuiz(difficulty, numQuestions);
  return res.json({
    success: true,
    source: 'curated',
    greeting: learnerName ? `Good luck, ${learnerName}! Your AI-generated quiz is ready.` : 'Your AI-generated quiz is ready.',
    questions,
  });
});

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

async function startServer() {
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CyberSafe server listening on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
