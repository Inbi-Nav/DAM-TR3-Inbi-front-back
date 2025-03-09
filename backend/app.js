// backend/app.js
const express = require('express');
const sequelize = require('./shared/db/sequelize');
const User = require('./microservices/auth_service/models/User');

const app = express();

// Sincronizar el modelo con la base de datos
sequelize
  .sync({ force: false }) // force: true borra y recrea las tablas (¡cuidado!)
  .then(() => {
    console.log('Modelos sincronizados con la base de datos.');
  })
  .catch((error) => {
    console.error('Error al sincronizar modelos:', error);
  });

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Bienvenido a DualSpirit!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});