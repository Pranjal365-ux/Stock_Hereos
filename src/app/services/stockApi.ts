// Real-time stock data via Yahoo Finance (no API key required)
// NSE tickers use ".NS" suffix, e.g. RELIANCE.NS

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

const TICKER_MAP: Record<string, string> = {
  reliance:  'RELIANCE.NS',
  tcs:       'TCS.NS',
  infosys:   'INFY.NS',
  hdfc:      'HDFCBANK.NS',
  bharti:    'BHARTIARTL.NS',
};

// Yahoo Finance v8 chart endpoint - no auth required, works from browser
async function fetchYahooQuote(ticker: string): Promise<{
  price: number;
  change: number;
  changePercent: number;
  previousClose: number;
  dayHigh: number;
  dayLow: number;
  volume: number;
} | null> {
  try {
    // Use a CORS proxy since Yahoo doesn't allow direct browser requests
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=1d&range=1d`;
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;

    const res = await fetch(proxyUrl, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    const result = data?.chart?.result?.[0];
    if (!result) return null;

    const meta = result.meta;
    const price = meta.regularMarketPrice ?? meta.previousClose;
    const previousClose = meta.previousClose ?? meta.chartPreviousClose;
    const change = price - previousClose;
    const changePercent = (change / previousClose) * 100;

    return {
      price: Math.round(price * 100) / 100,
      change: Math.round(change * 100) / 100,
      changePercent: Math.round(changePercent * 100) / 100,
      previousClose: Math.round(previousClose * 100) / 100,
      dayHigh: Math.round((meta.regularMarketDayHigh ?? price) * 100) / 100,
      dayLow: Math.round((meta.regularMarketDayLow ?? price) * 100) / 100,
      volume: meta.regularMarketVolume ?? 0,
    };
  } catch {
    return null;
  }
}

export async function fetchAllLiveStocks(): Promise<Map<string, LiveStockData>> {
  const results = new Map<string, LiveStockData>();

  await Promise.all(
    Object.entries(TICKER_MAP).map(async ([id, ticker]) => {
      const quote = await fetchYahooQuote(ticker);
      if (quote) {
        results.set(id, {
          id,
          symbol: ticker,
          ...quote,
          lastUpdated: new Date(),
        });
      }
    })
  );

  return results;
}

export async function fetchSingleStock(stockId: string): Promise<LiveStockData | null> {
  const ticker = TICKER_MAP[stockId];
  if (!ticker) return null;

  const quote = await fetchYahooQuote(ticker);
  if (!quote) return null;

  return { id: stockId, symbol: ticker, ...quote, lastUpdated: new Date() };
}

// Returns intraday chart data points (up to 30 data points for today)
export async function fetchIntradayChart(stockId: string): Promise<number[]> {
  const ticker = TICKER_MAP[stockId];
  if (!ticker) return [];

  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=5m&range=1d`;
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;

    const res = await fetch(proxyUrl, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) return [];

    const data = await res.json();
    const closes = data?.chart?.result?.[0]?.indicators?.quote?.[0]?.close ?? [];

    // Filter out nulls and return last 30 points
    const valid = closes.filter((v: number | null) => v !== null) as number[];
    return valid.slice(-30).map((v: number) => Math.round(v * 100) / 100);
  } catch {
    return [];
  }
}
