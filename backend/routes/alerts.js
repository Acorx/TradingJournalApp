const express = require('express');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const router = express.Router();

router.post('/email', async (req, res) => {
  const { email, subject, text } = req.body;
  const msg = {
    to: email,
    from: 'noreply@tradingjournalapp.com',
    subject,
    text,
  };
  try {
    await sgMail.send(msg);
    res.send({ success: true });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
