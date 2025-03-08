const express = require('express');
const connectDB = require('./shared/db/mongo');
const app = express();

connectDB();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('¡Bienvenido a DualSpirit!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});