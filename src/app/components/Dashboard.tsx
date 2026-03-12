import { TrendingUp, Clock, Briefcase, Lightbulb, ArrowRight, Trophy, Target } from 'lucide-react';

interface DashboardProps {
  onNavigate: (screen: string) => void;
  virtualCash: number;
}

export default function Dashboard({ onNavigate, virtualCash }: DashboardProps) {
  const formatCurrency = (amount: number) => amount.toLocaleString('en-IN');

  const navCards = [
    { screen:'trading',    icon:<TrendingUp className="w-6 h-6"/>, title:'Trade Live',           desc:'Practice with real market data',  accent:'action-card-blue',   iconBg:'rgba(79,158,255,0.2)', iconColor:'#60a5fa' },
    { screen:'arena',      icon:<Clock className="w-6 h-6"/>,      title:'Time Arenas',           desc:'Travel back and make decisions',   accent:'action-card-purple', iconBg:'rgba(168,85,247,0.2)', iconColor:'#c084fc' },
    { screen:'portfolio',  icon:<Briefcase className="w-6 h-6"/>,  title:'Portfolio',             desc:'Track your investments',           accent:'action-card-pink',   iconBg:'rgba(236,72,153,0.2)', iconColor:'#f472b6' },
    { screen:'quizzes',    icon:<Target className="w-6 h-6"/>,     title:'Quizzes & Challenges',  desc:'Earn points and rewards',          accent:'action-card-green',  iconBg:'rgba(34,197,94,0.2)',  iconColor:'#4ade80' },
    { screen:'leaderboard',icon:<Trophy className="w-6 h-6"/>,     title:'Leaderboard',           desc:'Compete with other learners',      accent:'action-card-gold',   iconBg:'rgba(234,179,8,0.2)', iconColor:'#fbbf24' },
  ];

  return (
    <div className="screen-bg min-h-screen p-6">
      <div className="ambient-orb w-96 h-96 bg-purple-800/20 top-0 right-[-20%]" style={{position:'absolute'}} />

      {/* Header */}
      <div className="mb-6 animate-slide-up relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-white text-xl mb-2">Welcome back!</h2>
            <span className="badge badge-gold">⭐ Beginner Investor</span>
          </div>
          <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
            style={{background:'linear-gradient(135deg,rgba(234,179,8,0.3),rgba(249,115,22,0.3))', border:'1px solid rgba(234,179,8,0.4)'}}>
            👤
          </div>
        </div>

        {/* Balance Card */}
        <div className="balance-card p-6">
          <p className="text-sm mb-1" style={{color:'rgba(223,182,178,0.6)'}}>Virtual Balance</p>
          <h1 className="shimmer-text text-4xl">₹{formatCurrency(virtualCash)}</h1>
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 gap-3 mb-6 relative z-10">
        {navCards.map((card, i) => (
          <button
            key={card.screen}
            onClick={() => onNavigate(card.screen)}
            className={`action-card ${card.accent} p-5 text-left animate-slide-up`}
            style={{animationDelay:`${i * 0.07}s`}}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="icon-container w-11 h-11" style={{background: card.iconBg, border:`1px solid ${card.iconBg}`}}>
                  <span style={{color: card.iconColor}}>{card.icon}</span>
                </div>
                <div>
                  <h3 className="text-white text-base mb-0.5">{card.title}</h3>
                  <p style={{color:'rgba(223,182,178,0.55)', fontSize:'0.8rem'}}>{card.desc}</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4" style={{color:'rgba(223,182,178,0.35)'}} />
            </div>
          </button>
        ))}
      </div>

      {/* Daily Tip */}
      <div className="glass-card p-5 relative z-10 animate-slide-up" style={{animationDelay:'0.4s'}}>
        <div className="flex items-start gap-4">
          <div className="icon-container w-10 h-10 flex-shrink-0"
            style={{background:'rgba(249,115,22,0.2)', border:'1px solid rgba(249,115,22,0.35)'}}>
            <Lightbulb className="w-5 h-5" style={{color:'#fb923c'}} />
          </div>
          <div>
            <h3 className="text-white text-sm mb-1">Daily Learning Tip</h3>
            <p style={{color:'rgba(223,182,178,0.6)', fontSize:'0.8rem'}}>
              Diversification helps reduce risk. Don't put all your eggs in one basket!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
