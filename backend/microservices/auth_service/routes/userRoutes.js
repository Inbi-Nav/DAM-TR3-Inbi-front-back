const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

router.post('/unity-register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password: hash });
    res.status(201).json({ message: 'User created', userId: newUser.id });
  } catch (err) {
    res.status(400).json({ error: 'El usuario ya exoste' });
  }
});


router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });

  if (!user) return res.status(401).json({ error: 'Datos invalidos' });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(401).json({ error: 'Datos invalidos' });

  res.status(200).json({ message: 'Login successful', userId: user.id });
});

router.get('/', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

module.exports = router;
