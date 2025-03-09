// backend/microservices/product_service/index.js
const express = require('express');
const sequelize = require('../../shared/db/sequelize');
const Transaction = require('./models/Transaction');
const Skin = require('./models/Skin');

const app = express();
sequelize.sync(); // Sincronizar modelos con la base de datos

// Ruta de ejemplo para crear una transacción
app.post('/buy-skin', async (req, res) => {
  const { userId, skinId, amount } = req.body;
  try {
    const transaction = await Transaction.create({ userId, skinId, amount });
    res.status(201).json({ message: 'Transacción creada', transaction });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la transacción' });
  }
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Product service running on port ${PORT}`);
});