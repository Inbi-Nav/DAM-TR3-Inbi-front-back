const express = require('express');
const connectDB = require('./shared/db/mongo');
const app = express();

// Conectar a MongoDB
connectDB();

// Middleware
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Bienvenido a DualSpirit!');
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});