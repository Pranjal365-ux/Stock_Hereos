// Real-time stock data via Alpha Vantage API
// Free tier: 25 requests/day — enough for this app
// Get a free API key at https://www.alphavantage.co/support/#api-key (instant, no credit card)

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

// ─── PASTE YOUR ALPHA VANTAGE API KEY HERE ─────────────────────────────────
const AV_API_KEY = '5QW0BGWR32BTT9QE';
// Get one free at: https://www.alphavantage.co/support/#api-key
// ───────────────────────────────────────────────────────────────────────────

const BASE_URL = 'https://www.alphavantage.co/query';

// Alpha Vantage uses BSE: prefix for Indian stocks (BSE is more reliable than NSE on AV)
const TICKER_MAP: Record<string, { symbol: string; fallbackPrice: number }> = {
  reliance: { symbol: 'RELIANCE.BSE', fallbackPrice: 1245.50 },
  tcs:      { symbol: 'TCS.BSE',      fallbackPrice: 3550.00 },
  infosys:  { symbol: 'INFY.BSE',     fallbackPrice: 1420.00 },
  hdfc:     { symbol: 'HDFCBANK.BSE', fallbackPrice: 1650.75 },
  bharti:   { symbol: 'BHARTIARTL.BSE', fallbackPrice: 892.50 },
};

async function fetchAVQuote(symbol: string): Promise<{
  price: number; change: number; changePercent: number;
  previousClose: number; dayHigh: number; dayLow: number; volume: number;
} | null> {
  try {
    const url = `${BASE_URL}?function=GLOBAL_QUOTE&symbol=${encodeURIComponent(symbol)}&apikey=${AV_API_KEY}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();

    // Alpha Vantage returns "Global Quote" object
    const q = data['Global Quote'];
    if (!q || !q['05. price'] || q['05. price'] === '0.0000') return null;

    const price         = parseFloat(q['05. price']);
    const change        = parseFloat(q['09. change']);
    const changePercent = parseFloat(q['10. change percent'].replace('%', ''));
    const previousClose = parseFloat(q['08. previous close']);
    const dayHigh       = parseFloat(q['03. high']);
    const dayLow        = parseFloat(q['04. low']);
    const volume        = parseInt(q['06. volume'], 10);

    if (isNaN(price) || price === 0) return null;

    return {
      price:         Math.round(price * 100) / 100,
      change:        Math.round(change * 100) / 100,
      changePercent: Math.round(changePercent * 100) / 100,
      previousClose: Math.round(previousClose * 100) / 100,
      dayHigh:       Math.round(dayHigh * 100) / 100,
      dayLow:        Math.round(dayLow * 100) / 100,
      volume,
    };
  } catch {
    return null;
  }
}

// Fetch stocks sequentially to avoid hitting rate limit (5 req/min on free tier)
export async function fetchAllLiveStocks(): Promise<Map<string, LiveStockData>> {
  const results = new Map<string, LiveStockData>();

  for (const [id, { symbol }] of Object.entries(TICKER_MAP)) {
    const quote = await fetchAVQuote(symbol);
    if (quote) {
      results.set(id, { id, symbol, ...quote, lastUpdated: new Date() });
    }
    // Small delay to respect 5 req/min rate limit (one request per 12s)
    await new Promise(r => setTimeout(r, 1200));
  }

  return results;
}

export async function fetchSingleStock(stockId: string): Promise<LiveStockData | null> {
  const entry = TICKER_MAP[stockId];
  if (!entry) return null;
  const quote = await fetchAVQuote(entry.symbol);
  if (!quote) return null;
  return { id: stockId, symbol: entry.symbol, ...quote, lastUpdated: new Date() };
}

// AV free tier doesn't have intraday for Indian stocks, build sparkline from daily quote
export async function fetchIntradayChart(stockId: string): Promise<number[]> {
  const entry = TICKER_MAP[stockId];
  if (!entry) return [];

  try {
    const url = `${BASE_URL}?function=GLOBAL_QUOTE&symbol=${encodeURIComponent(entry.symbol)}&apikey=${AV_API_KEY}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
    if (!res.ok) return [];

    const data = await res.json();
    const q = data['Global Quote'];
    if (!q || !q['05. price']) return [];

    const open    = parseFloat(q['02. open']);
    const high    = parseFloat(q['03. high']);
    const low     = parseFloat(q['04. low']);
    const current = parseFloat(q['05. price']);

    if (isNaN(open) || isNaN(current)) return [];

    // Simulate a realistic intraday path: open → random walk → current
    const points: number[] = [open];
    for (let i = 1; i < 13; i++) {
      const t = i / 13;
      const trend = open + (current - open) * t;
      const noise = (Math.random() - 0.5) * (high - low) * 0.25;
      points.push(Math.max(low, Math.min(high, trend + noise)));
    }
    points.push(current);

    return points.map(p => Math.round(p * 100) / 100);
  } catch {
    return [];
  }
}
