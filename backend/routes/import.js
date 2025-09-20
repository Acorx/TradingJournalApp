const express = require('express');
const multer = require('multer');
const XLSX = require('xlsx');
const { db } = require('../firebase');
const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/mt4', upload.single('file'), async (req, res) => {
  try {
    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const trades = XLSX.utils.sheet_to_json(sheet);

    for (const trade of trades) {
      await db.collection('trades').add({
        symbol: trade.Symbol,
        entryPrice: trade.EntryPrice,
        exitPrice: trade.ExitPrice,
        notes: `Importé depuis MT4: ${trade.Notes || ''}`,
        emotion: 'neutre',
        userId: req.user.id,
        createdAt: new Date(),
      });
    }

    res.send({ success: true, count: trades.length });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
