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

export default function MT4Integration() {
  const [file, setFile] = useState<File | null>(null);
  const [trades, setTrades] = useState<Trade[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const lines = content.split('\n');
      const newTrades: Trade[] = [];

      // Exemple de parsing pour un fichier CSV MT4/MT5
      for (let i = 1; i < lines.length; i++) {
        const [date, symbol, entryPrice, exitPrice, profit, notes] = lines[i].split(',');
        if (symbol) {
          newTrades.push({
            id: Date.now().toString() + i,
            symbol: symbol.trim(),
            entryPrice: parseFloat(entryPrice),
            exitPrice: parseFloat(exitPrice),
            profit: parseFloat(profit),
            date: date.trim(),
            notes: notes?.trim() || '',
          });
        }
      }

      setTrades(newTrades);
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <Head>
        <title>Intégration MT4/MT5</title>
      </Head>
      <h1 className="text-3xl font-bold mb-6">Intégration MT4/MT5</h1>

      <div className="bg-gray-800 p-4 rounded-lg mb-8">
        <h2 className="text-xl font-bold mb-4">Importer un fichier CSV</h2>
        <div className="flex items-center gap-4">
          <input type="file" accept=".csv" onChange={handleFileChange} className="p-2 rounded bg-gray-700" />
          <button onClick={handleUpload} className="bg-blue-600 text-white p-2 rounded">
            Importer
          </button>
        </div>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Trades Importés</h2>
        {trades.length === 0 ? (
          <p>Aucun trade importé.</p>
        ) : (
          <ul>
            {trades.map((trade) => (
              <li key={trade.id} className="mb-2 p-2 border-b border-gray-700">
                <p><strong>{trade.symbol}</strong> - {trade.date}</p>
                <p>Entrée: {trade.entryPrice}, Sortie: {trade.exitPrice}, Profit: <span className={trade.profit >= 0 ? 'text-green-500' : 'text-red-500'}>{trade.profit}</span></p>
                <p>Notes: {trade.notes}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}