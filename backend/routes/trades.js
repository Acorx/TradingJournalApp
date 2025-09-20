const express = require('express');
const { db } = require('../firebase');
const router = express.Router();

// Ajouter un trade
router.post('/', async (req, res) => {
  try {
    const { symbol, entryPrice, exitPrice, notes, emotion, userId } = req.body;
    const tradeRef = db.collection('trades').doc();
    const profitLoss = exitPrice ? (exitPrice - entryPrice) : null;
    await tradeRef.set({
      symbol,
      entryPrice,
      exitPrice,
      notes,
      emotion,
      userId,
      profitLoss,
      createdAt: new Date(),
    });
    res.status(201).send({ id: tradeRef.id });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Lister les trades (avec filtres)
router.get('/', async (req, res) => {
  try {
    const { symbol, emotion } = req.query;
    let q = db.collection('trades');
    if (symbol) q = q.where('symbol', '==', symbol);
    if (emotion) q = q.where('emotion', '==', emotion);
    const snapshot = await q.get();
    const trades = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.send(trades);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = router;
