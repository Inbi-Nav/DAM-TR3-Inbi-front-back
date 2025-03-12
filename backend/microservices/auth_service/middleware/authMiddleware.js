const jwt = require('jsonwebtoken');
const config = require('../../../shared/config/config');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado. Token no proporcionado.' });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.username = decoded.username;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Token inválido.' });
  }
};

module.exports = authMiddleware;
