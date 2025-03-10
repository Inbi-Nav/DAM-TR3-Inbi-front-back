const express = require('express');
const connectDB = require('./shared/db/mongo');
const sequelize = require('./shared/db/sequelize');
const app = express();

connectDB();

sequelize.sync({ alter: true }).then(() => {
  console.log('Modelos de Sequelize sincronizados');
});

app.use(express.json());

app.get('/', (req, res) => {
  res.send('¡Bienvenido a DualSpirit!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});