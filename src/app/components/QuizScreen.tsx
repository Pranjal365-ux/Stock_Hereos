import { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface QuizScreenProps {
  onComplete: (cashEarned: number) => void;
}

const questions = [
  {
    question: 'Why do stock prices usually go up?',
    options: ['Company grows and profits increase', 'More people are buying stocks', 'The economy is doing well', 'All of the above'],
    correctAnswer: 3,
    explanation: 'All three factors contribute — company growth, increased demand, and a healthy economy all push prices up.',
  },
  {
    question: 'What does it mean to "diversify" your portfolio?',
    options: ['Put all money in one stock', 'Invest in many different assets', 'Only buy government bonds', 'Trade every day'],
    correctAnswer: 1,
    explanation: 'Diversification means spreading investments across different assets to reduce risk.',
  },
  {
    question: 'What is a P/E ratio used for?',
    options: ['Measuring a company\'s debt', 'Valuing a stock relative to earnings', 'Tracking dividend payments', 'Calculating tax on gains'],
    correctAnswer: 1,
    explanation: 'The Price-to-Earnings ratio compares a stock\'s price to its earnings per share — a key valuation metric.',
  },
];

const CASH_PER_CORRECT = 10000;

export default function QuizScreen({ onComplete }: QuizScreenProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const question = questions[currentQ];
  const progress = ((currentQ + 1) / questions.length) * 100;
  const isCorrect = isSubmitted && selectedAnswer === question.correctAnswer;

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    const correct = selectedAnswer === question.correctAnswer;
    setIsSubmitted(true);
    if (correct) setCorrectCount(c => c + 1);
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(q => q + 1);
      setSelectedAnswer(null);
      setIsSubmitted(false);
    } else {
      const total = correctCount + (selectedAnswer === question.correctAnswer ? 1 : 0);
      onComplete(total * CASH_PER_CORRECT);
    }
  };

  return (
    <div className="screen-bg min-h-screen flex flex-col p-6">
      {/* Progress */}
      <div className="mb-8 mt-4 animate-slide-up relative z-10">
        <div className="flex items-center justify-between mb-2">
          <span style={{color:'rgba(223,182,178,0.7)', fontSize:'0.85rem'}}>Question {currentQ + 1} of {questions.length}</span>
          <span style={{color:'rgba(223,182,178,0.7)', fontSize:'0.85rem'}}>{Math.round(progress)}%</span>
        </div>
        <div className="progress-track w-full h-2">
          <div className="progress-fill h-full transition-all duration-500" style={{width:`${progress}%`}} />
        </div>
        <p className="text-right mt-1" style={{color:'rgba(74,222,128,0.7)', fontSize:'0.75rem'}}>
          💰 ₹{CASH_PER_CORRECT.toLocaleString('en-IN')} per correct answer
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-center relative z-10">
        <div className="glass-card p-8 mb-6 text-center animate-scale-in">
          <div className="text-4xl mb-4">💡</div>
          <h2 className="text-white text-xl mb-3">Quick Quiz</h2>
          <p style={{color:'rgba(240,230,255,0.85)', fontSize:'1.05rem', lineHeight:'1.6'}}>
            {question.question}
          </p>
        </div>

        <div className="space-y-3 mb-4">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isRightAnswer = index === question.correctAnswer;
            const showCorrect = isSubmitted && isRightAnswer;
            const showWrong = isSubmitted && isSelected && !isRightAnswer;

            let cls = 'quiz-option';
            if (showCorrect) cls = 'quiz-option-correct';
            else if (showWrong) cls = 'quiz-option-wrong';
            else if (isSelected) cls = 'quiz-option-selected';

            return (
              <button key={index} onClick={() => !isSubmitted && setSelectedAnswer(index)}
                disabled={isSubmitted}
                className={`${cls} w-full p-4 text-left`}
                style={{cursor: isSubmitted ? 'default' : 'pointer'}}>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                      style={{borderColor: isSelected ? 'rgba(223,182,178,0.7)' : 'rgba(133,79,108,0.4)'}}>
                      {isSelected && !isSubmitted && <div className="w-3 h-3 rounded-full" style={{background:'rgba(251,228,216,0.9)'}} />}
                    </div>
                    <span style={{fontSize:'0.95rem'}}>{option}</span>
                  </div>
                  {showCorrect && <CheckCircle className="w-4 h-4 flex-shrink-0" style={{color:'#4ade80'}} />}
                  {showWrong && <XCircle className="w-4 h-4 flex-shrink-0" style={{color:'#f87171'}} />}
                </div>
              </button>
            );
          })}
        </div>

        {isSubmitted && (
          <div className="glass-card p-4 mb-4 animate-scale-in"
            style={{borderColor: isCorrect ? 'rgba(34,197,94,0.4)' : 'rgba(239,68,68,0.4)', background: isCorrect ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)'}}>
            <p className="text-white font-semibold text-sm mb-1">
              {isCorrect ? `✅ Correct! +₹${CASH_PER_CORRECT.toLocaleString('en-IN')} added!` : '❌ Not quite!'}
            </p>
            <p style={{color:'rgba(240,230,255,0.6)', fontSize:'0.8rem'}}>{question.explanation}</p>
          </div>
        )}
      </div>

      {!isSubmitted ? (
        <button onClick={handleSubmit} disabled={selectedAnswer === null}
          className="btn-primary w-full py-4 text-base relative z-10"
          style={{borderRadius:'1rem', opacity: selectedAnswer === null ? 0.45 : 1}}>
          Submit Answer
        </button>
      ) : (
        <button onClick={handleNext}
          className="btn-primary w-full py-4 text-base relative z-10"
          style={{borderRadius:'1rem'}}>
          {currentQ < questions.length - 1 ? 'Next Question →' : 'Finish Quiz 🎉'}
        </button>
      )}
    </div>
  );
}
