const express = require('express');
const authRoutes = require('./routes/authRoutes');
const sequelize = require('../shared/db/sequelize');

const startServer = async () => {
  try {
    await sequelize.sync({ force: true });

    const app = express();
    const PORT = process.env.AUTH_PORT || 3001;

    app.use(express.json());
    app.use('/auth', authRoutes);

    app.listen(PORT);
  } catch (error) {
    console.error('Error al sincronizar Sequelize:', error);
  }
};

startServer();
