import { useState } from 'react';

interface QuizScreenProps {
  onComplete: () => void;
}

const quizData = {
  question: 'Why do stock prices usually go up?',
  options: [
    'Company grows and profits increase',
    'More people are buying stocks',
    'The economy is doing well',
    'All of the above',
  ],
  correctAnswer: 3,
};

export default function QuizScreen({ onComplete }: QuizScreenProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      setIsSubmitted(true);
      setTimeout(() => onComplete(), 1500);
    }
  };

  return (
    <div className="screen-bg min-h-screen flex flex-col p-6">
      {/* Progress Bar */}
      <div className="mb-8 mt-4 animate-slide-up relative z-10">
        <div className="flex items-center justify-between mb-2">
          <span style={{color:'rgba(223,182,178,0.7)', fontSize:'0.85rem'}}>Question 1 of 3</span>
          <span style={{color:'rgba(223,182,178,0.7)', fontSize:'0.85rem'}}>33%</span>
        </div>
        <div className="progress-track w-full h-2">
          <div className="progress-fill h-full" style={{width:'33%'}} />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col justify-center relative z-10">
        <div className="glass-card p-8 mb-6 text-center animate-scale-in">
          <div className="text-4xl mb-4">💡</div>
          <h2 className="text-white text-xl mb-3">Quick Quiz</h2>
          <p style={{color:'rgba(240,230,255,0.85)', fontSize:'1.05rem', lineHeight:'1.6'}}>
            {quizData.question}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {quizData.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === quizData.correctAnswer;
            const showResult = isSubmitted && isSelected;

            let cls = 'quiz-option';
            if (showResult && isCorrect)  cls = 'quiz-option-correct';
            else if (showResult && !isCorrect) cls = 'quiz-option-wrong';
            else if (isSelected) cls = 'quiz-option-selected';

            return (
              <button key={index} onClick={() => !isSubmitted && setSelectedAnswer(index)}
                disabled={isSubmitted}
                className={`${cls} w-full p-4 text-left animate-slide-up`}
                style={{animationDelay:`${index * 0.07}s`}}>
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                    style={{borderColor: isSelected ? 'rgba(223,182,178,0.7)' : 'rgba(133,79,108,0.4)'}}>
                    {isSelected && <div className="w-3 h-3 rounded-full" style={{background:'rgba(251,228,216,0.9)'}} />}
                  </div>
                  <span style={{fontSize:'0.95rem'}}>{option}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Submit */}
      <button onClick={handleSubmit} disabled={selectedAnswer === null || isSubmitted}
        className="btn-primary w-full py-4 text-base relative z-10"
        style={{borderRadius:'1rem', opacity: selectedAnswer === null || isSubmitted ? 0.45 : 1}}>
        {isSubmitted ? 'Correct! 🎉' : 'Submit Answer'}
      </button>
    </div>
  );
}
