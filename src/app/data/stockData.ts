export interface Stock {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  emoji: string;
}

export const availableStocks: Stock[] = [
  {
    id: 'reliance',
    name: 'Reliance Industries',
    symbol: 'NSE: RELIANCE',
    price: 1245.50,
    change: 28.50,
    changePercent: 2.34,
    emoji: '🏭'
  },
  {
    id: 'tcs',
    name: 'Tata Consultancy Services',
    symbol: 'NSE: TCS',
    price: 3550.00,
    change: 45.00,
    changePercent: 1.28,
    emoji: '💻'
  },
  {
    id: 'infosys',
    name: 'Infosys',
    symbol: 'NSE: INFY',
    price: 1420.00,
    change: -15.50,
    changePercent: -1.08,
    emoji: '💼'
  },
  {
    id: 'hdfc',
    name: 'HDFC Bank',
    symbol: 'NSE: HDFCBANK',
    price: 1650.75,
    change: 22.25,
    changePercent: 1.37,
    emoji: '🏦'
  },
  {
    id: 'bharti',
    name: 'Bharti Airtel',
    symbol: 'NSE: BHARTIARTL',
    price: 892.50,
    change: -8.75,
    changePercent: -0.97,
    emoji: '📱'
  }
];

export function getStockById(id: string): Stock | undefined {
  return availableStocks.find(stock => stock.id === id);
}
