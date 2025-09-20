import { useState } from 'react';
import Head from 'next/head';

interface Trade {
  id?: string;
  symbol: string;
  entryPrice: number;
  exitPrice: number;
  profit: number;
  date: string;
  notes: string;
}

export default function Journal() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [form, setForm] = useState<Trade>({
    symbol: '',
    entryPrice: 0,
    exitPrice: 0,
    profit: 0,
    date: new Date().toISOString().split('T')[0],
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTrades([...trades, { ...form, id: Date.now().toString() }]);
    setForm({ symbol: '', entryPrice: 0, exitPrice: 0, profit: 0, date: new Date().toISOString().split('T')[0], notes: '' });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <Head>
        <title>Journal de Trading</title>
      </Head>
      <h1 className="text-3xl font-bold mb-6">Journal de Trading</h1>
      
      <form onSubmit={handleSubmit} className="mb-8 bg-gray-800 p-4 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Symbole (ex: BTC/USD)"
            value={form.symbol}
            onChange={(e) => setForm({ ...form, symbol: e.target.value })}
            className="p-2 rounded bg-gray-700"
            required
          />
          <input
            type="number"
            placeholder="Prix d'entrée"
            value={form.entryPrice}
            onChange={(e) => setForm({ ...form, entryPrice: parseFloat(e.target.value) })}
            className="p-2 rounded bg-gray-700"
            required
          />
          <input
            type="number"
            placeholder="Prix de sortie"
            value={form.exitPrice}
            onChange={(e) => setForm({ ...form, exitPrice: parseFloat(e.target.value) })}
            className="p-2 rounded bg-gray-700"
            required
          />
          <input
            type="number"
            placeholder="Profit"
            value={form.profit}
            onChange={(e) => setForm({ ...form, profit: parseFloat(e.target.value) })}
            className="p-2 rounded bg-gray-700"
            required
          />
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="p-2 rounded bg-gray-700"
            required
          />
          <textarea
            placeholder="Notes"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            className="p-2 rounded bg-gray-700 col-span-2"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white p-2 rounded w-full">
          Ajouter le Trade
        </button>
      </form>

      <div className="bg-gray-800 p-4 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Historique des Trades</h2>
        {trades.length === 0 ? (
          <p>Aucun trade enregistré.</p>
        ) : (
          <ul>
            {trades.map((trade) => (
              <li key={trade.id} className="mb-2 p-2 border-b border-gray-700">
                <p><strong>{trade.symbol}</strong> - {trade.date}</p>
                <p>Entrée: {trade.entryPrice}, Sortie: {trade.exitPrice}, Profit: {trade.profit}</p>
                <p>Notes: {trade.notes}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}