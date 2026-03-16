import { useState, useEffect, useCallback, useRef } from 'react';
import { availableStocks, Stock } from '../data/stockData';
import { fetchAllLiveStocks, fetchIntradayChart, LiveStockData } from '../services/stockApi';

export type StockStatus = 'loading' | 'live' | 'stale' | 'error';

export interface EnrichedStock extends Stock {
  dayHigh?: number;
  dayLow?: number;
  previousClose?: number;
  volume?: number;
  lastUpdated?: Date;
}

interface UseStockDataReturn {
  stocks: EnrichedStock[];
  chartData: Record<string, number[]>;
  status: StockStatus;
  lastRefreshed: Date | null;
  refresh: () => void;
  getStockById: (id: string) => EnrichedStock | undefined;
}

const REFRESH_INTERVAL_MS = 60_000; // 1 minute

// Start with static data so UI never shows empty
function buildStaticStocks(): EnrichedStock[] {
  return availableStocks.map(s => ({ ...s }));
}

function mergeWithLive(
  base: EnrichedStock[],
  liveMap: Map<string, LiveStockData>
): EnrichedStock[] {
  return base.map(stock => {
    const live = liveMap.get(stock.id);
    if (!live) return stock;
    return {
      ...stock,
      price: live.price,
      change: live.change,
      changePercent: live.changePercent,
      dayHigh: live.dayHigh,
      dayLow: live.dayLow,
      previousClose: live.previousClose,
      volume: live.volume,
      lastUpdated: live.lastUpdated,
    };
  });
}

export function useStockData(): UseStockDataReturn {
  const [stocks, setStocks] = useState<EnrichedStock[]>(buildStaticStocks);
  const [chartData, setChartData] = useState<Record<string, number[]>>({});
  const [status, setStatus] = useState<StockStatus>('loading');
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasFetched = useRef(false);

  const fetchLive = useCallback(async () => {
    try {
      const liveMap = await fetchAllLiveStocks();

      if (liveMap.size === 0) {
        setStatus(hasFetched.current ? 'stale' : 'error');
        return;
      }

      setStocks(prev => mergeWithLive(prev, liveMap));
      setStatus('live');
      setLastRefreshed(new Date());
      
      hasFetched.current = true;
    } catch {
      setStatus(hasFetched.current ? 'stale' : 'error');
    }
  }, []);

  const fetchCharts = useCallback(async () => {
    const entries = await Promise.all(
      availableStocks.map(async s => {
        const data = await fetchIntradayChart(s.id);
        return [s.id, data] as [string, number[]];
      })
    );
    const map: Record<string, number[]> = {};
    entries.forEach(([id, data]) => {
      if (data.length > 0) map[id] = data;
    });
    if (Object.keys(map).length > 0) setChartData(map);
  }, []);

  const refresh = useCallback(() => {
    setStatus('loading');
    fetchLive();
    fetchCharts();
  }, [fetchLive, fetchCharts]);

  useEffect(() => {
    fetchLive();
    fetchCharts();

    intervalRef.current = setInterval(fetchLive, REFRESH_INTERVAL_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fetchLive, fetchCharts]);

  const getStockById = useCallback(
    (id: string) => stocks.find(s => s.id === id),
    [stocks]
  );

  return { stocks, chartData, status, lastRefreshed, refresh, getStockById };
}
