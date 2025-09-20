import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Trade {
  id?: string;
  symbol: string;
  entryPrice: number;
  exitPrice: number;
  profit: number;
  date: string;
  notes: string;
}

export default function Analyse() {
  const [trades, setTrades] = useState<Trade[]>([]);
  
  // Exemple de données pour les graphiques
  useEffect(() => {
    const exampleTrades: Trade[] = [
      { id: '1', symbol: 'BTC/USD', entryPrice: 50000, exitPrice: 52000, profit: 2000, date: '2023-01-01', notes: 'Premier trade' },
      { id: '2', symbol: 'ETH/USD', entryPrice: 3000, exitPrice: 2900, profit: -100, date: '2023-01-02', notes: 'Perte' },
      { id: '3', symbol: 'BTC/USD', entryPrice: 52000, exitPrice: 55000, profit: 3000, date: '2023-01-03', notes: 'Gros gain' },
    ];
    setTrades(exampleTrades);
  }, []);

  // Calcul des statistiques
  const totalProfit = trades.reduce((sum, trade) => sum + trade.profit, 0);
  const winRate = (trades.filter(trade => trade.profit > 0).length / trades.length) * 100 || 0;

  // Données pour le graphique
  const chartData = {
    labels: trades.map(trade => trade.symbol),
    datasets: [
      {
        label: 'Profit par Trade',
        data: trades.map(trade => trade.profit),
        backgroundColor: trades.map(trade => trade.profit > 0 ? 'rgba(75, 192, 192, 0.6)' : 'rgba(255, 99, 132, 0.6)'),
        borderColor: trades.map(trade => trade.profit > 0 ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)'),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <Head>
        <title>Analyse de Performance</title>
      </Head>
      <h1 className="text-3xl font-bold mb-6">Analyse de Performance</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Profit Total</h2>
          <p className={`text-2xl ${totalProfit >= 0 ? 'text-green-500' : 'text-red-500'}`}>{totalProfit} USD</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Taux de Réussite</h2>
          <p className="text-2xl text-blue-500">{winRate.toFixed(2)}%</p>
        </div>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg mb-8">
        <h2 className="text-xl font-bold mb-4">Profit par Trade</h2>
        <div className="h-96">
          <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Historique des Trades</h2>
        {trades.length === 0 ? (
          <p>Aucun trade enregistré.</p>
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