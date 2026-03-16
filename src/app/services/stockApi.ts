// Real-time stock data via Finnhub API
// Supports NSE India — no CORS proxy needed, direct browser requests work
// Get a free API key at https://finnhub.io/register (takes 30 seconds)
//
// NSE symbols on Finnhub use format: NSE:RELIANCE, NSE:TCS etc.

export interface LiveStockData {
  id: string;
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  previousClose: number;
  dayHigh: number;
  dayLow: number;
  volume: number;
  lastUpdated: Date;
}

// ─── PASTE YOUR FINNHUB API KEY HERE ───────────────────────────────────────
const FINNHUB_API_KEY = 'YOUR_FINNHUB_API_KEY';
// ───────────────────────────────────────────────────────────────────────────

const BASE_URL = 'https://finnhub.io/api/v1';

// Finnhub uses NSE: prefix for Indian stocks
const TICKER_MAP: Record<string, string> = {
  reliance: 'NSE:RELIANCE',
  tcs:      'NSE:TCS',
  infosys:  'NSE:INFY',
  hdfc:     'NSE:HDFCBANK',
  bharti:   'NSE:BHARTIARTL',
};

// Finnhub quote response fields:
// c = current price, d = change, dp = change%, h = high, l = low, o = open, pc = prev close
async function fetchFinnhubQuote(ticker: string): Promise<{
  price: number; change: number; changePercent: number;
  previousClose: number; dayHigh: number; dayLow: number; volume: number;
} | null> {
  try {
    const url = `${BASE_URL}/quote?symbol=${encodeURIComponent(ticker)}&token=${FINNHUB_API_KEY}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();

    // Finnhub returns c=0 when market is closed or symbol not found
    if (!data.c || data.c === 0) return null;

    return {
      price:         Math.round(data.c * 100) / 100,
      change:        Math.round(data.d * 100) / 100,
      changePercent: Math.round(data.dp * 100) / 100,
      previousClose: Math.round(data.pc * 100) / 100,
      dayHigh:       Math.round(data.h * 100) / 100,
      dayLow:        Math.round(data.l * 100) / 100,
      volume:        0, // Finnhub free tier doesn't include volume in quote endpoint
    };
  } catch {
    return null;
  }
}

export async function fetchAllLiveStocks(): Promise<Map<string, LiveStockData>> {
  const results = new Map<string, LiveStockData>();

  // Fetch all stocks in parallel
  await Promise.all(
    Object.entries(TICKER_MAP).map(async ([id, ticker]) => {
      const quote = await fetchFinnhubQuote(ticker);
      if (quote) {
        results.set(id, { id, symbol: ticker, ...quote, lastUpdated: new Date() });
      }
    })
  );

  return results;
}

export async function fetchSingleStock(stockId: string): Promise<LiveStockData | null> {
  const ticker = TICKER_MAP[stockId];
  if (!ticker) return null;
  const quote = await fetchFinnhubQuote(ticker);
  if (!quote) return null;
  return { id: stockId, symbol: ticker, ...quote, lastUpdated: new Date() };
}

// Finnhub candle endpoint for intraday chart (free tier supports D resolution)
// For intraday we use the quote + a simple simulated sparkline from open→current
export async function fetchIntradayChart(stockId: string): Promise<number[]> {
  const ticker = TICKER_MAP[stockId];
  if (!ticker) return [];

  try {
    const url = `${BASE_URL}/quote?symbol=${encodeURIComponent(ticker)}&token=${FINNHUB_API_KEY}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) return [];

    const data = await res.json();
    if (!data.c || data.c === 0) return [];

    // Build a simple open→current sparkline (free tier doesn't have intraday candles)
    const open = data.o ?? data.pc;
    const current = data.c;
    const high = data.h;
    const low = data.l;

    // Generate 14 realistic-looking data points between open and current
    const points: number[] = [];
    for (let i = 0; i < 14; i++) {
      const t = i / 13;
      const base = open + (current - open) * t;
      // Add some realistic noise
      const noise = (Math.random() - 0.5) * (high - low) * 0.3;
      points.push(Math.max(low, Math.min(high, base + noise)));
    }
    points[points.length - 1] = current; // last point is always current price

    return points.map(p => Math.round(p * 100) / 100);
  } catch {
    return [];
  }
}
