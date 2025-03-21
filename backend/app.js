const express = require('express');
const authRoutes = require('./microservices/auth_service/routes/authRoutes');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors({
  origin:  'http://localhost:8080',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));


app.use(express.json());

app.get('/api/ruta-get', (req, res) => {
  res.json({ message: 'Este es un endpoint GET' });
});

app.post('/api/ruta-post', (req, res) => {
  const { username, password } = req.body;
  res.json({ message: 'Este es un endpoint POST', username, password });
});

app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});