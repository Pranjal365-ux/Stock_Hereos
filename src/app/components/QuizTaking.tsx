import { useState, useEffect } from 'react';
import { ArrowLeft, Clock, CheckCircle, XCircle } from 'lucide-react';
import { getQuizById } from '../data/quizzesData';

interface QuizTakingProps {
  quizId: string;
  onComplete: (score: number, totalQuestions: number, pointsEarned: number) => void;
  onBack: () => void;
}

export default function QuizTaking({ quizId, onComplete, onBack }: QuizTakingProps) {
  const quiz = getQuizById(quizId);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(quiz?.timeLimit || 0);

  useEffect(() => {
    if (!quiz || timeRemaining <= 0) return;
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) { handleQuizComplete(); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeRemaining, quiz]);

  if (!quiz) return (
    <div className="screen-bg min-h-screen flex items-center justify-center">
      <p className="text-white">Quiz not found</p>
    </div>
  );

  const handleQuizComplete = () => {
    const pointsEarned = Math.floor((score / quiz.questions.length) * quiz.points);
    onComplete(score, quiz.questions.length, pointsEarned);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    if (selectedAnswer === quiz.questions[currentQuestion].correctAnswer) {
      setScore(s => s + 1);
    }
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(q => q + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      handleQuizComplete();
    }
  };

  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;
  const formatTime = (s: number) => `${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}`;
  const isLow = timeRemaining < 30;

  return (
    <div className="screen-bg min-h-screen p-6">
      <div className="ambient-orb w-64 h-64 bg-purple-700/15 top-0 right-0" style={{position:'absolute'}} />

      {/* Header */}
      <div className="mb-5 animate-slide-up relative z-10">
        <button onClick={onBack} className="back-btn mb-4">
          <ArrowLeft className="w-4 h-4" /><span>Back</span>
        </button>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-white text-base">{quiz.title}</h2>
            <p style={{color:'rgba(223,182,178,0.55)', fontSize:'0.8rem'}}>
              Question {currentQuestion + 1} of {quiz.questions.length}
            </p>
          </div>
          <div className="glass-card px-4 py-2 flex items-center gap-2">
            <Clock className="w-4 h-4" style={{color: isLow ? '#f87171' : '#fbbf24'}} />
            <span className="text-lg font-semibold" style={{color: isLow ? '#f87171' : '#fff'}}>
              {formatTime(timeRemaining)}
            </span>
          </div>
        </div>
        <div className="progress-track w-full h-2">
          <div className="progress-fill h-full" style={{width:`${progress}%`}} />
        </div>
      </div>

      {/* Question */}
      <div className="glass-card p-6 mb-5 animate-scale-in relative z-10">
        <h3 className="text-white text-base mb-5 leading-relaxed">{question.question}</h3>
        <div className="space-y-2">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === question.correctAnswer;
            const showCorrect = showExplanation && isCorrect;
            const showWrong = showExplanation && isSelected && !isCorrect;

            let cls = 'quiz-option';
            if (showCorrect) cls = 'quiz-option-correct';
            else if (showWrong) cls = 'quiz-option-wrong';
            else if (isSelected) cls = 'quiz-option-selected';

            return (
              <button key={index} onClick={() => handleAnswerSelect(index)}
                disabled={showExplanation}
                className={`${cls} w-full p-3.5 text-left`}
                style={{cursor: showExplanation ? 'default' : 'pointer'}}>
                <div className="flex items-center justify-between">
                  <span style={{fontSize:'0.9rem'}}>{option}</span>
                  {showCorrect && <CheckCircle className="w-4 h-4 flex-shrink-0" style={{color:'#4ade80'}} />}
                  {showWrong && <XCircle className="w-4 h-4 flex-shrink-0" style={{color:'#f87171'}} />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div className="glass-card p-5 mb-5 animate-scale-in relative z-10"
          style={{borderColor: selectedAnswer === question.correctAnswer ? 'rgba(34,197,94,0.4)' : 'rgba(239,68,68,0.4)',
                  background: selectedAnswer === question.correctAnswer ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)'}}>
          <div className="flex items-start gap-3 mb-2">
            {selectedAnswer === question.correctAnswer
              ? <CheckCircle className="w-5 h-5 flex-shrink-0" style={{color:'#4ade80'}} />
              : <XCircle className="w-5 h-5 flex-shrink-0" style={{color:'#f87171'}} />}
            <h3 className="text-white text-sm">
              {selectedAnswer === question.correctAnswer ? 'Correct!' : 'Incorrect'}
            </h3>
          </div>
          <p style={{color:'rgba(240,230,255,0.7)', fontSize:'0.85rem', lineHeight:'1.5'}}>
            {question.explanation}
          </p>
        </div>
      )}

      {/* Action */}
      {!showExplanation ? (
        <button onClick={handleSubmitAnswer} disabled={selectedAnswer === null}
          className="btn-primary w-full py-4 text-base relative z-10"
          style={{borderRadius:'1rem', opacity: selectedAnswer === null ? 0.4 : 1}}>
          Submit Answer
        </button>
      ) : (
        <button onClick={handleNextQuestion}
          className="btn-primary w-full py-4 text-base relative z-10"
          style={{borderRadius:'1rem'}}>
          {currentQuestion < quiz.questions.length - 1 ? 'Next Question →' : 'Finish Quiz'}
        </button>
      )}

      {/* Score */}
      <div className="mt-4 glass-card p-3 text-center relative z-10">
        <p style={{color:'rgba(223,182,178,0.5)', fontSize:'0.75rem', marginBottom:'0.2rem'}}>Current Score</p>
        <p className="text-white text-xl font-semibold">{score} / {currentQuestion + (showExplanation ? 1 : 0)}</p>
      </div>
    </div>
  );
}
