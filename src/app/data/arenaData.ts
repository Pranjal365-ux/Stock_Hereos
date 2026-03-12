export interface ArenaData {
  id: string;
  company: string;
  year: string;
  startPrice: number;
  // Returns at different time periods (multiplier)
  returns: {
    [key: number]: number; // key is years, value is multiplier
  };
  lesson: string;
  difficulty: number;
  color: string;
  emoji: string;
}

export const arenaDatabase: ArenaData[] = [
  {
    id: 'apple-2012',
    company: 'Apple',
    year: '2012',
    startPrice: 85,
    returns: {
      0.5: 1.12,   // 6 months: +12%
      1: 1.45,     // 1 year: +45%
      2: 2.35,     // 2 years: +135%
      5: 7.17      // 5 years: +617%
    },
    lesson: 'Strong companies with innovative products often reward patient investors. Apple\'s ecosystem and loyal customer base drove massive growth from 2012 to 2017.',
    difficulty: 2,
    color: 'from-gray-700 to-gray-800',
    emoji: '🍎'
  },
  {
    id: 'tesla-2016',
    company: 'Tesla',
    year: '2016',
    startPrice: 42,
    returns: {
      0.5: 0.95,   // 6 months: -5% (volatility)
      1: 1.38,     // 1 year: +38%
      2: 2.14,     // 2 years: +114%
      5: 14.29     // 5 years: +1329% (massive growth)
    },
    lesson: 'Disruptive technology companies can be volatile but may offer exceptional long-term returns. Tesla revolutionized the EV industry despite early skepticism.',
    difficulty: 3,
    color: 'from-red-600 to-red-700',
    emoji: '⚡'
  },
  {
    id: 'infosys-2008',
    company: 'Infosys',
    year: '2008',
    startPrice: 1200,
    returns: {
      0.5: 0.75,   // 6 months: -25% (financial crisis)
      1: 0.83,     // 1 year: -17%
      2: 1.42,     // 2 years: +42% (recovery)
      5: 2.08      // 5 years: +108%
    },
    lesson: 'During financial crises, even good companies face short-term losses. Those who held through the 2008 crisis and recovery were rewarded as markets rebounded.',
    difficulty: 3,
    color: 'from-blue-600 to-blue-700',
    emoji: '💼'
  },
  {
    id: 'amazon-2010',
    company: 'Amazon',
    year: '2010',
    startPrice: 125,
    returns: {
      0.5: 1.08,   // 6 months: +8%
      1: 1.02,     // 1 year: +2% (slow start)
      2: 1.76,     // 2 years: +76%
      5: 4.24      // 5 years: +324%
    },
    lesson: 'E-commerce was just beginning to transform retail. Amazon\'s early dominance in online shopping and cloud computing (AWS) created sustained growth.',
    difficulty: 2,
    color: 'from-orange-600 to-orange-700',
    emoji: '📦'
  },
  {
    id: 'google-2014',
    company: 'Google',
    year: '2014',
    startPrice: 556,
    returns: {
      0.5: 1.06,   // 6 months: +6%
      1: 1.42,     // 1 year: +42%
      2: 1.63,     // 2 years: +63%
      5: 2.51      // 5 years: +151%
    },
    lesson: 'Established tech giants with dominant market positions can provide steady, reliable growth. Google\'s advertising business and diversification strategy paid off consistently.',
    difficulty: 1,
    color: 'from-green-600 to-green-700',
    emoji: '🔍'
  }
];

export function getArenaById(id: string): ArenaData | undefined {
  return arenaDatabase.find(arena => arena.id === id);
}

export function calculateArenaResult(
  arenaId: string,
  investmentAmount: number,
  holdPeriod: number,
  confidence: number
) {
  const arena = getArenaById(arenaId);
  if (!arena) {
    return {
      profit: 0,
      finalValue: investmentAmount,
      returnPercent: 0,
      multiplier: 1,
      points: 0,
      lesson: 'Arena not found'
    };
  }

  const multiplier = arena.returns[holdPeriod] || 1;
  const finalValue = investmentAmount * multiplier;
  const profit = finalValue - investmentAmount;
  const returnPercent = ((multiplier - 1) * 100).toFixed(1);

  // Calculate points based on profit and confidence accuracy
  let basePoints = Math.max(0, Math.floor(profit / 10));
  
  // Bonus points for accurate confidence
  const actualReturn = multiplier - 1;
  let confidenceBonus = 0;
  
  if (actualReturn > 1 && confidence >= 4) confidenceBonus = 100; // High return, high confidence
  else if (actualReturn > 0.5 && confidence === 3) confidenceBonus = 80;
  else if (actualReturn > 0 && confidence >= 2) confidenceBonus = 50;
  else if (actualReturn < 0 && confidence <= 2) confidenceBonus = 30; // Predicted loss
  
  const totalPoints = basePoints + confidenceBonus;

  return {
    profit,
    finalValue,
    returnPercent: parseFloat(returnPercent),
    multiplier,
    points: totalPoints,
    lesson: arena.lesson
  };
}
