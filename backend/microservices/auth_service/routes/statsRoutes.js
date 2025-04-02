const express = require('express');
const User = require('../models/User');
const router = express.Router();

function calcularRango(gamesPlayed) {
  if (gamesPlayed <= 2) return 'Novato';
  if (gamesPlayed <= 5) return 'Jugador Activo';
  return 'Leyenda';
}

router.get('/rank-stats', async (req, res) => {
  try {
    const users = await User.findAll();
    const rangos = { Novato: 0, 'Jugador Activo': 0, Leyenda: 0 };

    users.forEach(user => {
      const rango = calcularRango(user.gamesPlayed);
      rangos[rango]++;
    });

    res.json(rangos);
  } catch (err) {
    res.status(500).json({ error: 'Error al calcular estadísticas de rangos' });
  }
});

module.exports = router;
