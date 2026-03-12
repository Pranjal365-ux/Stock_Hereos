export interface Quiz {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questions: QuizQuestion[];
  points: number;
  emoji: string;
  category: string;
  timeLimit?: number; // in seconds
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  emoji: string;
  type: 'streak' | 'trade' | 'portfolio' | 'learning';
  requirement: string;
  progress: number;
  total: number;
}

export const availableQuizzes: Quiz[] = [
  {
    id: 'basics-101',
    title: 'Stock Market Basics',
    description: 'Test your knowledge of fundamental stock market concepts',
    difficulty: 'easy',
    points: 100,
    emoji: '📚',
    category: 'Fundamentals',
    timeLimit: 120,
    questions: [
      {
        question: 'What does a stock represent?',
        options: [
          'A loan to a company',
          'Ownership in a company',
          'A government bond',
          'A savings account'
        ],
        correctAnswer: 1,
        explanation: 'A stock represents partial ownership in a company. When you buy stock, you become a shareholder!'
      },
      {
        question: 'What is a dividend?',
        options: [
          'The stock price increase',
          'A company\'s total revenue',
          'Payment to shareholders from profits',
          'A type of stock'
        ],
        correctAnswer: 2,
        explanation: 'A dividend is a payment made by a company to its shareholders, usually from profits.'
      },
      {
        question: 'What does "bullish" mean in the stock market?',
        options: [
          'Expecting prices to fall',
          'Expecting prices to rise',
          'No price movement',
          'High volatility'
        ],
        correctAnswer: 1,
        explanation: 'Bullish means expecting prices to rise. The opposite is bearish (expecting prices to fall).'
      },
      {
        question: 'What is market capitalization?',
        options: [
          'Total revenue of a company',
          'Company\'s total debt',
          'Total value of all shares',
          'Annual profit'
        ],
        correctAnswer: 2,
        explanation: 'Market cap is the total value of all a company\'s shares. It\'s calculated by multiplying share price by total shares.'
      },
      {
        question: 'What does IPO stand for?',
        options: [
          'Initial Public Offering',
          'International Price Option',
          'Invested Profit Organization',
          'Internal Portfolio Order'
        ],
        correctAnswer: 0,
        explanation: 'IPO means Initial Public Offering - when a private company first sells shares to the public.'
      }
    ]
  },
  {
    id: 'risk-management',
    title: 'Risk Management',
    description: 'Learn how to manage investment risks effectively',
    difficulty: 'medium',
    points: 200,
    emoji: '⚖️',
    category: 'Risk',
    timeLimit: 180,
    questions: [
      {
        question: 'What is diversification?',
        options: [
          'Investing all money in one stock',
          'Spreading investments across different assets',
          'Only investing in bonds',
          'Day trading multiple times'
        ],
        correctAnswer: 1,
        explanation: 'Diversification means spreading your investments across different assets to reduce risk.'
      },
      {
        question: 'What is a stop-loss order?',
        options: [
          'An order to buy at a specific price',
          'An automatic sell order at a set price to limit losses',
          'A type of dividend payment',
          'A trading restriction'
        ],
        correctAnswer: 1,
        explanation: 'A stop-loss order automatically sells a stock when it reaches a certain price, helping limit potential losses.'
      },
      {
        question: 'What does P/E ratio measure?',
        options: [
          'Profit to equity',
          'Price to earnings',
          'Portfolio to expenses',
          'Premium to exchange'
        ],
        correctAnswer: 1,
        explanation: 'P/E ratio (Price to Earnings) compares a company\'s stock price to its earnings per share.'
      },
      {
        question: 'What is volatility?',
        options: [
          'Total stock value',
          'Company revenue',
          'Price fluctuation magnitude',
          'Trading volume'
        ],
        correctAnswer: 2,
        explanation: 'Volatility measures how much a stock\'s price fluctuates. Higher volatility means bigger price swings.'
      },
      {
        question: 'What is the recommended percentage of portfolio in a single stock?',
        options: [
          '50-60%',
          '30-40%',
          '5-10%',
          '90-100%'
        ],
        correctAnswer: 2,
        explanation: 'Financial experts generally recommend keeping any single stock to 5-10% of your portfolio to manage risk.'
      }
    ]
  },
  {
    id: 'advanced-trading',
    title: 'Advanced Trading Strategies',
    description: 'Master advanced concepts and trading techniques',
    difficulty: 'hard',
    points: 300,
    emoji: '🎯',
    category: 'Advanced',
    timeLimit: 240,
    questions: [
      {
        question: 'What is short selling?',
        options: [
          'Selling stocks quickly',
          'Borrowing and selling stocks hoping price falls',
          'Selling stocks at a discount',
          'Selling stocks within a day'
        ],
        correctAnswer: 1,
        explanation: 'Short selling involves borrowing stocks to sell them, hoping to buy them back later at a lower price.'
      },
      {
        question: 'What does beta measure?',
        options: [
          'Company profits',
          'Stock volatility relative to market',
          'Dividend yield',
          'Trading volume'
        ],
        correctAnswer: 1,
        explanation: 'Beta measures how volatile a stock is compared to the overall market. A beta of 1 means it moves with the market.'
      },
      {
        question: 'What is a call option?',
        options: [
          'Right to sell at a specific price',
          'Right to buy at a specific price',
          'Obligation to buy stocks',
          'A type of dividend'
        ],
        correctAnswer: 1,
        explanation: 'A call option gives you the right (but not obligation) to buy a stock at a specific price by a certain date.'
      },
      {
        question: 'What is the wash sale rule?',
        options: [
          'Must wash hands before trading',
          'Can\'t claim loss if repurchasing within 30 days',
          'Must sell all stocks yearly',
          'Trading time restriction'
        ],
        correctAnswer: 1,
        explanation: 'The wash sale rule prevents claiming a tax loss if you repurchase the same or similar stock within 30 days.'
      },
      {
        question: 'What is dollar-cost averaging?',
        options: [
          'Investing same amount regularly regardless of price',
          'Buying only when prices are low',
          'Selling in small portions',
          'Converting to dollars before buying'
        ],
        correctAnswer: 0,
        explanation: 'Dollar-cost averaging means investing a fixed amount regularly, which helps reduce the impact of volatility.'
      }
    ]
  },
  {
    id: 'market-psychology',
    title: 'Market Psychology',
    description: 'Understand investor behavior and market sentiment',
    difficulty: 'medium',
    points: 200,
    emoji: '🧠',
    category: 'Psychology',
    timeLimit: 150,
    questions: [
      {
        question: 'What is FOMO in investing?',
        options: [
          'Fear Of Missing Out',
          'Forecast Of Market Options',
          'Fund Organization Method',
          'Financial Overhead Management'
        ],
        correctAnswer: 0,
        explanation: 'FOMO (Fear Of Missing Out) can lead investors to make impulsive decisions based on others\' success.'
      },
      {
        question: 'What is herd mentality?',
        options: [
          'Following crowd without independent analysis',
          'Investing in agriculture stocks',
          'Long-term holding strategy',
          'Diversification method'
        ],
        correctAnswer: 0,
        explanation: 'Herd mentality is when investors follow what others are doing without doing their own research.'
      },
      {
        question: 'What is confirmation bias?',
        options: [
          'Confirming trades before execution',
          'Seeking information that supports existing beliefs',
          'Double-checking account balance',
          'Verifying company data'
        ],
        correctAnswer: 1,
        explanation: 'Confirmation bias is the tendency to seek out information that confirms what you already believe.'
      },
      {
        question: 'What is loss aversion?',
        options: [
          'Never investing',
          'Only buying low-risk stocks',
          'Feeling losses more strongly than gains',
          'Avoiding stock market entirely'
        ],
        correctAnswer: 2,
        explanation: 'Loss aversion means people feel the pain of losses about twice as strongly as the pleasure of gains.'
      },
      {
        question: 'What causes market bubbles?',
        options: [
          'Too much water in the market',
          'Prices rising far beyond intrinsic value',
          'High dividend payments',
          'Government regulations'
        ],
        correctAnswer: 1,
        explanation: 'Market bubbles occur when asset prices rise far above their intrinsic value, often driven by speculation.'
      }
    ]
  }
];

