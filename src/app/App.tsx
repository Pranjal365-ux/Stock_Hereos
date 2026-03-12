import { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import ModeSelection from './components/ModeSelection';
import LearningModule from './components/LearningModule';
import QuizScreen from './components/QuizScreen';
import RewardScreen from './components/RewardScreen';
import Dashboard from './components/Dashboard';
import ArenaSelection from './components/ArenaSelection';
import ArenaDecision from './components/ArenaDecision';
import ArenaResult from './components/ArenaResult';
import VirtualTrading from './components/VirtualTrading';
import PortfolioScreen from './components/PortfolioScreen';
import Leaderboard from './components/Leaderboard';
import QuizzesAndChallenges from './components/QuizzesAndChallenges';
import QuizTaking from './components/QuizTaking';
import QuizResult from './components/QuizResult';
import { calculateArenaResult } from './data/arenaData';
import { getQuizById } from './data/quizzesData';

type Screen = 
  | 'splash'
  | 'mode-selection'
  | 'learning'
  | 'quiz'
  | 'reward'
  | 'dashboard'
  | 'arena'
  | 'arena-decision'
  | 'arena-result'
  | 'trading'
  | 'portfolio'
  | 'leaderboard'
  | 'quizzes'
  | 'quiz-taking'
  | 'quiz-result';

interface ArenaResultData {
  profit: number;
  finalValue: number;
  returnPercent: number;
  points: number;
  lesson: string;
  holdPeriod: number;
}

export interface PortfolioHolding {
  stockId: string;
  quantity: number;
  avgPrice: number;
}

function loadState<T>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch { return fallback; }
}

function saveState<T>(key: string, value: T) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

// Screens that should not be persisted — always re-enter from dashboard
const TRANSIENT_SCREENS: Screen[] = ['splash', 'mode-selection', 'learning', 'quiz', 'reward', 'arena-decision', 'arena-result', 'quiz-taking', 'quiz-result'];

