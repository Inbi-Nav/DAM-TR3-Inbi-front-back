// backend/microservices/auth_service/index.js
const express = require('express');
const connectDB = require('../../shared/db/mongo');
const User = require('./models/User');

const app = express();
connectDB(); // Conectar a MongoDB

// Ruta de ejemplo para crear un usuario
app.post('/register', async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const user = new User({ username, password, email });
    await user.save();
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Auth service running on port ${PORT}`);
});