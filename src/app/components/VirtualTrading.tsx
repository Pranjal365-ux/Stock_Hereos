import { useState } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, ChevronRight, RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { PortfolioHolding } from '../App';
import { useStockData, StockStatus } from '../hooks/useStockData';

interface VirtualTradingProps {
  onBack: () => void;
  virtualCash: number;
  portfolio: PortfolioHolding[];
  onBuyStock: (stockId: string, quantity: number, price: number) => { success: boolean; message: string };
  onSellStock: (stockId: string, quantity: number, price: number) => { success: boolean; message: string };
}

function StatusBadge({ status, lastRefreshed, onRefresh }: { status: StockStatus; lastRefreshed: Date | null; onRefresh: () => void }) {
  const isLive = status === 'live';
  const isLoading = status === 'loading';
  return (
    <button onClick={onRefresh} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all"
      style={{ background: isLive ? 'rgba(34,197,94,0.15)' : isLoading ? 'rgba(251,191,36,0.15)' : 'rgba(239,68,68,0.15)', border: `1px solid ${isLive ? 'rgba(34,197,94,0.35)' : isLoading ? 'rgba(251,191,36,0.35)' : 'rgba(239,68,68,0.35)'}` }}>
      {isLive && <Wifi className="w-3 h-3" style={{ color: '#4ade80' }} />}
      {(status === 'error' || status === 'stale') && <WifiOff className="w-3 h-3" style={{ color: '#f87171' }} />}
      {isLoading && <RefreshCw className="w-3 h-3 animate-spin" style={{ color: '#fbbf24' }} />}
      <span style={{ fontSize: '0.7rem', color: isLive ? '#4ade80' : isLoading ? '#fbbf24' : '#f87171', fontWeight: 600 }}>
        {isLive ? 'LIVE' : isLoading ? 'FETCHING…' : 'OFFLINE'}
      </span>
      {isLive && lastRefreshed && (
        <span style={{ fontSize: '0.65rem', color: 'rgba(74,222,128,0.6)' }}>
          {lastRefreshed.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
        </span>
      )}
    </button>
  );
}

export default function VirtualTrading({ onBack, virtualCash, portfolio, onBuyStock, onSellStock }: VirtualTradingProps) {
  const { stocks, chartData, status, lastRefreshed, refresh, getStockById } = useStockData();
  const [selectedStockId, setSelectedStockId] = useState(stocks[0]?.id ?? 'reliance');
  const [quantity, setQuantity] = useState(1);
  const [showStockList, setShowStockList] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const selectedStock = getStockById(selectedStockId);
  const holding = portfolio.find(h => h.stockId === selectedStockId);

  const rawChart = chartData[selectedStockId] ?? [];
  const chartPoints = rawChart.length >= 2
    ? (() => {
        const min = Math.min(...rawChart), max = Math.max(...rawChart), range = max - min || 1;
        return rawChart.map(v => Math.round(((v - min) / range) * 85 + 10));
      })()
    : [45, 52, 48, 65, 70, 68, 75, 80, 78, 85, 90, 88, 95, 100];

  if (!selectedStock) return null;

  const handleBuy = () => {
    const result = onBuyStock(selectedStockId, quantity, selectedStock.price);
    setMessage({ text: result.message, type: result.success ? 'success' : 'error' });
    if (result.success) setQuantity(1);
    setTimeout(() => setMessage(null), 3000);
  };
  const handleSell = () => {
    const result = onSellStock(selectedStockId, quantity, selectedStock.price);
    setMessage({ text: result.message, type: result.success ? 'success' : 'error' });
    if (result.success) setQuantity(1);
    setTimeout(() => setMessage(null), 3000);
  };

  const isPositive = selectedStock.changePercent >= 0;

  return (
    <div className="screen-bg min-h-screen p-6">
      <div className="ambient-orb w-64 h-64 bg-blue-700/15 top-0 right-0" style={{ position: 'absolute' }} />
      <div className="mb-5 animate-slide-up relative z-10">
        <button onClick={onBack} className="back-btn mb-4"><ArrowLeft className="w-4 h-4" /><span>Back</span></button>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="badge badge-gold">⚡ Virtual Market – Practice Mode</span>
          <StatusBadge status={status} lastRefreshed={lastRefreshed} onRefresh={refresh} />
        </div>
        <div className="glass-card px-4 py-2 inline-flex items-center gap-2 mt-3">
          <span style={{ color: 'rgba(223,182,178,0.55)', fontSize: '0.8rem' }}>Cash:</span>
          <span className="text-white text-base font-semibold">₹{virtualCash.toLocaleString()}</span>
        </div>
      </div>

      {message && (
        <div className="mb-4 p-4 rounded-2xl text-white text-sm animate-scale-in relative z-10"
          style={{ background: message.type === 'success' ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)', border: `1px solid ${message.type === 'success' ? 'rgba(34,197,94,0.4)' : 'rgba(239,68,68,0.4)'}`, backdropFilter: 'blur(10px)' }}>
          {message.text}
        </div>
      )}

      <div className="glass-card p-4 mb-4 relative z-10 animate-slide-up delay-100">
        <button onClick={() => setShowStockList(!showStockList)} className="w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{selectedStock.emoji}</div>
            <div className="text-left">
              <h3 className="text-white text-base">{selectedStock.name}</h3>
              <p style={{ color: 'rgba(223,182,178,0.5)', fontSize: '0.8rem' }}>{selectedStock.symbol}</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 transition-transform" style={{ color: 'rgba(223,182,178,0.5)', transform: showStockList ? 'rotate(90deg)' : 'rotate(0deg)' }} />
        </button>
        {showStockList && (
          <div className="mt-4 space-y-1 pt-4" style={{ borderTop: '1px solid rgba(133,79,108,0.2)' }}>
            {stocks.map(stock => (
              <button key={stock.id} onClick={() => { setSelectedStockId(stock.id); setShowStockList(false); setQuantity(1); }}
                className="w-full flex items-center gap-3 p-3 rounded-xl transition-all"
                style={{ background: stock.id === selectedStockId ? 'rgba(133,79,108,0.3)' : 'transparent', border: stock.id === selectedStockId ? '1px solid rgba(223,182,178,0.2)' : '1px solid transparent' }}>
                <div className="text-2xl">{stock.emoji}</div>
                <div className="flex-1 text-left">
                  <h4 className="text-white text-sm">{stock.name}</h4>
                  <p style={{ color: 'rgba(223,182,178,0.45)', fontSize: '0.75rem' }}>{stock.symbol}</p>
                </div>
                <div className="text-right">
                  <p className="text-white text-sm">₹{stock.price.toFixed(2)}</p>
                  <p className="text-xs" style={{ color: stock.changePercent >= 0 ? '#4ade80' : '#f87171' }}>
                    {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="glass-card p-5 mb-4 animate-slide-up delay-200 relative z-10">
        <div className="flex items-end gap-2 mb-1">
          <span className="text-white text-3xl font-semibold">₹{selectedStock.price.toFixed(2)}</span>
          <div className="flex items-center gap-1" style={{ color: isPositive ? '#4ade80' : '#f87171' }}>
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span className="text-sm">{isPositive ? '+' : ''}₹{Math.abs(selectedStock.change).toFixed(2)} ({isPositive ? '+' : ''}{selectedStock.changePercent.toFixed(2)}%)</span>
          </div>
        </div>
        <p style={{ color: 'rgba(223,182,178,0.45)', fontSize: '0.8rem' }}>{status === 'live' ? '🟢 Live market data' : '⚠️ Cached data'}</p>
        {selectedStock.dayHigh && (
          <div className="flex gap-4 mt-3 pt-3" style={{ borderTop: '1px solid rgba(133,79,108,0.2)' }}>
            <div><p style={{ color: 'rgba(223,182,178,0.45)', fontSize: '0.7rem' }}>Day High</p><p className="text-white text-sm font-medium">₹{selectedStock.dayHigh.toFixed(2)}</p></div>
            <div><p style={{ color: 'rgba(223,182,178,0.45)', fontSize: '0.7rem' }}>Day Low</p><p className="text-white text-sm font-medium">₹{selectedStock.dayLow?.toFixed(2)}</p></div>
            {selectedStock.previousClose && <div><p style={{ color: 'rgba(223,182,178,0.45)', fontSize: '0.7rem' }}>Prev. Close</p><p className="text-white text-sm font-medium">₹{selectedStock.previousClose.toFixed(2)}</p></div>}
          </div>
        )}
        {holding && holding.quantity > 0 && (
          <div className="mt-3 pt-3" style={{ borderTop: '1px solid rgba(133,79,108,0.2)' }}>
            <p style={{ color: 'rgba(223,182,178,0.6)', fontSize: '0.85rem' }}>You own: <span style={{ color: '#c084fc', fontWeight: 600 }}>{holding.quantity} shares</span></p>
            <p style={{ color: 'rgba(223,182,178,0.6)', fontSize: '0.85rem' }}>Avg. price: ₹{holding.avgPrice.toFixed(2)}</p>
          </div>
        )}
      </div>

      <div className="glass-card p-5 mb-4 animate-slide-up delay-300 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white text-sm">{rawChart.length >= 2 ? "Today's Intraday Chart" : 'Price Chart'}</h3>
          {rawChart.length >= 2 && <span style={{ color: 'rgba(223,182,178,0.4)', fontSize: '0.7rem' }}>{rawChart.length} data points · 5min</span>}
        </div>
        <div className="h-32 flex items-end gap-0.5">
          {chartPoints.map((value, i) => (
            <div key={i} className="flex-1 rounded-t transition-all"
              style={{ height: `${value}%`, background: `linear-gradient(180deg, ${isPositive ? 'rgba(74,222,128,0.8)' : 'rgba(248,113,113,0.8)'}, ${isPositive ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'})`, boxShadow: i === chartPoints.length - 1 ? `0 0 8px ${isPositive ? 'rgba(74,222,128,0.5)' : 'rgba(248,113,113,0.5)'}` : 'none' }} />
          ))}
        </div>
        <div className="flex justify-between mt-2" style={{ color: 'rgba(223,182,178,0.35)', fontSize: '0.7rem' }}><span>Open</span><span>Now</span></div>
      </div>

      <div className="glass-card p-5 mb-5 animate-slide-up delay-400 relative z-10">
        <h3 className="text-white text-sm mb-4">Quantity</h3>
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="btn-ghost w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold">−</button>
          <span className="text-white text-3xl font-semibold">{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)} className="btn-ghost w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold">+</button>
        </div>
        <div className="rounded-xl p-3 text-center" style={{ background: 'rgba(82,43,91,0.3)', border: '1px solid rgba(133,79,108,0.2)' }}>
          <p style={{ color: 'rgba(223,182,178,0.55)', fontSize: '0.8rem', marginBottom: '0.2rem' }}>Total Value</p>
          <p className="text-white text-xl font-semibold">₹{(selectedStock.price * quantity).toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 relative z-10">
        <button onClick={handleBuy} disabled={(selectedStock.price * quantity) > virtualCash}
          className="py-4 rounded-2xl font-semibold text-white transition-all"
          style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.8), rgba(21,128,61,0.9))', border: '1px solid rgba(34,197,94,0.4)', boxShadow: '0 4px 20px rgba(34,197,94,0.25)', opacity: (selectedStock.price * quantity) > virtualCash ? 0.4 : 1 }}>
          Buy
        </button>
        <button onClick={handleSell} disabled={!holding || holding.quantity < quantity}
          className="py-4 rounded-2xl font-semibold text-white transition-all"
          style={{ background: 'linear-gradient(135deg, rgba(239,68,68,0.8), rgba(185,28,28,0.9))', border: '1px solid rgba(239,68,68,0.4)', boxShadow: '0 4px 20px rgba(239,68,68,0.25)', opacity: (!holding || holding.quantity < quantity) ? 0.4 : 1 }}>
          Sell
        </button>
      </div>
      {(selectedStock.price * quantity) > virtualCash && <p className="text-center mt-3 text-sm" style={{ color: 'rgba(248,113,113,0.7)' }}>Insufficient funds to buy</p>}
      {holding && holding.quantity < quantity && <p className="text-center mt-3 text-sm" style={{ color: 'rgba(248,113,113,0.7)' }}>Not enough shares to sell</p>}
    </div>
  );
}