export default function App() {
  const [currentScreen, setCurrentScreenRaw] = useState<Screen>(() => {
    const completedOnboarding = localStorage.getItem('stockheroes_mode');
    if (completedOnboarding) return 'dashboard'; // skip everything, go straight to dashboard
    const saved = localStorage.getItem('sh_screen') as Screen | null;
    if (!saved || TRANSIENT_SCREENS.includes(saved)) return 'splash';
    return saved;
  });

  const setCurrentScreen = (screen: Screen) => {
    setCurrentScreenRaw(screen);
    if (!TRANSIENT_SCREENS.includes(screen)) {
      localStorage.setItem('sh_screen', screen);
    }
  };

  const [userMode, setUserMode] = useState<string | null>(() => localStorage.getItem('stockheroes_mode'));
  const [selectedArena, setSelectedArena] = useState<string>('apple-2012');
  const [arenaResultData, setArenaResultData] = useState<ArenaResultData | null>(null);
  const [virtualCash, setVirtualCash] = useState<number>(() => loadState('sh_cash', 50000));
  const [portfolio, setPortfolio] = useState<PortfolioHolding[]>(() => loadState('sh_portfolio', []));
  const [userPoints, setUserPoints] = useState<number>(() => loadState('sh_points', 450));
  const [selectedQuizId, setSelectedQuizId] = useState<string>('');
  const [quizResultData, setQuizResultData] = useState<{
    score: number;
    totalQuestions: number;
    pointsEarned: number;
    quizTitle: string;
  } | null>(null);

  // Persist game state on every change
  useEffect(() => { saveState('sh_cash', virtualCash); }, [virtualCash]);
  useEffect(() => { saveState('sh_portfolio', portfolio); }, [portfolio]);
  useEffect(() => { saveState('sh_points', userPoints); }, [userPoints]);

  const handleBuyStock = (stockId: string, quantity: number, price: number) => {
    const totalCost = quantity * price;
    
    if (totalCost > virtualCash) {
      return { success: false, message: 'Insufficient funds!' };
    }

    setVirtualCash(prev => prev - totalCost);
    
    setPortfolio(prev => {
      const existingHolding = prev.find(h => h.stockId === stockId);
      
      if (existingHolding) {
        // Update average price
        const totalQuantity = existingHolding.quantity + quantity;
        const totalValue = (existingHolding.avgPrice * existingHolding.quantity) + (price * quantity);
        const newAvgPrice = totalValue / totalQuantity;
        
        return prev.map(h => 
          h.stockId === stockId 
            ? { ...h, quantity: totalQuantity, avgPrice: newAvgPrice }
            : h
        );
      } else {
        // Add new holding
        return [...prev, { stockId, quantity, avgPrice: price }];
      }
    });

    return { success: true, message: `Successfully bought ${quantity} shares!` };
  };

  const handleSellStock = (stockId: string, quantity: number, price: number) => {
    const holding = portfolio.find(h => h.stockId === stockId);
    
    if (!holding || holding.quantity < quantity) {
      return { success: false, message: 'Insufficient shares to sell!' };
    }

    const totalValue = quantity * price;
    setVirtualCash(prev => prev + totalValue);
    
    setPortfolio(prev => {
      return prev.map(h => 
        h.stockId === stockId 
          ? { ...h, quantity: h.quantity - quantity }
          : h
      ).filter(h => h.quantity > 0);
    });

    return { success: true, message: `Successfully sold ${quantity} shares!` };
  };

  const handleArenaSubmit = (investment: number, holdPeriod: number, confidence: number) => {
    const result = calculateArenaResult(selectedArena, investment, holdPeriod, confidence);
    setArenaResultData({
      profit: result.profit,
      finalValue: result.finalValue,
      returnPercent: result.returnPercent,
      points: result.points,
      lesson: result.lesson,
      holdPeriod: holdPeriod
    });
    setCurrentScreen('arena-result');
  };

  const handleQuizSelect = (quizId: string) => {
    const quiz = getQuizById(quizId);
    if (quiz) {
      setSelectedQuizId(quizId);
      setCurrentScreen('quiz-taking');
    }
  };

  const handleQuizSubmit = (answers: { [questionId: string]: string }) => {
    const quizId = selectedQuizId;
    const quiz = getQuizById(quizId);
    if (quiz) {
      const correctAnswers = quiz.questions.reduce((count, question) => {
        return count + (answers[question.id] === question.correctAnswer ? 1 : 0);
      }, 0);
      const totalQuestions = quiz.questions.length;
      const score = (correctAnswers / totalQuestions) * 100;
      const pointsEarned = Math.round(score * 5); // Assuming 5 points per correct answer
      setUserPoints(prev => prev + pointsEarned);
      setQuizResultData({
        score: score,
        totalQuestions: totalQuestions,
        pointsEarned: pointsEarned,
        quizTitle: quiz.title
      });
      setCurrentScreen('quiz-result');
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onStartLearning={() => {
          if (userMode) {
            setCurrentScreen('dashboard');
          } else {
            setCurrentScreen('mode-selection');
          }
        }} />;
      
      case 'mode-selection':
        return <ModeSelection onSelectMode={(mode?: string) => {
          const chosen = mode ?? 'beginner';
          localStorage.setItem('stockheroes_mode', chosen);
          setUserMode(chosen);
          setCurrentScreen('learning');
        }} />;
      
      case 'learning':
        return <LearningModule onComplete={() => setCurrentScreen('quiz')} />;
      
      case 'quiz':
        return <QuizScreen onComplete={() => setCurrentScreen('reward')} />;
      
      case 'reward':
        return <RewardScreen onContinue={() => setCurrentScreen('dashboard')} />;
      
      case 'dashboard':
        return <Dashboard onNavigate={(screen) => {
          if (screen === 'arena') setCurrentScreen('arena');
          else if (screen === 'trading') setCurrentScreen('trading');
          else if (screen === 'portfolio') setCurrentScreen('portfolio');
          else if (screen === 'leaderboard') setCurrentScreen('leaderboard');
          else if (screen === 'quizzes') setCurrentScreen('quizzes');
        }} virtualCash={virtualCash} />;
      
      case 'arena':
        return (
          <ArenaSelection
            onSelectArena={(arenaId) => {
              setSelectedArena(arenaId);
              setCurrentScreen('arena-decision');
            }}
            onBack={() => setCurrentScreen('dashboard')}
          />
        );
      
      case 'arena-decision':
        return (
          <ArenaDecision
            arenaId={selectedArena}
            onSubmit={handleArenaSubmit}
            onBack={() => setCurrentScreen('arena')}
          />
        );
      
      case 'arena-result':
        return arenaResultData ? (
          <ArenaResult
            profit={arenaResultData.profit}
            finalValue={arenaResultData.finalValue}
            returnPercent={arenaResultData.returnPercent}
            points={arenaResultData.points}
            lesson={arenaResultData.lesson}
            holdPeriod={arenaResultData.holdPeriod}
            onContinue={() => setCurrentScreen('dashboard')}
          />
        ) : null;
      
      case 'trading':
        return (
          <VirtualTrading 
            onBack={() => setCurrentScreen('dashboard')}
            virtualCash={virtualCash}
            portfolio={portfolio}
            onBuyStock={handleBuyStock}
            onSellStock={handleSellStock}
          />
        );
      
      case 'portfolio':
        return (
          <PortfolioScreen 
            onBack={() => setCurrentScreen('dashboard')}
            virtualCash={virtualCash}
            portfolio={portfolio}
          />
        );
      
      case 'leaderboard':
        return <Leaderboard onBack={() => setCurrentScreen('dashboard')} />;
      
      case 'quizzes':
        return (
          <QuizzesAndChallenges 
            onBack={() => setCurrentScreen('dashboard')}
            onStartQuiz={handleQuizSelect}
            userPoints={userPoints}
          />
        );
      
      case 'quiz-taking':
        return (
          <QuizTaking 
            quizId={selectedQuizId}
            onComplete={(score, totalQuestions, pointsEarned) => {
              const quiz = getQuizById(selectedQuizId);
              setUserPoints(prev => prev + pointsEarned);
              setQuizResultData({
                score,
                totalQuestions,
                pointsEarned,
                quizTitle: quiz?.title || 'Quiz'
              });
              setCurrentScreen('quiz-result');
            }}
            onBack={() => setCurrentScreen('quizzes')}
          />
        );
      
      case 'quiz-result':
        return quizResultData ? (
          <QuizResult
            score={quizResultData.score}
            totalQuestions={quizResultData.totalQuestions}
            pointsEarned={quizResultData.pointsEarned}
            quizTitle={quizResultData.quizTitle}
            onContinue={() => setCurrentScreen('dashboard')}
            onRetry={() => setCurrentScreen('quizzes')}
          />
        ) : null;
      
      default:
        return <SplashScreen onStartLearning={() => setCurrentScreen('mode-selection')} />;
    }
  };

  return (
    <div className="size-full">
      {renderScreen()}
    </div>
  );
}