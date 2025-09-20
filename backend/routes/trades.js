const express = require('express');
const router = express.Router();
const { db } = require('../firebaseConfig');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');

const upload = multer({ dest: 'uploads/' });

// Ajouter un trade
router.post('/', async (req, res) => {
  try {
    const { symbol, entryPrice, exitPrice, profit, date, notes } = req.body;
    const docRef = await db.collection('trades').add({
      symbol,
      entryPrice,
      exitPrice,
      profit,
      date,
      notes,
      createdAt: new Date().toISOString(),
    });
    res.status(201).send({ id: docRef.id });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Récupérer tous les trades
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('trades').get();
    const trades = [];
    snapshot.forEach((doc) => trades.push({ id: doc.id, ...doc.data() }));
    res.status(200).send(trades);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Upload d'un fichier CSV
router.post('/upload', upload.single('file'), (req, res) => {
  const results = [];
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      try {
        for (const row of results) {
          await db.collection('trades').add({
            symbol: row.symbol,
            entryPrice: parseFloat(row.entryPrice),
            exitPrice: parseFloat(row.exitPrice),
            profit: parseFloat(row.profit),
            date: row.date,
            notes: row.notes || '',
            createdAt: new Date().toISOString(),
          });
        }
        fs.unlinkSync(req.file.path); // Supprime le fichier après import
        res.status(200).send({ success: true, trades: results });
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
    });
});

module.exports = router;