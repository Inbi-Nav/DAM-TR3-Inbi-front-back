const express = require('express');
const router = express.Router();
const Log = require('../models/Log');

router.post('/', async (req, res) => {
  try {
    const { timestamp, type, message } = req.body;
    const log = new Log({ timestamp, type, message });
    await log.save();
    res.status(201).json({ success: true, log });
  } catch (err) {
    console.error('Error guardando log en MongoDB:', err);
    res.status(500).json({ error: 'No se pudo guardar el log' });
  }
});

module.exports = router;
