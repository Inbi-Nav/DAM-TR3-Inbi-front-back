const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const ServiceStatus = require('../../service_manager/models/ServiceStatus');

const router = express.Router();

const isServiceEnabled = async (name) => {
  const service = await ServiceStatus.findOne({ name });
  return service ? service.enabled : true;
};

router.post('/unity-register', async (req, res) => {
  if (!(await isServiceEnabled('register'))) {
    return res.status(403).json({ error: 'Registro deshabilitado temporalmente' });
  }

  const { username, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password: hash });
    res.status(201).json({ message: 'User creado', userId: newUser.id });
  } catch (err) {
    res.status(400).json({ error: 'El usuario ya existe' });
  }
});

router.post('/login', async (req, res) => {
  if (!(await isServiceEnabled('login'))) {
    return res.status(403).json({ error: 'Login deshabilitado temporalmente' });
  }

  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });

  if (!user || !user.isActive) {
    return res.status(401).json({ error: 'Usuario no encontrado o inactivo' });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(401).json({ error: 'Datos inválidos' });
  }

  res.status(200).json({ message: 'Login exitoso', userId: user.id });
});

router.patch('/:id/gamesPlayed', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    if (!user.isActive) return res.status(403).json({ error: 'Usuario inactivo' });

    user.gamesPlayed += 1;
    await user.save();
    res.json({ message: 'Partida registrada', gamesPlayed: user.gamesPlayed });
  } catch (err) {
    res.status(500).json({ error: 'Error al registrar partida' });
  }
});

router.get('/:id/status', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    res.json({ isActive: user.isActive });
  } catch (err) {
    res.status(500).json({ error });
  }
});

router.get('/', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.put('/:id/toggle-active', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    user.isActive = !user.isActive;
    await user.save();

    res.json({ message: `Usuario ${user.isActive ? 'activado' : 'desactivado'}` });
  } catch (err) {
    res.status(500).json({ error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await User.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'Usuario no encontrado' });

    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    res.json({
      username: user.username,
      gamesPlayed: user.gamesPlayed
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
});

module.exports = router;
