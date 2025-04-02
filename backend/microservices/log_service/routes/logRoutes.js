  const express = require('express');
  const router = express.Router();
  const Log = require('../models/Log');
  const fs = require('fs');
  const path = require('path');

  const LOG_FILE = path.join(__dirname, '../logs.txt');

  router.post('/', async (req, res) => {
    try {
      const log = await Log.create(req.body);

      const line = `[${log.timestamp.toISOString()}] [${log.type.toUpperCase()}] (User: ${log.userId || 'N/A'}) ${log.message}\n`;
      fs.appendFile(LOG_FILE, line, err => {
        if (err) console.error(' Error al escribir en logs.txt:', err);
        else console.log('Log también guardado en logs.txt');
      });

      res.status(201).json({ message: 'Log guardado', log });
    } catch (err) {
      res.status(500).json({ error: 'Error al guardar log' });
    }
  });

  module.exports = router;
