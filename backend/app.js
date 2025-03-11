const express = require('express');
const sequelize = require('./shared/db/sequelize');
const User = require('./microservices/auth_service/models/User');

const app = express();
const PORT = process.env.PORT || 3000;

// Sincronizar el modelo con la base de datos
sequelize.sync({ force: true }) // ¡Cuidado! Esto eliminará y recreará las tablas
  .then(() => {
    console.log('Modelos sincronizados con la base de datos');
  })
  .catch((error) => {
    console.error('Error al sincronizar los modelos:', error);
  });
// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.get('/', (req, res) => {
  res.send('¡Bienvenido a DualSpirit!');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});