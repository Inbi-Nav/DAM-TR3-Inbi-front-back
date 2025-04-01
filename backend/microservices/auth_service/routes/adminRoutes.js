const express = require('express');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Usuario y contraseña requeridos' });
  }

  try {
    const existingAdmin = await Admin.findOne();
    if (existingAdmin) {
      return res.status(403).json({ error: 'Ya existe un administrador. Solo se permite un único administrador.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await Admin.create({ username, password: hashedPassword });

    res.status(201).json({ message: 'Administrador creado correctamente', adminId: newAdmin.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al registrar administrador' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Usuario y contraseña requeridos' });
  }

  try {
    const admin = await Admin.findOne({ where: { username } });
    if (!admin) return res.status(401).json({ error: 'Datos inválidos' });

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) return res.status(401).json({ error: 'Datos inválidos' });

    res.status(200).json({ message: 'Login exitoso', adminId: admin.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

module.exports = router;
