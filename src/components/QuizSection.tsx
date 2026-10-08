import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  BookOpen,
  Award,
  Loader2,
  Clock,
  User,
} from 'lucide-react';
import { QuizDifficulty, QuizQuestion } from '../types.ts';
import { useUser } from '../context/UserContext.tsx';
import { TiltCard } from './CursorEffects.tsx';

type QuizState = 'config' | 'generating' | 'ready' | 'active' | 'completed' | 'review';

export const QuizSection: React.FC = () => {
  const { preferences, setDifficulty, setQuestionCount, setLearnerName } = useUser();

  const [quizState, setQuizState] = useState<QuizState>('config');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [greetingMessage, setGreetingMessage] = useState<string>('');
  const [generationSource, setGenerationSource] = useState<string>('gemini');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [selectedDifficulty, setSelectedDifficulty] = useState<QuizDifficulty>(preferences.difficulty);
  const [selectedCount, setSelectedCount] = useState<number>(preferences.questionCount);
  const [nameInput, setNameInput] = useState<string>(preferences.learnerName);

  const difficultyOptions: QuizDifficulty[] = ['Beginner', 'Intermediate', 'Advanced', 'Mixed'];
  const countOptions = [5, 10, 15];

  const handleGenerateQuiz = async () => {
    setDifficulty(selectedDifficulty);
    setQuestionCount(selectedCount);
    if (nameInput.trim() !== preferences.learnerName) {
      setLearnerName(nameInput.trim());
    }

    setQuizState('generating');
    setErrorMsg(null);

    try {
      const response = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          difficulty: selectedDifficulty,
          count: selectedCount,
          learnerName: nameInput.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data = await response.json();
      if (data.questions && data.questions.length > 0) {
        setQuestions(data.questions);
        setGreetingMessage(
          data.greeting ||
            (nameInput.trim()
              ? `Good luck, ${nameInput.trim()}! Your AI-generated quiz is ready.`
              : 'Your AI-generated quiz is ready.')
        );
        setGenerationSource(data.source || 'gemini');
        setUserAnswers({});
        setCurrentIndex(0);
        setQuizState('ready');
      } else {
        throw new Error('No questions returned');
      }
    } catch (err) {
      console.error('Quiz generation failed:', err);
      setErrorMsg('Could not reach the quiz generator. Please check your connection and try again.');
      setQuizState('config');
    }
  };

  const handleStartQuiz = () => {
    setQuizState('active');
    setCurrentIndex(0);
  };

  const handleSelectOption = (optionIndex: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionIndex,
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setQuizState('completed');
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  const totalScore = calculateScore();
  const percentage = questions.length > 0 ? Math.round((totalScore / questions.length) * 100) : 0;
  const currentQ = questions[currentIndex];
  const progressPercent = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;

  return (
    <section id="quiz" className="py-14 sm:py-20 bg-neutral-100 dark:bg-neutral-950 border-b border-neutral-300 dark:border-neutral-800 transition-colors text-neutral-900 dark:text-neutral-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm text-xs font-semibold bg-neutral-200 dark:bg-neutral-800 text-emerald-700 dark:text-emerald-400 border border-neutral-300 dark:border-neutral-700 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            AI Cyber Safety Quiz
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Test Your Online Defense Knowledge
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
            Practical challenges covering UPI safety, SMS scams, fake calls, and APK traps faced by everyday citizens in India.
          </p>
        </div>

        {/* 1. CONFIGURATION VIEW */}
        {quizState === 'config' && (
          <div className="bg-white dark:bg-neutral-900 rounded-sm border border-neutral-300 dark:border-neutral-800 p-6 sm:p-8 transition-colors">
            <div className="space-y-6">
              {errorMsg && (
                <div className="p-3 rounded-sm bg-neutral-100 dark:bg-neutral-800 border border-neutral-400 text-neutral-900 dark:text-neutral-100 text-xs flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Learner Name input (optional) */}
              <div>
                <label htmlFor="quizLearnerName" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-neutral-500" />
                  Learner Name <span className="text-[11px] font-normal text-neutral-500 lowercase">(optional)</span>
                </label>
                <input
                  id="quizLearnerName"
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="e.g., Vedant"
                  maxLength={30}
                  className="w-full px-3 py-2 rounded-sm border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white placeholder:text-neutral-500 focus:outline-hidden focus:border-emerald-500 text-xs"
                />
              </div>

              {/* Choose your difficulty */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                  Choose your difficulty:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {difficultyOptions.map((diff) => {
                    const isSelected = selectedDifficulty === diff;
                    return (
                      <button
                        key={diff}
                        type="button"
                        onClick={() => setSelectedDifficulty(diff)}
                        className={`px-3 py-2.5 rounded-sm text-xs font-bold border transition-colors cursor-pointer text-center ${
                          isSelected
                            ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 border-neutral-900 dark:border-neutral-100'
                            : 'bg-neutral-50 dark:bg-neutral-950 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-800 hover:border-emerald-500'
                        }`}
                      >
                        [ {diff} ]
                      </button>
                    );
                  })}
                </div>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1.5">
                  {selectedDifficulty === 'Beginner' && 'Everyday UPI safety, electricity bill SMS, WhatsApp APK traps, 1930 helpline.'}
                  {selectedDifficulty === 'Intermediate' && 'Digital arrest video calls, Aadhaar biometric locks, KBC lottery, job task scams.'}
                  {selectedDifficulty === 'Advanced' && 'SIM swap detection, Chakshu portal reporting, screen-sharing protection.'}
                  {selectedDifficulty === 'Mixed' && 'Balanced combination of real-life scenarios for Indian citizens.'}
                </p>
              </div>

              {/* Number of questions */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                  Number of questions:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {countOptions.map((count) => {
                    const isSelected = selectedCount === count;
                    return (
                      <button
                        key={count}
                        type="button"
                        onClick={() => setSelectedCount(count)}
                        className={`px-3 py-2 rounded-sm text-xs font-bold border transition-colors cursor-pointer text-center ${
                          isSelected
                            ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 border-neutral-900 dark:border-neutral-100'
                            : 'bg-neutral-50 dark:bg-neutral-950 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-800 hover:border-emerald-500'
                        }`}
                      >
                        [ {count} ]
                      </button>
                    );
                  })}
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 dark:text-neutral-400 mt-1.5">
                  <Clock className="w-3 h-3" />
                  <span>Estimated time: ~{selectedCount} minute{selectedCount > 1 ? 's' : ''}</span>
                </div>
              </div>

              {/* Generate New Quiz Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleGenerateQuiz}
                  className="w-full py-3 px-5 rounded-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer shadow-xs"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Generate New Quiz</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 2. WHILE AI IS GENERATING */}
        {quizState === 'generating' && (
          <div className="bg-white dark:bg-neutral-900 rounded-sm border border-neutral-300 dark:border-neutral-800 p-8 sm:p-12 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-sm bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 flex items-center justify-center text-emerald-600">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white mb-1.5">
              Creating a fresh quiz for you...
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-md mx-auto">
              Generating tailored real-world scenarios in English for <strong className="text-neutral-900 dark:text-white">{selectedDifficulty}</strong> level.
            </p>
            <div className="mt-5 flex justify-center">
              <div className="h-1.5 w-44 bg-neutral-200 dark:bg-neutral-800 rounded-none overflow-hidden">
                <div className="h-full bg-emerald-600 animate-pulse w-3/4"></div>
              </div>
            </div>
          </div>
        )}

        {/* 3. AFTER GENERATION: QUIZ READY */}
        {quizState === 'ready' && (
          <div className="bg-white dark:bg-neutral-900 rounded-sm border border-neutral-300 dark:border-neutral-800 p-8 sm:p-10 text-center animate-fade-in">
            <div className="w-12 h-12 mx-auto mb-4 rounded-sm bg-neutral-100 dark:bg-neutral-800 border border-emerald-500/60 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white mb-1.5">
              Quiz Ready!
            </h3>

            <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 mb-4">
              {greetingMessage}
            </p>

            <div className="inline-flex flex-wrap items-center justify-center gap-2 px-3 py-1.5 rounded-sm bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400 mb-6">
              <span>Difficulty: <strong className="text-neutral-900 dark:text-white">{selectedDifficulty}</strong></span>
              <span>•</span>
              <span>Questions: <strong className="text-neutral-900 dark:text-white">{questions.length}</strong></span>
              <span>•</span>
              <span>Engine: <strong className="text-neutral-900 dark:text-white">{generationSource === 'gemini' ? 'Gemini AI' : 'CyberSafe Expert Bank'}</strong></span>
            </div>

            <div className="max-w-xs mx-auto">
              <button
                type="button"
                onClick={handleStartQuiz}
                className="w-full py-3 px-5 rounded-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <span>[ Start Quiz ]</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* 4. DURING THE QUIZ */}
        {quizState === 'active' && currentQ && (
          <div className="space-y-3">
            {/* Header info & flat progress bar */}
            <div className="bg-white dark:bg-neutral-900 rounded-sm border border-neutral-300 dark:border-neutral-800 p-4">
              <div className="flex items-center justify-between text-xs font-semibold mb-2 text-neutral-700 dark:text-neutral-300">
                <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                  Question {currentIndex + 1} of {questions.length}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-300 dark:border-neutral-700">
                  {currentQ.category}
                </span>
              </div>

              {/* Flat plain progress bar (no circular rounded-full) */}
              <div
                className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-none overflow-hidden"
                role="progressbar"
                aria-valuenow={progressPercent}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Question ${currentIndex + 1} of ${questions.length}`}
              >
                <div
                  className="h-full bg-emerald-600 transition-all duration-300 ease-out"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>

              {/* Question index buttons - Plain square boxes */}
              <div className="flex items-center gap-1 mt-3 pt-2 border-t border-neutral-200 dark:border-neutral-800 overflow-x-auto pb-1">
                {questions.map((_, idx) => {
                  const isAnswered = userAnswers[idx] !== undefined;
                  const isCurrent = idx === currentIndex;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentIndex(idx)}
                      aria-label={`Go to question ${idx + 1}`}
                      className={`w-6 h-6 shrink-0 text-xs font-semibold rounded-none transition-colors cursor-pointer flex items-center justify-center border ${
                        isCurrent
                          ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 border-neutral-900 dark:border-neutral-100 font-bold'
                          : isAnswered
                          ? 'bg-neutral-200 dark:bg-neutral-800 text-emerald-700 dark:text-emerald-400 border-emerald-600/50'
                          : 'bg-neutral-50 dark:bg-neutral-950 text-neutral-500 border-neutral-300 dark:border-neutral-800'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Question Card - Plain rectangular box */}
            <div className="bg-white dark:bg-neutral-900 rounded-sm border border-neutral-300 dark:border-neutral-800 p-5 sm:p-7">
              {currentQ.scenario && (
                <div className="mb-4 p-3 rounded-sm bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 font-mono text-xs text-neutral-800 dark:text-neutral-200 whitespace-pre-line leading-relaxed">
                  <div className="text-[10px] font-sans font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1 flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    Scenario Inspection
                  </div>
                  {currentQ.scenario}
                </div>
              )}

              <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white leading-snug mb-5">
                {currentQ.question}
              </h3>

              {/* Answer Options - Flat rectangular boxes */}
              <div className="space-y-2.5" role="radiogroup" aria-label="Answer options">
                {currentQ.options.map((option, optIdx) => {
                  const isSelected = userAnswers[currentIndex] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`w-full p-3.5 rounded-sm text-left text-xs sm:text-sm border transition-colors flex items-start gap-3 cursor-pointer ${
                        isSelected
                          ? 'bg-neutral-100 dark:bg-neutral-950 border-emerald-600 text-neutral-900 dark:text-white font-medium'
                          : 'bg-neutral-50 dark:bg-neutral-950 border-neutral-300 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400'
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-none border flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                          isSelected
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'border-neutral-400 text-neutral-500'
                        }`}
                      >
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="leading-relaxed flex-1">{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Buttons: [ Previous ] [ Next ] */}
              <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  className={`px-4 py-2 rounded-sm text-xs font-semibold border flex items-center gap-1.5 transition-colors ${
                    currentIndex === 0
                      ? 'opacity-40 cursor-not-allowed border-neutral-200 dark:border-neutral-800 text-neutral-400'
                      : 'border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:border-emerald-500 cursor-pointer'
                  }`}
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>[ Previous ]</span>
                </button>

                <div className="text-[11px] text-neutral-500 dark:text-neutral-400 hidden sm:block">
                  {userAnswers[currentIndex] === undefined ? 'Select an answer to proceed' : 'Answer recorded'}
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="px-4 py-2 rounded-sm text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {currentIndex === questions.length - 1 ? (
                    <>
                      <span>[ Finish Quiz ]</span>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </>
                  ) : (
                    <>
                      <span>[ Next ]</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 5. AT THE END: YOUR SCORE VIEW */}
        {quizState === 'completed' && (
          <div className="bg-white dark:bg-neutral-900 rounded-sm border border-neutral-300 dark:border-neutral-800 p-6 sm:p-10 text-center">
            <div className="w-14 h-14 mx-auto mb-3 rounded-sm bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 flex items-center justify-center text-emerald-600">
              <Award className="w-7 h-7" />
            </div>

            {preferences.learnerName && (
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
                Completed by {preferences.learnerName}
              </p>
            )}

            <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white mb-2">
              Your Score: {totalScore}/{questions.length}
            </h3>

            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-md mx-auto mb-5">
              {percentage >= 80
                ? 'Outstanding defense! You have sharp reflexes against online fraud tactics.'
                : percentage >= 50
                ? 'Good effort! You spotted most threats, with a few key hygiene habits to polish.'
                : 'Awareness is protection. Review the explanations below to spot these traps.'}
            </p>

            {/* Score summary cards - Plain rectangular boxes */}
            <div className="grid grid-cols-3 gap-2.5 max-w-sm mx-auto mb-6 text-center">
              <div className="p-2.5 rounded-sm bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                <div className="text-base font-bold text-neutral-900 dark:text-white">{percentage}%</div>
                <div className="text-[10px] text-neutral-500">Accuracy</div>
              </div>
              <div className="p-2.5 rounded-sm bg-neutral-50 dark:bg-neutral-950 border border-emerald-500/40">
                <div className="text-base font-bold text-emerald-600 dark:text-emerald-400">{totalScore}</div>
                <div className="text-[10px] text-neutral-500">Correct</div>
              </div>
              <div className="p-2.5 rounded-sm bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                <div className="text-base font-bold text-neutral-500">
                  {questions.length - totalScore}
                </div>
                <div className="text-[10px] text-neutral-500">Missed</div>
              </div>
            </div>

            {/* Action Buttons: [ Review Answers ] [ Generate Another AI Quiz ] */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 max-w-md mx-auto">
              <button
                type="button"
                onClick={() => setQuizState('review')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-sm font-semibold text-neutral-800 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800 hover:border-emerald-500 border border-neutral-300 dark:border-neutral-700 flex items-center justify-center gap-1.5 cursor-pointer text-xs sm:text-sm"
              >
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span>[ Review Answers ]</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setQuizState('config');
                  setUserAnswers({});
                  setCurrentIndex(0);
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 flex items-center justify-center gap-1.5 cursor-pointer text-xs sm:text-sm"
              >
                <RotateCcw className="w-4 h-4" />
                <span>[ Generate Another AI Quiz ]</span>
              </button>
            </div>
          </div>
        )}

        {/* 6. REVIEW ANSWERS VIEW */}
        {quizState === 'review' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-300 dark:border-neutral-800">
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                Detailed Answer Review
              </h3>
              <button
                type="button"
                onClick={() => setQuizState('completed')}
                className="px-3 py-1 text-xs font-semibold border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 rounded-sm cursor-pointer"
              >
                Back to Score
              </button>
            </div>

            <div className="space-y-3">
              {questions.map((q, idx) => {
                const userAnswer = userAnswers[idx];
                const isCorrect = userAnswer === q.correctIndex;

                return (
                  <div
                    key={q.id || idx}
                    className="p-4 sm:p-5 rounded-sm bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-xs"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="font-bold text-neutral-700 dark:text-neutral-300">
                        Q{idx + 1}. {q.question}
                      </span>
                      <span className={`px-2 py-0.5 rounded-none font-bold text-[10px] shrink-0 border ${
                        isCorrect
                          ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 bg-neutral-100 dark:bg-neutral-800'
                          : 'border-neutral-400 text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800'
                      }`}>
                        {isCorrect ? 'CORRECT' : 'INCORRECT'}
                      </span>
                    </div>

                    <div className="space-y-1.5 my-3">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = userAnswer === optIdx;
                        const isAnswerKey = q.correctIndex === optIdx;

                        return (
                          <div
                            key={optIdx}
                            className={`p-2 rounded-sm border flex items-center justify-between text-xs ${
                              isAnswerKey
                                ? 'bg-neutral-100 dark:bg-neutral-800 border-emerald-600 text-emerald-800 dark:text-emerald-300 font-semibold'
                                : isSelected && !isCorrect
                                ? 'bg-neutral-100 dark:bg-neutral-800 border-neutral-400 text-neutral-800 dark:text-neutral-200'
                                : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-bold">{String.fromCharCode(65 + optIdx)}.</span>
                              <span>{opt}</span>
                            </div>
                            {isAnswerKey && (
                              <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase">Correct Answer</span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="p-3 rounded-sm bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      <strong className="text-emerald-700 dark:text-emerald-400">Lesson: </strong>
                      {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex justify-center">
              <button
                type="button"
                onClick={() => {
                  setQuizState('config');
                  setUserAnswers({});
                  setCurrentIndex(0);
                }}
                className="px-5 py-2.5 rounded-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 text-xs cursor-pointer"
              >
                [ Generate Another AI Quiz ]
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
