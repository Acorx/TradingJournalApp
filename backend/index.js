const express = require('express');
const cors = require('cors');
const tradesRoutes = require('./routes/trades');
const importRoutes = require('./routes/import');
const backtestRoutes = require('./routes/backtest');
const alertsRoutes = require('./routes/alerts');
const aiRoutes = require('./routes/ai');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/trades', tradesRoutes);
app.use('/api/import', importRoutes);
app.use('/api/backtest', backtestRoutes);
app.use('/api/alerts', alertsRoutes);
app.use('/api/ai', aiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
