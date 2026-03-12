import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, Award } from 'lucide-react';

interface ArenaResultProps {
  profit: number;
  finalValue: number;
  returnPercent: number;
  points: number;
  lesson: string;
  holdPeriod: number;
  onContinue: () => void;
}

export default function ArenaResult({ profit, finalValue, returnPercent, points, lesson, holdPeriod, onContinue }: ArenaResultProps) {
  const isProfit = profit >= 0;
  const holdPeriodText = holdPeriod === 0.5 ? '6 months' : holdPeriod === 1 ? '1 year' : `${holdPeriod} years`;

  return (
    <div className="screen-bg min-h-screen flex flex-col p-6">
      <div className="ambient-orb w-80 h-80"
        style={{position:'absolute', top:'10%', left:'50%', transform:'translateX(-50%)',
          background: isProfit ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)'}} />

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="flex-1 flex flex-col items-center justify-center relative z-10"
      >
        <div className="text-8xl mb-5 animate-float" style={{filter:`drop-shadow(0 0 30px ${isProfit?'rgba(34,197,94,0.5)':'rgba(239,68,68,0.5)'})`}}>
          {isProfit ? '🎉' : '📉'}
        </div>
        <h1 className="display-title text-3xl text-center mb-2">
          {isProfit ? 'Great Decision!' : 'Tough Times!'}
        </h1>
        <p className="text-center mb-6" style={{color:'rgba(223,182,178,0.55)'}}>
          {isProfit ? 'You made a smart investment' : 'Markets can be unpredictable'}
        </p>

        {/* Results Card */}
        <div className="w-full max-w-md mb-5">
          <div className="balance-card p-8 text-center mb-4">
            <p className="mb-2" style={{color:'rgba(223,182,178,0.55)', fontSize:'0.85rem'}}>
              Your Result ({holdPeriodText})
            </p>
            <h2 className="text-4xl mb-1"
              style={{color: isProfit ? '#4ade80' : '#f87171',
                      filter:`drop-shadow(0 0 12px ${isProfit?'rgba(74,222,128,0.4)':'rgba(248,113,113,0.4)'})`}}>
              {isProfit ? '+' : ''}₹{profit.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </h2>
            <p style={{color: isProfit ? 'rgba(74,222,128,0.7)' : 'rgba(248,113,113,0.7)', fontSize:'0.9rem'}}>
              {isProfit ? '+' : ''}{returnPercent}% return
            </p>
            <p className="mt-2" style={{color:'rgba(223,182,178,0.45)', fontSize:'0.8rem'}}>
              Final Value: ₹{finalValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </p>
          </div>

          {/* Points */}
          <div className="glass-card p-4 flex items-center justify-between mb-4"
            style={{background: isProfit ? 'rgba(82,43,91,0.5)' : 'rgba(30,30,50,0.5)'}}>
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5" style={{color:'#fbbf24'}} />
              <span className="text-white text-sm">Points Earned</span>
            </div>
            <span className="text-xl font-bold" style={{color:'#fbbf24'}}>+{points}</span>
          </div>

          {/* Lesson */}
          <div className="glass-card p-5"
            style={{borderColor: isProfit ? 'rgba(249,115,22,0.3)' : 'rgba(59,130,246,0.3)'}}>
            <div className="flex items-start gap-4">
              <div className="icon-container w-10 h-10 flex-shrink-0"
                style={{background: isProfit ? 'rgba(249,115,22,0.2)' : 'rgba(59,130,246,0.2)'}}>
                {isProfit ? <TrendingUp className="w-5 h-5" style={{color:'#fb923c'}} /> 
                          : <TrendingDown className="w-5 h-5" style={{color:'#60a5fa'}} />}
              </div>
              <div>
                <h3 className="text-white text-sm mb-1">Lesson Learned</h3>
                <p style={{color:'rgba(223,182,178,0.65)', fontSize:'0.85rem', lineHeight:'1.5'}}>{lesson}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <button onClick={onContinue}
        className="btn-primary w-full py-4 text-base relative z-10"
        style={{borderRadius:'1rem'}}>
        Continue Learning
      </button>
    </div>
  );
}
