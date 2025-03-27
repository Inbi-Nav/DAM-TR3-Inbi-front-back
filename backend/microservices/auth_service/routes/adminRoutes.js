const express = require('express');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await Admin.create({ username, password: hashedPassword });
    res.status(201).json({ message: 'Admin creado', adminId: newAdmin.id });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'El admin ya existe o error en la creación' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ where: { username } });
  if (!admin) return res.status(401).json({ error: 'Datos inválidas' });

  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) return res.status(401).json({ error: 'Datos inválidas' });

  res.status(200).json({ message: 'Login exitoso', adminId: admin.id });
});

module.exports = router;
