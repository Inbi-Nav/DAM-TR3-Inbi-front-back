const User = require('../models/User');
const { hashPassword } = require('../utils/authUtils');

const register = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const hashedPassword = await hashPassword(password);
    const user = await User.create({ username, password: hashedPassword, email });
    res.status(201).json({ message: 'Usuario registrado exitosamente', user });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el usuario', details: error.message });
  }
};

module.exports = { register };