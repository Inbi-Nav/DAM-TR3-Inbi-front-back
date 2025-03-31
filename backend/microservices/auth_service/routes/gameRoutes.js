const express = require('express');
const GameSettings = require('../models/GameSettings');
const router = express.Router();

router.get('/settings', async (req, res) => {
    try {
      const setting = await GameSettings.findOne({ where: { key: 'moveSpeed' } });
  
      if (!setting) {
        return res.status(404).json({ error: 'No se encontró moveSpeed' });
      }
  
      res.json({ moveSpeed: Number(setting.value) }); 
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener configuración' });
    }
  });
  

router.post('/settings', async (req, res) => {
  const updates = req.body;
  try {
    for (const key in updates) {
      await GameSettings.upsert({ key, value: String(updates[key]) });
    }
    res.json({ message: 'Configuración actualizada' });
  } catch (err) {
    res.status(500).json({ error: 'Error al guardar configuración' });
  }
});

router.put('/settings', async (req, res) => {
    const { moveSpeed } = req.body;
  
    try {
      await GameSettings.upsert({
        key: 'moveSpeed',
        value: String(moveSpeed)
      });
      res.json({ message: 'Velocidad actualizada' });
    } catch (err) {
      res.status(500).json({ error: 'Error al guardar configuración' });
    }
  });
  

module.exports = router;
