const config = require('../../../shared/config/config');

const login = async (req, res) => {
  const { username, password } = req.body;

  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  if (!username || !password) {
    return res.status(400).json({ error: 'Rellenar los campos obligatorios' });
  }

  if (username === adminUsername && password === adminPassword) {
    return res.status(200).json({
      message: 'Login correcto',
      username: adminUsername
    });
  } else {
    return res.status(401).json({ error: 'Credenciales incorrectas' });
  }
};

module.exports = { login };
