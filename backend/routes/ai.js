const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/analyze', async (req, res) => {
  const { trades, question } = req.body;
  try {
    const response = await axios.post('https://api.mistral.ai/v1/chat', {
      model: 'mistral-tiny',
      messages: [
        {
          role: 'user',
          content: `Analyse ces trades et réponds à la question suivante : "${question}".
          Trades: ${JSON.stringify(trades)}`,
        },
      ],
    });
    res.send({ analysis: response.data.choices[0].message.content });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
