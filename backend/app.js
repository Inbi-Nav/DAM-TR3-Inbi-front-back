const express = require('express');
const authRoutes = require('./microservices/auth_service/routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('¡Bienvenido a DualSpirit!');
});

app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
