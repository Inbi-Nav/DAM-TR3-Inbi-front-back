const express = require('express');
const cors = require('cors');
const path = require('path');
const { spawn } = require('child_process');
const sequelize = require('./shared/db/sequelize');
require('dotenv').config();
const connectDB = require('./shared/db/mongo');
connectDB();

const app = express();
const port = 27775;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

const userRoutes = require('./microservices/auth_service/routes/userRoutes');
const adminRoutes = require('./microservices/auth_service/routes/adminRoutes');
const gameRoutes = require('./microservices/auth_service/routes/gameRoutes');
const logRoutes = require('./microservices/log_service/routes/logRoutes');
const serviceRoutes = require('./microservices/service_manager/routes/serviceRoutes');

app.use('/users', userRoutes);
app.use('/admins', adminRoutes);
app.use('/game', gameRoutes);
app.use('/logs', logRoutes);
app.use('/services', serviceRoutes);
app.use('/stats-imgs', express.static(path.join(__dirname, 'microservices/stats_service/estadisticas_ranks')));

setInterval(() => {
  const python = spawn('python3', ['microservices/stats_service/stats_service.py']);
  python.stdout.on('data', (data) => {
    console.log(`Python output: ${data}`);
  });
  python.stderr.on('data', (data) => {
    console.error(`Python error: ${data}`);
  });
  python.on('close', (code) => {
    if (code !== 0) {
      console.error(`Python script exited with code ${code}`);
    }
  });
}, 1000 * 60 * 10);


sequelize.sync()
  .then(() => {
    console.log('Conexión a MySQL establecida correctamente');
    console.log('Base de datos sincronizada correctamente');
  })
  .catch(err => {
    console.error('Error al sincronizar Sequelize:', err);
  });

app.listen(port, () => {
  console.log(`Servidor Node corriendo en http://dam.inspedralbes.cat:${port}`);
});
