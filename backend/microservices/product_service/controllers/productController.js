const { Transaction, Skin } = require('../models');

const createTransaction = async (req, res) => {
  const { userId, skinId, amount } = req.body;
  try {
    const transaction = await Transaction.create({ userId, skinId, amount });
    res.status(201).json({ message: 'Transacción creada', transaction });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la transacción' });
  }
};

module.exports = { createTransaction };