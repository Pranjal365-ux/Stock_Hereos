import { ArrowLeft, Trophy, Medal, Award } from 'lucide-react';

interface LeaderboardProps {
  onBack: () => void;
  userPoints: number;
}

const BASE_USERS = [
  { name: 'Rahul K.',  points: 2850, avatar: '🦸',   badge: 'Master' },
  { name: 'Priya S.',  points: 2640, avatar: '👩‍💼', badge: 'Expert' },
  { name: 'Amit T.',   points: 2420, avatar: '👨‍💻', badge: 'Expert' },
  { name: 'Sneha M.',  points: 2180, avatar: '👩‍🎓', badge: 'Advanced' },
  { name: 'Vikram P.', points: 1950, avatar: '🧑‍💼', badge: 'Advanced' },
  { name: 'Anjali R.', points: 1820, avatar: '👩‍🔬', badge: 'Advanced' },
  { name: 'Karan D.',  points: 1650, avatar: '👨‍🎓', badge: 'Intermediate' },
];

function getBadge(points: number) {
  if (points >= 2500) return 'Master';
  if (points >= 2000) return 'Expert';
  if (points >= 1500) return 'Advanced';
  if (points >= 800)  return 'Intermediate';
  return 'Beginner';
}

export default function Leaderboard({ onBack, userPoints }: LeaderboardProps) {
  // Insert "You" and sort
  const allUsers = [
    ...BASE_USERS,
    { name: 'You', points: userPoints, avatar: '👤', badge: getBadge(userPoints) },
  ].sort((a, b) => b.points - a.points)
   .map((u, i) => ({ ...u, rank: i + 1 }));

  const yourEntry = allUsers.find(u => u.name === 'You')!;
  const nextUp = allUsers[yourEntry.rank - 2]; // person above you
  const pointsToNext = nextUp ? nextUp.points - yourEntry.points : 0;

  const top3 = allUsers.slice(0, 3);

  return (
    <div className="screen-bg min-h-screen p-6">
      <div className="ambient-orb w-80 h-80 bg-yellow-700/15 top-0 right-0" style={{position:'absolute'}} />

      <div className="mb-6 animate-slide-up relative z-10">
        <button onClick={onBack} className="back-btn mb-4">
          <ArrowLeft className="w-4 h-4" /><span>Back</span>
        </button>
        <h1 className="display-title text-3xl mb-1">Leaderboard</h1>
        <p style={{color:'rgba(223,182,178,0.55)'}}>Compete. Learn. Grow.</p>
      </div>

      {/* Your Rank Banner */}
      <div className="glass-card p-4 mb-5 animate-slide-up relative z-10"
        style={{borderColor:'rgba(251,191,36,0.3)', background:'rgba(251,191,36,0.07)'}}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">👤</div>
            <div>
              <p className="text-white font-semibold text-sm">Your Rank</p>
              <p style={{color:'rgba(223,182,178,0.55)', fontSize:'0.8rem'}}>{yourEntry.badge}</p>
            </div>
          </div>
          <div className="text-right">
            <p style={{color:'#fbbf24', fontSize:'1.5rem', fontWeight:700}}>#{yourEntry.rank}</p>
            <p style={{color:'rgba(252,211,77,0.7)', fontSize:'0.75rem'}}>{userPoints} pts</p>
          </div>
        </div>
        {pointsToNext > 0 && (
          <p className="mt-2 text-center" style={{color:'rgba(223,182,178,0.5)', fontSize:'0.75rem'}}>
            {pointsToNext} pts to overtake {nextUp.name}
          </p>
        )}
        {yourEntry.rank === 1 && (
          <p className="mt-2 text-center" style={{color:'#4ade80', fontSize:'0.75rem'}}>🏆 You're #1!</p>
        )}
      </div>

      {/* Top 3 Podium */}
      <div className="mb-6 animate-slide-up delay-100 relative z-10">
        <div className="flex items-end justify-center gap-3 mb-4">
          {/* 2nd */}
          <div className="flex-1 text-center">
            <div className="glass-card p-4 mb-2">
              <div className="text-3xl mb-2">{top3[1]?.avatar}</div>
              <Medal className="w-6 h-6 mx-auto mb-1" style={{color:'#b8c8d8'}} />
              <h4 className="text-white text-sm mb-0.5">{top3[1]?.name}</h4>
              <p style={{color:'rgba(184,200,216,0.8)', fontSize:'0.75rem'}}>{top3[1]?.points} pts</p>
            </div>
            <div className="h-16 podium-silver rounded-t-xl flex items-center justify-center">
              <span className="text-white text-xl font-bold">2</span>
            </div>
          </div>
          {/* 1st */}
          <div className="flex-1 text-center">
            <div className="glass-card p-4 mb-2" style={{boxShadow:'0 0 30px rgba(245,200,66,0.3)'}}>
              <div className="text-3xl mb-2">{top3[0]?.avatar}</div>
              <Trophy className="w-6 h-6 mx-auto mb-1" style={{color:'#fcd34d'}} />
              <h4 className="text-white text-sm mb-0.5">{top3[0]?.name}</h4>
              <p style={{color:'rgba(252,211,77,0.9)', fontSize:'0.75rem'}}>{top3[0]?.points} pts</p>
            </div>
            <div className="h-24 podium-gold rounded-t-xl flex items-center justify-center">
              <span className="text-white text-xl font-bold">1</span>
            </div>
          </div>
          {/* 3rd */}
          <div className="flex-1 text-center">
            <div className="glass-card p-4 mb-2">
              <div className="text-3xl mb-2">{top3[2]?.avatar}</div>
              <Award className="w-6 h-6 mx-auto mb-1" style={{color:'#cd7f32'}} />
              <h4 className="text-white text-sm mb-0.5">{top3[2]?.name}</h4>
              <p style={{color:'rgba(205,127,50,0.8)', fontSize:'0.75rem'}}>{top3[2]?.points} pts</p>
            </div>
            <div className="h-12 podium-bronze rounded-t-xl flex items-center justify-center">
              <span className="text-white text-xl font-bold">3</span>
            </div>
          </div>
        </div>
      </div>

      {/* Full Rankings */}
      <div className="glass-card p-5 mb-4 animate-slide-up delay-200 relative z-10">
        <h3 className="text-white text-base mb-4">All Rankings</h3>
        <div className="space-y-2">
          {allUsers.map((user, i) => {
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
                    <h4 className="text-white text-sm">{user.name}{isYou ? ' (You)' : ''}</h4>
                    <p style={{color: isYou ? 'rgba(251,228,216,0.65)' : 'rgba(223,182,178,0.5)', fontSize:'0.75rem'}}>
                      {user.badge}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-semibold ${isYou ? 'text-yellow-300' : 'text-white'}`}>{user.points}</p>
                    <p style={{color:'rgba(223,182,178,0.5)', fontSize:'0.7rem'}}>points</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="glass-card p-5 animate-slide-up delay-300 relative z-10" style={{borderColor:'rgba(249,115,22,0.3)'}}>
        <h3 className="text-white text-sm mb-1">🎯 Keep Going!</h3>
        <p style={{color:'rgba(223,182,178,0.6)', fontSize:'0.8rem'}}>
          {yourEntry.rank === 1
            ? "You're at the top! Keep completing quizzes to stay there."
            : `Complete more quizzes to climb the leaderboard. ${pointsToNext} points to the next rank!`}
        </p>
      </div>
    </div>
  );
}
