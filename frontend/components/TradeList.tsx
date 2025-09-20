import { useState, useEffect } from 'react';
import { getTrades } from '../lib/firebase';

export default function TradeList() {
  const [trades, setTrades] = useState([]);
  const [filter, setFilter] = useState({ symbol: '', emotion: '' });

  useEffect(() => {
    const fetchTrades = async () => {
      const data = await getTrades(filter);
      setTrades(data);
    };
    fetchTrades();
  }, [filter]);

  return (
    <div>
      <div className="flex space-x-4 mb-4">
        <input
          placeholder="Filtrer par symbole"
          value={filter.symbol}
          onChange={(e) => setFilter({ ...filter, symbol: e.target.value })}
          className="p-2 border rounded"
        />
        <select
          value={filter.emotion}
          onChange={(e) => setFilter({ ...filter, emotion: e.target.value })}
          className="p-2 border rounded"
        >
          <option value="">Toutes émotions</option>
          <option value="confiant">Confiant</option>
          <option value="stressé">Stressé</option>
        </select>
      </div>
      <table className="w-full">
        <thead>
          <tr>
            <th>Symbole</th>
            <th>Entrée</th>
            <th>Sortie</th>
            <th>P&L</th>
            <th>Émotion</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade) => (
            <tr key={trade.id}>
              <td>{trade.symbol}</td>
              <td>{trade.entryPrice}</td>
              <td>{trade.exitPrice || '-'}</td>
              <td className={trade.profitLoss >= 0 ? 'text-green-500' : 'text-red-500'}>
                {trade.profitLoss?.toFixed(2)}
              </td>
              <td>{trade.emotion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}