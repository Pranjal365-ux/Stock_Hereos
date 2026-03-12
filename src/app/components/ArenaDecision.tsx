import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { getArenaById } from '../data/arenaData';

interface ArenaDecisionProps {
  arenaId: string;
  onSubmit: (investment: number, holdPeriod: number, confidence: number) => void;
  onBack: () => void;
}

export default function ArenaDecision({ arenaId, onSubmit, onBack }: ArenaDecisionProps) {
  const [investment, setInvestment] = useState(3000);
  const [holdPeriod, setHoldPeriod] = useState(2);
  const [confidence, setConfidence] = useState(3);

  const arena = getArenaById(arenaId);
  if (!arena) return null;

  return (
    <div className="screen-bg min-h-screen p-6">
      <div className="ambient-orb w-64 h-64 bg-purple-600/20 top-0 right-0" style={{position:'absolute'}} />

      <div className="mb-6 animate-slide-up relative z-10">
        <button onClick={onBack} className="back-btn mb-4">
          <ArrowLeft className="w-4 h-4" /><span>Back</span>
        </button>
        <h1 className="display-title text-2xl mb-2">Time Arena: {arena.company} – {arena.year}</h1>
        <p style={{color:'rgba(223,182,178,0.55)', fontSize:'0.9rem'}}>
          {arena.company === 'Apple' && "It's 2012. Apple just launched the iPhone 5..."}
          {arena.company === 'Tesla' && "It's 2016. Tesla is ramping up Model 3 production..."}
          {arena.company === 'Infosys' && "It's 2008. The global financial crisis is unfolding..."}
          {arena.company === 'Amazon' && "It's 2010. E-commerce is growing but still uncertain..."}
          {arena.company === 'Google' && "It's 2014. Mobile advertising is becoming dominant..."}
        </p>
      </div>

      {/* Scenario Card */}
      <div className="glass-card p-6 mb-5 text-center animate-slide-up delay-100 relative z-10">
        <div className="text-4xl mb-3" style={{filter:'drop-shadow(0 0 10px rgba(133,79,108,0.5))'}}>
          {arena.emoji}
        </div>
        <h3 className="text-white text-base mb-2">The Scenario</h3>
        <p style={{color:'rgba(223,182,178,0.65)', fontSize:'0.875rem', lineHeight:'1.6'}}>
          {arena.company === 'Apple' && `Apple's stock is at $${arena.startPrice}. The iPhone 5 just launched to mixed reviews. What's your move?`}
          {arena.company === 'Tesla' && `Tesla's stock is at $${arena.startPrice}. Production challenges ahead. What's your move?`}
          {arena.company === 'Infosys' && `Infosys stock is at ₹${arena.startPrice}. Markets are crashing globally. What's your move?`}
          {arena.company === 'Amazon' && `Amazon's stock is at $${arena.startPrice}. Retail is moving online but profitability is uncertain. What's your move?`}
          {arena.company === 'Google' && `Google's stock is at $${arena.startPrice}. Dominating search, expanding into mobile. What's your move?`}
        </p>
      </div>

      {/* Decision Form */}
      <div className="space-y-4 mb-6 relative z-10">
        {/* Investment */}
        <div className="glass-card p-5 animate-slide-up delay-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white text-sm">How much would you invest?</h3>
            <span className="shimmer-text text-base font-semibold">₹{investment.toLocaleString()}</span>
          </div>
          <input type="range" min="1000" max="10000" step="500" value={investment}
            onChange={(e) => setInvestment(Number(e.target.value))} className="w-full" />
          <div className="flex justify-between mt-2" style={{color:'rgba(223,182,178,0.45)', fontSize:'0.75rem'}}>
            <span>₹1,000</span><span>₹10,000</span>
          </div>
        </div>

        {/* Hold Period */}
        <div className="glass-card p-5 animate-slide-up delay-300">
          <h3 className="text-white text-sm mb-3">How long would you hold?</h3>
          <div className="grid grid-cols-4 gap-2">
            {[{label:'6M',value:0.5},{label:'1Y',value:1},{label:'2Y',value:2},{label:'5Y',value:5}].map(opt => (
              <button key={opt.value} onClick={() => setHoldPeriod(opt.value)}
                className="py-3 rounded-xl text-sm font-medium transition-all"
                style={{
                  background: holdPeriod === opt.value ? 'rgba(223,182,178,0.9)' : 'rgba(82,43,91,0.4)',
                  color: holdPeriod === opt.value ? '#190019' : 'rgba(223,182,178,0.7)',
                  border: holdPeriod === opt.value ? '1px solid rgba(251,228,216,0.5)' : '1px solid rgba(133,79,108,0.25)',
                  boxShadow: holdPeriod === opt.value ? '0 0 12px rgba(223,182,178,0.3)' : 'none'
                }}>
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Confidence */}
        <div className="glass-card p-5 animate-slide-up delay-400">
          <h3 className="text-white text-sm mb-3">How confident are you?</h3>
          <div className="grid grid-cols-5 gap-2">
            {[1,2,3,4,5].map(level => (
              <button key={level} onClick={() => setConfidence(level)}
                className="py-3 rounded-xl text-xl transition-all"
                style={{
                  background: confidence === level ? 'rgba(223,182,178,0.9)' : 'rgba(82,43,91,0.4)',
                  border: confidence === level ? '1px solid rgba(251,228,216,0.5)' : '1px solid rgba(133,79,108,0.25)',
                  boxShadow: confidence === level ? '0 0 12px rgba(223,182,178,0.3)' : 'none',
                  transform: confidence === level ? 'scale(1.05)' : 'scale(1)'
                }}>
                {level===1?'😰':level===2?'😐':level===3?'😊':level===4?'😎':'🚀'}
              </button>
            ))}
          </div>
          <div className="flex justify-between mt-2" style={{color:'rgba(223,182,178,0.45)', fontSize:'0.75rem'}}>
            <span>Not sure</span><span>Very confident</span>
          </div>
        </div>
      </div>

      <button onClick={() => onSubmit(investment, holdPeriod, confidence)}
        className="btn-primary w-full py-4 text-base relative z-10"
        style={{borderRadius:'1rem'}}>
        Lock My Decision
      </button>
    </div>
  );
}
