const User = require('../models/User');
const { hashPassword } = require('../utils/authUtils');

const register = async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    const hashedPassword = await hashPassword(password);
    const user = await User.create({ username, password: hashedPassword, email });

    res.status(201).json({
      username: user.username,
      password: user.password, 
      email: user.email
    });

  } catch (error) {
    res.status(500).json({ error: 'Error al registrar', details: error.message });
  }
};

module.exports = { register };
