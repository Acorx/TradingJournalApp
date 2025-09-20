const express = require('express');
const tulind = require('tulind');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { trades, strategy } = req.body;
    const prices = trades.map((t) => t.exitPrice || t.entryPrice);
    const results = tulind.indicators(
      {
        rsi: [14],
        sma: [10],
      },
      prices
    );

    // Simuler la stratégie
    let balance = 1000;
    const backtestResults = trades.map((trade, i) => {
      const signal = results.sma[0][i] > prices[i] ? 'buy' : 'sell';
      balance += trade.profitLoss || 0;
      return { ...trade, signal, balance };
    });

    res.send({ results: backtestResults, finalBalance: balance });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
