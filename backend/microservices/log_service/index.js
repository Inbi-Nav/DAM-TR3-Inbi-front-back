const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const app = express();
app.use(express.json());

const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error(' No se encontró MONGO_URI en el archivo .env');
  process.exit(1);
}

mongoose.connect(mongoURI)
  .then(() => console.log(' MongoDB conectado desde log_service'))
  .catch(err => console.error(' Error al conectar MongoDB:', err));

const LOG_FILE = path.join(__dirname, 'logs.txt');
const LogModel = require('./models/Log');

app.post('/logs', async (req, res) => {
  const log = req.body;

  if (!log || !log.type || !log.message) {
    return res.status(400).json({ error: 'Faltan campos requeridos: type, message' });
  }

  try {
    const savedLog = await LogModel.create(log);

    const type = log.type ? log.type.toUpperCase() : 'UNKNOWN';
    const line = `[${new Date().toISOString()}] [${type}] (User: ${log.userId || 'N/A'}) ${log.message || 'Sin mensaje'}\n`;

    fs.appendFile(LOG_FILE, line, err => {
      if (err) console.error('Error al escribir en logs.txt:', err);
    });

    res.status(201).json({ message: 'Log guardado', log: savedLog });
  } catch (err) {
    console.error(' Error al guardar log:', err);
    res.status(500).json({ error: 'Error interno al guardar log' });
  }
});

const PORT = 4001;
app.listen(PORT, () => {
  console.log(` Microservicio de logs corriendo en http://dam.inspedralbes.cat:${PORT}`);
});
