import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getTrades } from '../lib/firebase';

export default function PerformanceChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const trades = await getTrades({});
      const dailyPL = trades.reduce((acc, trade) => {
        const date = trade.createdAt.toDate().toISOString().split('T')[0];
        if (!acc[date]) acc[date] = 0;
        acc[date] += trade.profitLoss || 0;
        return acc;
      }, {});
      setData(Object.entries(dailyPL).map(([date, pl]) => ({ date, pl })));
    };
    fetchData();
  }, []);

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pl" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
