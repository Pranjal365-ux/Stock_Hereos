import { Trophy, Star, TrendingUp, Home } from 'lucide-react';

interface QuizResultProps {
  score: number;
  totalQuestions: number;
  pointsEarned: number;
  quizTitle: string;
  onContinue: () => void;
  onRetry: () => void;
}

export default function QuizResult({ score, totalQuestions, pointsEarned, quizTitle, onContinue, onRetry }: QuizResultProps) {
  const percentage = (score / totalQuestions) * 100;

  const getPerf = () => {
    if (percentage === 100) return { title:'🎉 Perfect Score!', msg:"You're a stock market genius!", color:'#fbbf24', glow:'rgba(251,191,36,0.4)' };
    if (percentage >= 80)  return { title:'🌟 Excellent!',     msg:'Outstanding performance!',      color:'#4ade80', glow:'rgba(74,222,128,0.4)' };
    if (percentage >= 60)  return { title:'👍 Good Job!',      msg:"You're getting the hang of it!", color:'#60a5fa', glow:'rgba(96,165,250,0.4)' };
    if (percentage >= 40)  return { title:'📚 Keep Learning!', msg:'Practice makes perfect!',        color:'#fb923c', glow:'rgba(249,115,22,0.4)' };
    return                        { title:'💪 Try Again!',     msg:"Don't give up!",                 color:'#a855f7', glow:'rgba(168,85,247,0.4)' };
  };

  const perf = getPerf();

  return (
    <div className="screen-bg min-h-screen p-6 flex flex-col items-center justify-center">
      <div className="ambient-orb w-80 h-80"
        style={{position:'absolute', top:'15%', left:'50%', transform:'translateX(-50%)', background:`${perf.glow}`}} />

      <div className="w-full max-w-md relative z-10">
        {/* Score Circle */}
        <div className="glass-card p-8 mb-5 text-center animate-scale-in">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full flex flex-col items-center justify-center"
            style={{background:`conic-gradient(${perf.color} 0%, ${perf.color} ${percentage}%, rgba(82,43,91,0.3) ${percentage}%)`,
                    boxShadow:`0 0 30px ${perf.glow}`}}>
            <div className="w-24 h-24 rounded-full flex flex-col items-center justify-center"
              style={{background:'rgba(13,0,16,0.9)'}}>
              <div className="text-white text-2xl font-bold">{percentage.toFixed(0)}%</div>
              <div style={{color:'rgba(223,182,178,0.6)', fontSize:'0.7rem'}}>Score</div>
            </div>
          </div>

          <h2 className="text-white text-xl mb-1">{perf.title}</h2>
          <p className="mb-6" style={{color:'rgba(223,182,178,0.6)', fontSize:'0.9rem'}}>{perf.msg}</p>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="p-4 rounded-xl" style={{background:'rgba(82,43,91,0.4)', border:'1px solid rgba(133,79,108,0.2)'}}>
              <p style={{color:'rgba(223,182,178,0.5)', fontSize:'0.75rem', marginBottom:'0.3rem'}}>Correct Answers</p>
              <p className="text-white text-2xl font-semibold">{score}/{totalQuestions}</p>
            </div>
            <div className="p-4 rounded-xl" style={{background:'rgba(234,179,8,0.1)', border:'1px solid rgba(234,179,8,0.25)'}}>
              <p style={{color:'rgba(252,211,77,0.7)', fontSize:'0.75rem', marginBottom:'0.3rem'}}>Points Earned</p>
              <div className="flex items-center justify-center gap-1">
                <Trophy className="w-4 h-4" style={{color:'#fbbf24'}} />
                <p style={{color:'#fcd34d'}} className="text-2xl font-semibold">+{pointsEarned}</p>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl" style={{background:'rgba(133,79,108,0.15)', border:'1px solid rgba(133,79,108,0.2)'}}>
            <p style={{color:'rgba(223,182,178,0.6)', fontSize:'0.8rem'}}>Quiz: {quizTitle}</p>
          </div>
        </div>

        {/* Perfect achievement */}
        {percentage === 100 && (
          <div className="glass-card p-5 mb-4 text-center animate-scale-in delay-200"
            style={{borderColor:'rgba(234,179,8,0.5)', background:'rgba(234,179,8,0.1)'}}>
            <Star className="w-10 h-10 text-yellow-400 mx-auto mb-2" style={{filter:'drop-shadow(0 0 8px rgba(234,179,8,0.6))'}} />
            <h3 className="text-white text-sm mb-0.5">🏆 Achievement Unlocked!</h3>
            <p style={{color:'rgba(252,211,77,0.7)', fontSize:'0.8rem'}}>Perfect Score Master</p>
          </div>
        )}

        {percentage >= 80 && (
          <div className="glass-card p-5 mb-4 animate-slide-up delay-300">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-6 h-6 flex-shrink-0" style={{color:'#4ade80'}} />
              <div>
                <h3 className="text-white text-sm mb-1">Keep it up!</h3>
                <p style={{color:'rgba(223,182,178,0.55)', fontSize:'0.8rem'}}>
                  You're showing great understanding of stock market concepts. Keep learning to reach the top!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="space-y-3 animate-slide-up delay-400">
          <button onClick={onContinue}
            className="btn-primary w-full py-4 flex items-center justify-center gap-2 text-base"
            style={{borderRadius:'1rem'}}>
            <Home className="w-5 h-5" />Back to Dashboard
          </button>
          <button onClick={onRetry} className="btn-ghost w-full py-4 text-base" style={{borderRadius:'1rem'}}>
            Try Another Quiz
          </button>
        </div>

        {percentage < 80 && (
          <div className="mt-5 glass-card p-4" style={{borderColor:'rgba(249,115,22,0.25)'}}>
            <h3 className="text-white text-sm mb-1">💡 Study Tip</h3>
            <p style={{color:'rgba(223,182,178,0.6)', fontSize:'0.8rem'}}>
              Review the explanations for questions you missed. Understanding why answers are correct helps build stronger knowledge!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
