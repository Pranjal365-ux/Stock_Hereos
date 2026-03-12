import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface LearningModuleProps {
  onComplete: () => void;
}

const learningCards = [
  { title: 'What is a Stock?', content: 'A stock means owning a small part of a company.', color: 'from-blue-600 to-blue-800', glow: 'rgba(59,130,246,0.4)', icon: '🏢' },
  { title: 'Risk vs Reward', content: 'Higher potential returns often come with higher risks.', color: 'from-purple-600 to-purple-800', glow: 'rgba(147,51,234,0.4)', icon: '⚖️' },
  { title: 'Why Markets Move', content: 'Markets move based on company performance, news, and economic factors.', color: 'from-pink-600 to-pink-800', glow: 'rgba(236,72,153,0.4)', icon: '📈' },
];

export default function LearningModule({ onComplete }: LearningModuleProps) {
  const [currentCard, setCurrentCard] = useState(0);

  const nextCard = () => {
    if (currentCard < learningCards.length - 1) setCurrentCard(currentCard + 1);
    else onComplete();
  };

  const prevCard = () => { if (currentCard > 0) setCurrentCard(currentCard - 1); };

  const card = learningCards[currentCard];

  return (
    <div className="screen-bg min-h-screen flex flex-col p-6">
      <div className="ambient-orb w-72 h-72 bg-purple-700/20 top-0 left-0" style={{position:'absolute'}} />

      {/* Tutor speech */}
      <div className="mb-6 mt-4 animate-slide-up relative z-10">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
            style={{background:'linear-gradient(135deg,rgba(234,179,8,0.3),rgba(249,115,22,0.3))', border:'1px solid rgba(234,179,8,0.35)'}}>
            👨‍🏫
          </div>
          <div className="glass-card flex-1 p-4">
            <p style={{color:'rgba(240,230,255,0.85)', fontSize:'0.95rem'}}>{card.content}</p>
          </div>
        </div>
      </div>

      {/* Learning Card */}
      <div className="flex-1 flex items-center justify-center mb-6 relative z-10">
        <div key={currentCard} className="w-full max-w-md animate-scale-in">
          <div className={`bg-gradient-to-br ${card.color} rounded-3xl p-8 text-center`}
            style={{boxShadow:`0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${card.glow}`, border:'1px solid rgba(255,255,255,0.1)'}}>
            <div className="text-6xl mb-5">{card.icon}</div>
            <h2 className="text-white text-2xl mb-4">{card.title}</h2>
            <p style={{color:'rgba(255,255,255,0.85)', fontSize:'1.05rem', lineHeight:'1.6'}}>{card.content}</p>
          </div>
        </div>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center gap-2 mb-5 relative z-10">
        {learningCards.map((_, i) => (
          <div key={i} className="transition-all duration-300 rounded-full"
            style={{
              width: i === currentCard ? '2rem' : '0.5rem',
              height: '0.5rem',
              background: i === currentCard ? 'rgba(251,228,216,0.9)' : 'rgba(133,79,108,0.4)',
              boxShadow: i === currentCard ? '0 0 8px rgba(251,228,216,0.5)' : 'none'
            }} />
        ))}
      </div>

      {/* Navigation */}
      <div className="flex gap-3 relative z-10">
        <button onClick={prevCard} disabled={currentCard === 0}
          className="btn-ghost flex-1 py-4 flex items-center justify-center"
          style={{opacity: currentCard === 0 ? 0.3 : 1}}>
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={nextCard} className="btn-primary flex-1 py-4 flex items-center justify-center text-base"
          style={{borderRadius:'1rem'}}>
          {currentCard === learningCards.length - 1 ? 'Continue' : <ChevronRight className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}
