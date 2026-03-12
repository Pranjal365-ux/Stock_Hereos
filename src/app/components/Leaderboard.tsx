import { ArrowLeft, Trophy, Medal, Award } from 'lucide-react';

interface LeaderboardProps {
  onBack: () => void;
}

const topUsers = [
  { rank: 1, name: 'Rahul K.',  points: 2850, avatar: '🦸',   badge: 'Master' },
  { rank: 2, name: 'Priya S.',  points: 2640, avatar: '👩‍💼', badge: 'Expert' },
  { rank: 3, name: 'Amit T.',   points: 2420, avatar: '👨‍💻', badge: 'Expert' },
  { rank: 4, name: 'Sneha M.',  points: 2180, avatar: '👩‍🎓', badge: 'Advanced' },
  { rank: 5, name: 'Vikram P.', points: 1950, avatar: '🧑‍💼', badge: 'Advanced' },
  { rank: 6, name: 'Anjali R.', points: 1820, avatar: '👩‍🔬', badge: 'Advanced' },
  { rank: 7, name: 'Karan D.',  points: 1650, avatar: '👨‍🎓', badge: 'Intermediate' },
  { rank: 8, name: 'You',       points: 450,  avatar: '👤',   badge: 'Beginner' },
];

export default function Leaderboard({ onBack }: LeaderboardProps) {
  return (
    <div className="screen-bg min-h-screen p-6">
      <div className="ambient-orb w-80 h-80 bg-yellow-700/15 top-0 right-0" style={{position:'absolute'}} />

      {/* Header */}
      <div className="mb-6 animate-slide-up relative z-10">
        <button onClick={onBack} className="back-btn mb-4">
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <h1 className="display-title text-3xl mb-1">Leaderboard</h1>
        <p style={{color:'rgba(223,182,178,0.55)'}}>Compete. Learn. Grow.</p>
      </div>

      {/* Top 3 Podium */}
      <div className="mb-6 animate-slide-up delay-100 relative z-10">
        <div className="flex items-end justify-center gap-3 mb-4">
          {/* 2nd */}
          <div className="flex-1 text-center">
            <div className="glass-card p-4 mb-2">
              <div className="text-3xl mb-2">{topUsers[1].avatar}</div>
              <Medal className="w-6 h-6 mx-auto mb-1" style={{color:'#b8c8d8'}} />
              <h4 className="text-white text-sm mb-0.5">{topUsers[1].name}</h4>
              <p style={{color:'rgba(184,200,216,0.8)', fontSize:'0.75rem'}}>{topUsers[1].points} pts</p>
            </div>
            <div className="h-16 podium-silver rounded-t-xl flex items-center justify-center">
              <span className="text-white text-xl font-bold">2</span>
            </div>
          </div>

          {/* 1st */}
          <div className="flex-1 text-center">
            <div className="glass-card p-4 mb-2" style={{boxShadow:'0 0 30px rgba(245,200,66,0.3), 0 8px 32px rgba(0,0,0,0.6)'}}>
              <div className="text-3xl mb-2">{topUsers[0].avatar}</div>
              <Trophy className="w-6 h-6 mx-auto mb-1" style={{color:'#fcd34d'}} />
              <h4 className="text-white text-sm mb-0.5">{topUsers[0].name}</h4>
              <p style={{color:'rgba(252,211,77,0.9)', fontSize:'0.75rem'}}>{topUsers[0].points} pts</p>
            </div>
            <div className="h-24 podium-gold rounded-t-xl flex items-center justify-center">
              <span className="text-white text-xl font-bold">1</span>
            </div>
          </div>

          {/* 3rd */}
          <div className="flex-1 text-center">
            <div className="glass-card p-4 mb-2">
              <div className="text-3xl mb-2">{topUsers[2].avatar}</div>
              <Award className="w-6 h-6 mx-auto mb-1" style={{color:'#cd7f32'}} />
              <h4 className="text-white text-sm mb-0.5">{topUsers[2].name}</h4>
              <p style={{color:'rgba(205,127,50,0.8)', fontSize:'0.75rem'}}>{topUsers[2].points} pts</p>
            </div>
            <div className="h-12 podium-bronze rounded-t-xl flex items-center justify-center">
              <span className="text-white text-xl font-bold">3</span>
            </div>
          </div>
        </div>
      </div>

      {/* Rankings */}
      <div className="glass-card p-5 mb-4 animate-slide-up delay-200 relative z-10">
        <h3 className="text-white text-base mb-4">All Rankings</h3>
        <div className="space-y-2">
          {topUsers.map((user, i) => {
            const isYou = user.name === 'You';
            return (
              <div key={i} className={isYou ? 'lb-row-you p-3 rounded-2xl' : 'lb-row p-3 rounded-2xl'}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{background: isYou ? 'rgba(255,255,255,0.15)' : 'rgba(82,43,91,0.5)',
                            color: isYou ? '#FBE4D8' : 'rgba(223,182,178,0.7)'}}>
                    {user.rank}
                  </div>
                  <div className="text-2xl">{user.avatar}</div>
                  <div className="flex-1">
                    <h4 className="text-white text-sm">{user.name}</h4>
                    <p style={{color: isYou ? 'rgba(251,228,216,0.65)' : 'rgba(223,182,178,0.5)', fontSize:'0.75rem'}}>
                      {user.badge}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-white text-sm font-semibold">{user.points}</p>
                    <p style={{color:'rgba(223,182,178,0.5)', fontSize:'0.7rem'}}>points</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Motivation */}
      <div className="glass-card p-5 animate-slide-up delay-300 relative z-10"
        style={{borderColor:'rgba(249,115,22,0.3)'}}>
        <h3 className="text-white text-sm mb-1">🎯 Keep Going!</h3>
        <p style={{color:'rgba(223,182,178,0.6)', fontSize:'0.8rem'}}>
          Complete more challenges and quizzes to climb the leaderboard.
          You're just {topUsers[6].points - topUsers[7].points} points away from the next rank!
        </p>
      </div>
    </div>
  );
}
