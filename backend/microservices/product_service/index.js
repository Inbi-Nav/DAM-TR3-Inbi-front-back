const express = require('express');

const sequelize = require('../../shared/db/sequelize');
const Transaction = require('./models/Transaction');
const Skin = require('./models/Skin');

const app = express();
sequelize.sync();

app.post('/buy-skin', async (req, res) => {
    const { userId, skinId, amount } = req.body;
    try {
        const transaction = await Transaction.create({ amount, userId, skinId });
        res.status(201).json({ message: 'Transacción creada', transaction });
    } catch (error) {
        res.status(500).json({ message: "Error al crear la transaccion" });
    }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