export const dailyChallenges: Challenge[] = [
  {
    id: 'daily-trade',
    title: 'Daily Trader',
    description: 'Make 3 successful trades today',
    difficulty: 'easy',
    points: 50,
    emoji: '💰',
    type: 'trade',
    requirement: 'Complete 3 trades',
    progress: 0,
    total: 3
  },
  {
    id: 'portfolio-diversify',
    title: 'Diversification Master',
    description: 'Own stocks from 4 different companies',
    difficulty: 'medium',
    points: 100,
    emoji: '🎨',
    type: 'portfolio',
    requirement: 'Hold 4 different stocks',
    progress: 0,
    total: 4
  },
  {
    id: 'arena-champion',
    title: 'Time Arena Champion',
    description: 'Complete 5 Time Arena challenges',
    difficulty: 'medium',
    points: 150,
    emoji: '⏰',
    type: 'learning',
    requirement: 'Complete 5 arenas',
    progress: 0,
    total: 5
  },
  {
    id: 'quiz-master',
    title: 'Quiz Master',
    description: 'Score 100% on any quiz',
    difficulty: 'hard',
    points: 200,
    emoji: '🎓',
    type: 'learning',
    requirement: 'Perfect quiz score',
    progress: 0,
    total: 1
  },
  {
    id: 'profit-maker',
    title: 'Profit Maker',
    description: 'Achieve 10% portfolio profit',
    difficulty: 'hard',
    points: 250,
    emoji: '📈',
    type: 'portfolio',
    requirement: '10% total profit',
    progress: 0,
    total: 100
  },
  {
    id: 'seven-day-streak',
    title: '7-Day Streak',
    description: 'Log in for 7 consecutive days',
    difficulty: 'medium',
    points: 150,
    emoji: '🔥',
    type: 'streak',
    requirement: '7 day login streak',
    progress: 3,
    total: 7
  }
];

export function getQuizById(id: string): Quiz | undefined {
  return availableQuizzes.find(quiz => quiz.id === id);
}
