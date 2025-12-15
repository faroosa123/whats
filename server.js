const express = require('express');
const app = express();
const PORT = process.env.PORT || 0.0.0.0;

app.get('/', (req, res) => {
  res.send('Bot is running!');
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

