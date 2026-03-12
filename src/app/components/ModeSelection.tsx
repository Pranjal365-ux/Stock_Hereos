import { GraduationCap, TrendingUp } from 'lucide-react';

interface ModeSelectionProps {
  onSelectMode: (mode: 'beginner' | 'intermediate') => void;
}

export default function ModeSelection({ onSelectMode }: ModeSelectionProps) {
  return (
    <div className="screen-bg min-h-screen flex items-center justify-center p-6">
      <div className="ambient-orb w-80 h-80 bg-purple-700/25 top-[-5%] left-[-5%]" style={{position:'absolute'}} />
      <div className="ambient-orb w-64 h-64 bg-pink-900/20 bottom-[10%] right-[-5%]" style={{position:'absolute'}} />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10 animate-slide-up">
          <h1 className="display-title text-3xl mb-3">Choose Your Level</h1>
          <p style={{color:'rgba(223,182,178,0.6)'}}>Select your experience to get started</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => onSelectMode('beginner')}
            className="action-card action-card-purple w-full p-8 text-left animate-slide-up delay-100"
          >
            <div className="flex items-center gap-6">
              <div className="icon-container w-16 h-16 flex-shrink-0"
                style={{background:'rgba(168,85,247,0.2)', border:'1px solid rgba(168,85,247,0.35)'}}>
                <GraduationCap className="w-9 h-9" style={{color:'#c084fc'}} />
              </div>
              <div>
                <h2 className="text-white text-xl mb-1">Beginner</h2>
                <p style={{color:'rgba(223,182,178,0.6)', fontSize:'0.9rem'}}>New to stocks</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => onSelectMode('intermediate')}
            className="action-card action-card-pink w-full p-8 text-left animate-slide-up delay-200"
          >
            <div className="flex items-center gap-6">
              <div className="icon-container w-16 h-16 flex-shrink-0"
                style={{background:'rgba(236,72,153,0.2)', border:'1px solid rgba(236,72,153,0.35)'}}>
                <TrendingUp className="w-9 h-9" style={{color:'#f472b6'}} />
              </div>
              <div>
                <h2 className="text-white text-xl mb-1">Intermediate</h2>
                <p style={{color:'rgba(223,182,178,0.6)', fontSize:'0.9rem'}}>I know the basics</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
