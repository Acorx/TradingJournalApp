import PerformanceChart from '../components/PerformanceChart';
import AIChatbot from '../components/AIChatbot';
import { getTrades } from '../lib/firebase';
import { useEffect, useState } from 'react';

export default function AnalysisPage() {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    const fetchTrades = async () => {
      const data = await getTrades({});
      setTrades(data);
    };
    fetchTrades();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Analyse des Trades</h1>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Performance</h2>
          <PerformanceChart />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Assistant IA</h2>
          <AIChatbot trades={trades} />
        </div>
      </div>
    </div>
  );
}
