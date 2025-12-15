const express = require('express');
const app = express();

// Render provides the PORT automatically
const PORT = process.env.PORT || 3000;

// Basic route so Render + Uptime checks pass
app.get('/', (req, res) => {
  res.send('WhatsApp Voicemail Bot is running ✅');
});

// IMPORTANT: bind to 0.0.0.0
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});



