const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const userRoutes = require('./microservices/auth_service/routes/userRoutes');
const adminRoutes = require('./microservices/auth_service/routes/adminRoutes');
const sequelize = require('./shared/db/sequelize');

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());

app.use('/users', userRoutes);
app.use('/admins', adminRoutes);

sequelize.sync();

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
