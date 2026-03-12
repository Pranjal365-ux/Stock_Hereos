import { ArrowLeft, Trophy, Clock, Flame, CheckCircle2 } from 'lucide-react';
import { availableQuizzes, dailyChallenges } from '../data/quizzesData';

interface QuizzesAndChallengesProps {
  onBack: () => void;
  onStartQuiz: (quizId: string) => void;
  userPoints: number;
}

export default function QuizzesAndChallenges({ onBack, onStartQuiz, userPoints }: QuizzesAndChallengesProps) {
  const diffBadge = (d: string) => {
    if (d === 'easy')   return 'badge-easy';
    if (d === 'medium') return 'badge-medium';
    return 'badge-hard';
  };

  const diffFill = (d: string) => {
    if (d === 'easy')   return '#4ade80';
    if (d === 'medium') return '#fbbf24';
    return '#f87171';
  };

  return (
    <div className="screen-bg min-h-screen p-6">
      <div className="ambient-orb w-72 h-72 bg-orange-800/10 top-0 right-0" style={{position:'absolute'}} />

      <div className="mb-6 animate-slide-up relative z-10">
        <button onClick={onBack} className="back-btn mb-4">
          <ArrowLeft className="w-4 h-4" /><span>Back</span>
        </button>
        <h1 className="display-title text-3xl mb-1">Quizzes & Challenges</h1>
        <p style={{color:'rgba(223,182,178,0.55)'}}>Earn points and climb the leaderboard</p>

        <div className="mt-4 glass-card px-5 py-3 inline-flex items-center gap-3">
          <Trophy className="w-5 h-5" style={{color:'#fbbf24'}} />
          <div>
            <p style={{color:'rgba(223,182,178,0.5)', fontSize:'0.75rem'}}>Your Points</p>
            <p className="text-white text-xl font-semibold">{userPoints}</p>
          </div>
        </div>
      </div>

      {/* Daily Challenges */}
      <div className="mb-5 relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <Flame className="w-5 h-5" style={{color:'#fb923c'}} />
          <h2 className="text-white text-base">Daily Challenges</h2>
        </div>
        <div className="space-y-3">
          {dailyChallenges.map((c, i) => (
            <div key={c.id} className="glass-card p-4 animate-slide-up" style={{animationDelay:`${i*0.07}s`}}>
              <div className="flex items-start gap-3">
                <div className="text-3xl">{c.emoji}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex-1 mr-2">
                      <h3 className="text-white text-sm mb-0.5">{c.title}</h3>
                      <p style={{color:'rgba(223,182,178,0.55)', fontSize:'0.78rem'}}>{c.description}</p>
                    </div>
                    <span className="badge badge-gold flex-shrink-0">
                      <Trophy className="w-3 h-3" />+{c.points}
                    </span>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between mb-1" style={{color:'rgba(223,182,178,0.45)', fontSize:'0.72rem'}}>
                      <span>{c.requirement}</span>
                      <span>{c.progress}/{c.total}</span>
                    </div>
                    <div className="progress-track w-full h-1.5">
                      <div className="h-full rounded-full transition-all"
                        style={{width:`${(c.progress/c.total)*100}%`, background: diffFill(c.difficulty),
                                boxShadow:`0 0 6px ${diffFill(c.difficulty)}55`}} />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span className={`badge ${diffBadge(c.difficulty)}`}>
                      {c.difficulty.charAt(0).toUpperCase() + c.difficulty.slice(1)}
                    </span>
                    {c.progress >= c.total && (
                      <div className="flex items-center gap-1" style={{color:'#4ade80', fontSize:'0.75rem'}}>
                        <CheckCircle2 className="w-3.5 h-3.5" /><span>Completed!</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quizzes */}
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <Trophy className="w-5 h-5" style={{color:'#fbbf24'}} />
          <h2 className="text-white text-base">Knowledge Quizzes</h2>
        </div>
        <div className="space-y-3">
          {availableQuizzes.map((quiz, i) => (
            <button key={quiz.id} onClick={() => onStartQuiz(quiz.id)}
              className="action-card w-full p-4 text-left animate-slide-up"
              style={{animationDelay:`${i*0.07}s`}}>
              <div className="flex items-start gap-3">
                <div className="text-3xl">{quiz.emoji}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex-1 mr-2">
                      <h3 className="text-white text-sm mb-0.5">{quiz.title}</h3>
                      <p style={{color:'rgba(223,182,178,0.55)', fontSize:'0.78rem'}}>{quiz.description}</p>
                    </div>
                    <span className="badge badge-gold flex-shrink-0">
                      <Trophy className="w-3 h-3" />+{quiz.points}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <span className={`badge ${diffBadge(quiz.difficulty)}`}>
                      {quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
                    </span>
                    <span className="flex items-center gap-1" style={{color:'rgba(223,182,178,0.5)', fontSize:'0.75rem'}}>
                      <Clock className="w-3 h-3" />{quiz.timeLimit}s
                    </span>
                    <span style={{color:'rgba(168,85,247,0.8)', fontSize:'0.75rem'}}>{quiz.questions.length} questions</span>
                    <span className="badge badge-purple">{quiz.category}</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Motivation */}
      <div className="glass-card p-5 mt-5 relative z-10" style={{borderColor:'rgba(249,115,22,0.25)'}}>
        <h3 className="text-white text-sm mb-1">💪 Keep Learning!</h3>
        <p style={{color:'rgba(223,182,178,0.6)', fontSize:'0.8rem'}}>
          Complete quizzes and challenges daily to earn points and unlock achievements.
          Every point brings you closer to the top of the leaderboard!
        </p>
      </div>
    </div>
  );
}
