const express = require('express');
const app = express();

const PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Bot is alive ✅');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Listening on ${PORT}`);
});




