const express = require('express');
const authRoutes = require('./routes/authRoutes');
const User = require('./models/User');

User.sync({ force: false }).then(() => {
  console.log('Modelo de Usuario sincronizado');
});

const app = express();
const PORT = process.env.AUTH_PORT || 3001;

app.use(express.json());

app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Servicio de autenticación funcionando en http://localhost:${PORT}`);
});