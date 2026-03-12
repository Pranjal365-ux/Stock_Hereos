import { ArrowLeft, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { PortfolioHolding } from '../App';
import { useStockData } from '../hooks/useStockData';

interface PortfolioScreenProps {
  onBack: () => void;
  virtualCash: number;
  portfolio: PortfolioHolding[];
}

const colorAccents: {[k:string]: string} = {
  reliance:'#3b82f6', tcs:'#6366f1', infosys:'#a855f7', hdfc:'#ec4899', bharti:'#f97316'
};

export default function PortfolioScreen({ onBack, virtualCash, portfolio }: PortfolioScreenProps) {
  const { getStockById, status } = useStockData();
  const holdings = portfolio.map(holding => {
    const stock = getStockById(holding.stockId);
    if (!stock) return null;
    const currentValue = stock.price * holding.quantity;
    const investedValue = holding.avgPrice * holding.quantity;
    const pl = currentValue - investedValue;
    const plPercent = (stock.price - holding.avgPrice) / holding.avgPrice * 100;
    return { stockId: holding.stockId, name: stock.name, symbol: stock.symbol, emoji: stock.emoji,
             quantity: holding.quantity, avgPrice: holding.avgPrice, currentPrice: stock.price,
             currentValue, pl, plPercent };
  }).filter(Boolean);

  const totalInvestedValue = holdings.reduce((s,h) => s + h!.avgPrice * h!.quantity, 0);
  const totalCurrentValue  = holdings.reduce((s,h) => s + h!.currentValue, 0);
  const totalPortfolioValue = totalCurrentValue + virtualCash;
  const totalProfitLoss = totalCurrentValue - totalInvestedValue;
  const totalProfitPercent = totalInvestedValue > 0 ? (totalProfitLoss / totalInvestedValue) * 100 : 0;
  const isProfit = totalProfitLoss >= 0;

  let riskLevel = 'Low';
  if (holdings.length === 1) riskLevel = 'High';
  else if (holdings.length === 2) riskLevel = 'Medium';

  const riskWidth = riskLevel === 'Low' ? '33%' : riskLevel === 'Medium' ? '66%' : '100%';
  const riskColor = riskLevel === 'Low' ? '#4ade80' : riskLevel === 'Medium' ? '#fbbf24' : '#f87171';

  return (
    <div className="screen-bg min-h-screen p-6">
      <div className="ambient-orb w-64 h-64 bg-pink-800/15 top-0 right-0" style={{position:'absolute'}} />

      <div className="mb-5 animate-slide-up relative z-10">
        <button onClick={onBack} className="back-btn mb-4">
          <ArrowLeft className="w-4 h-4" /><span>Back</span>
        </button>
        <h1 className="display-title text-3xl mb-1">Your Portfolio</h1>
        <p style={{color:'rgba(223,182,178,0.55)'}}>Track your virtual investments</p>
      </div>

      {/* Portfolio Value */}
      <div className="balance-card p-6 mb-5 animate-slide-up delay-100 relative z-10">
        <p className="text-sm mb-1" style={{color:'rgba(223,182,178,0.55)'}}>Total Portfolio Value</p>
        <h1 className="shimmer-text text-3xl mb-3">₹{totalPortfolioValue.toLocaleString('en-IN', {maximumFractionDigits:0})}</h1>
        <div className="flex gap-4 text-sm mb-3" style={{color:'rgba(223,182,178,0.55)'}}>
          <span>Cash: ₹{virtualCash.toLocaleString('en-IN', {maximumFractionDigits:0})}</span>
          <span>Invested: ₹{totalCurrentValue.toLocaleString('en-IN', {maximumFractionDigits:0})}</span>
        </div>
        {totalInvestedValue > 0 && (
          <div className="flex items-center gap-2" style={{color: isProfit ? '#4ade80' : '#f87171'}}>
            {isProfit ? <TrendingUp className="w-4 h-4"/> : <TrendingDown className="w-4 h-4"/>}
            <span className="text-sm font-semibold">
              {isProfit ? '+' : ''}₹{Math.abs(totalProfitLoss).toLocaleString('en-IN', {maximumFractionDigits:0})}
              {' '}({isProfit ? '+' : ''}{totalProfitPercent.toFixed(2)}%)
            </span>
          </div>
        )}
      </div>

      {holdings.length > 0 ? (
        <>
          {/* Diversification */}
          <div className="glass-card p-5 mb-4 animate-slide-up delay-200 relative z-10">
            <h3 className="text-white text-sm mb-4">Diversification</h3>
            <div className="flex h-6 rounded-full overflow-hidden mb-4" style={{border:'1px solid rgba(133,79,108,0.2)'}}>
              {holdings.map((stock, i) => (
                <div key={i} style={{width:`${(stock!.currentValue/totalCurrentValue)*100}%`,
                  background: colorAccents[stock!.stockId] || '#854F6C', opacity:0.9}} />
              ))}
            </div>
            <div className="space-y-1">
              {holdings.map((stock, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{background: colorAccents[stock!.stockId] || '#854F6C'}} />
                    <span style={{color:'rgba(240,230,255,0.7)', fontSize:'0.8rem'}}>{stock!.name}</span>
                  </div>
                  <span style={{color:'rgba(223,182,178,0.55)', fontSize:'0.8rem'}}>
                    {((stock!.currentValue/totalCurrentValue)*100).toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Holdings */}
          <div className="glass-card p-5 mb-4 animate-slide-up delay-300 relative z-10">
            <h3 className="text-white text-sm mb-4">Your Holdings</h3>
            <div className="space-y-2">
              {holdings.map((stock, i) => (
                <div key={i} className="p-4 rounded-xl" style={{background:'rgba(43,18,76,0.4)', border:'1px solid rgba(133,79,108,0.15)'}}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-2xl">{stock!.emoji}</div>
                    <div className="flex-1">
                      <h4 className="text-white text-sm">{stock!.name}</h4>
                      <p style={{color:'rgba(223,182,178,0.45)', fontSize:'0.75rem'}}>
                        Qty: {stock!.quantity} · Avg: ₹{stock!.avgPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span style={{color:'rgba(223,182,178,0.55)', fontSize:'0.8rem'}}>₹{stock!.currentPrice.toFixed(2)}</span>
                    <span className="text-sm font-semibold" style={{color: stock!.pl >= 0 ? '#4ade80' : '#f87171'}}>
                      {stock!.pl >= 0 ? '+' : ''}₹{Math.abs(stock!.pl).toFixed(0)} ({stock!.pl >= 0 ? '+' : ''}{stock!.plPercent.toFixed(2)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Meter */}
          <div className="glass-card p-5 mb-4 animate-slide-up delay-400 relative z-10">
            <h3 className="text-white text-sm mb-4">Risk Level</h3>
            <div className="progress-track w-full h-3 mb-2">
              <div className="h-full rounded-full transition-all duration-700"
                style={{width: riskWidth, background: riskColor, boxShadow:`0 0 10px ${riskColor}66`}} />
            </div>
            <div className="flex justify-between mb-3" style={{color:'rgba(223,182,178,0.4)', fontSize:'0.7rem'}}>
              <span>Low</span><span>Medium</span><span>High</span>
            </div>
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{color:'rgba(223,182,178,0.5)'}} />
              <span style={{color:'rgba(223,182,178,0.55)', fontSize:'0.8rem'}}>
                {riskLevel === 'High' && 'High risk! Consider diversifying across multiple stocks.'}
                {riskLevel === 'Medium' && 'Moderate risk. Adding more stocks can help balance your portfolio.'}
                {riskLevel === 'Low' && 'Well diversified portfolio with balanced risk.'}
              </span>
            </div>
          </div>
        </>
      ) : (
        <div className="glass-card p-8 mb-5 text-center animate-scale-in relative z-10">
          <div className="text-5xl mb-4" style={{filter:'drop-shadow(0 0 20px rgba(133,79,108,0.4))'}}>📊</div>
          <h3 className="text-white text-lg mb-2">No Holdings Yet</h3>
          <p style={{color:'rgba(223,182,178,0.55)', fontSize:'0.875rem', marginBottom:'1.25rem'}}>
            Start trading to build your portfolio!
          </p>
          <button onClick={onBack} className="btn-primary px-8 py-3 text-sm" style={{borderRadius:'0.875rem'}}>
            Start Trading
          </button>
        </div>
      )}

      {/* Tip */}
      <div className="glass-card p-5 relative z-10" style={{borderColor:'rgba(249,115,22,0.25)'}}>
        <h3 className="text-white text-sm mb-1">💡 Portfolio Tip</h3>
        <p style={{color:'rgba(223,182,178,0.6)', fontSize:'0.8rem'}}>
          {holdings.length === 0
            ? "Diversification is key! Spread investments across different sectors."
            : "Review your portfolio regularly but avoid checking it too frequently. Long-term investing requires patience!"}
        </p>
      </div>
    </div>
  );
}
