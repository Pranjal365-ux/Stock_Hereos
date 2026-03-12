import { Trophy, Star, TrendingUp, TrendingUpIcon } from 'lucide-react';

interface SplashScreenProps {
  onStartLearning: () => void;
}

export default function SplashScreen({ onStartLearning }: SplashScreenProps) {
  return (
    <div className="screen-bg min-h-screen flex items-center justify-center p-6">
      {/* Ambient orbs */}
      <div className="ambient-orb w-96 h-96 bg-purple-600/30 top-[-10%] right-[-10%]" style={{position:'absolute'}} />
      <div className="ambient-orb w-72 h-72 bg-pink-800/20 bottom-[-5%] left-[-5%]" style={{position:'absolute'}} />

      <div className="w-full max-w-md animate-scale-in relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="animate-float relative">
            <div className="w-24 h-24 rounded-3xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #854F6C 0%, #522B5B 60%, #2B124C 100%)',
                boxShadow: '0 0 40px rgba(133,79,108,0.6), 0 0 80px rgba(133,79,108,0.2), inset 0 1px 0 rgba(255,255,255,0.15)',
                border: '1px solid rgba(223,182,178,0.25)'
              }}>
              <TrendingUpIcon className="w-12 h-12 text-white" style={{filter:'drop-shadow(0 0 8px rgba(251,228,216,0.8))'}} />
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="display-title text-center text-4xl mb-3">Stock Heroes</h1>

        {/* Tagline */}
        <p className="text-center mb-10" style={{color:'rgba(223,182,178,0.7)', letterSpacing:'0.04em'}}>
          Learn stocks. Play smart. Invest confidently.
        </p>

        {/* Feature Cards */}
        <div className="glass-card p-6 mb-8 space-y-5">
          {[
            { icon: <Trophy className="w-5 h-5 text-yellow-300" />, bg: 'rgba(234,179,8,0.2)', border: 'rgba(234,179,8,0.3)',
              title: 'Gamified Learning', desc: 'Earn rewards as you master stocks' },
            { icon: <Star className="w-5 h-5 text-pink-300" />, bg: 'rgba(236,72,153,0.2)', border: 'rgba(236,72,153,0.3)',
              title: 'Beginner Friendly', desc: 'Start with zero knowledge required' },
            { icon: <TrendingUp className="w-5 h-5 text-emerald-300" />, bg: 'rgba(52,211,153,0.2)', border: 'rgba(52,211,153,0.3)',
              title: 'Real-World Skills', desc: 'Apply what you learn immediately' },
          ].map((f, i) => (
            <div key={i} className={`flex items-start gap-4 animate-slide-up delay-${(i+1)*100}`}>
              <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center"
                style={{background: f.bg, border:`1px solid ${f.border}`}}>
                {f.icon}
              </div>
              <div>
                <h3 className="text-white text-base mb-0.5">{f.title}</h3>
                <p style={{color:'rgba(223,182,178,0.6)', fontSize:'0.85rem'}}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={onStartLearning}
          className="btn-primary w-full py-4 text-lg mb-4 animate-slide-up delay-400"
          style={{borderRadius:'1rem'}}
        >
          Start Learning
        </button>

        <p className="text-center animate-slide-up delay-500" style={{color:'rgba(133,79,108,0.8)', fontSize:'0.8rem'}}>
          Join 10,000+ heroes learning to invest
        </p>
      </div>
    </div>
  );
}
