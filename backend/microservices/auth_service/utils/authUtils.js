const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../../shared/config/config');

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const generateToken = (user) => {
  return jwt.sign({ username: user.username }, config.JWT_SECRET, { expiresIn: '1h' });
};

module.exports = { hashPassword, comparePassword, generateToken };
