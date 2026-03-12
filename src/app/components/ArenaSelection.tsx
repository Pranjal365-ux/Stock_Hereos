import { ArrowLeft, Star } from 'lucide-react';
import { arenaDatabase } from '../data/arenaData';

interface ArenaSelectionProps {
  onSelectArena: (arena: string) => void;
  onBack: () => void;
}

export default function ArenaSelection({ onSelectArena, onBack }: ArenaSelectionProps) {
  return (
    <div className="screen-bg min-h-screen p-6">
      <div className="ambient-orb w-72 h-72 bg-purple-600/20 top-0 right-0" style={{position:'absolute'}} />

      <div className="mb-6 animate-slide-up relative z-10">
        <button onClick={onBack} className="back-btn mb-4">
          <ArrowLeft className="w-4 h-4" /><span>Back</span>
        </button>
        <h1 className="display-title text-3xl mb-1">Time Arenas</h1>
        <p style={{color:'rgba(223,182,178,0.55)'}}>Travel back in time and test your investment skills</p>
      </div>

      <div className="grid grid-cols-1 gap-3 relative z-10">
        {arenaDatabase.map((arena, i) => (
          <button
            key={arena.id}
            onClick={() => onSelectArena(arena.id)}
            className="action-card action-card-purple p-5 text-left animate-slide-up"
            style={{animationDelay:`${i * 0.07}s`}}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-4">
                <div className="text-3xl" style={{filter:'drop-shadow(0 0 8px rgba(133,79,108,0.5))'}}>
                  {arena.emoji}
                </div>
                <div>
                  <h3 className="text-white text-base mb-0.5">{arena.company}</h3>
                  <p style={{color:'rgba(223,182,178,0.5)', fontSize:'0.8rem'}}>{arena.year}</p>
                </div>
              </div>
              <div className="flex gap-1">
                {[...Array(3)].map((_, j) => (
                  <Star key={j} className="w-4 h-4"
                    style={{color: j < arena.difficulty ? '#fbbf24' : 'rgba(133,79,108,0.3)',
                            fill: j < arena.difficulty ? '#fbbf24' : 'transparent'}} />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="badge" style={{background:'rgba(82,43,91,0.5)', color:'rgba(223,182,178,0.8)', border:'1px solid rgba(133,79,108,0.3)'}}>
                {arena.difficulty === 1 ? 'Easy' : arena.difficulty === 2 ? 'Medium' : 'Hard'}
              </span>
              <span className="badge" style={{background:'rgba(82,43,91,0.5)', color:'rgba(223,182,178,0.8)', border:'1px solid rgba(133,79,108,0.3)'}}>
                Historical Scenario
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
