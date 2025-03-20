const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

const register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const existingAdmin = await Admin.findOne();
    if (existingAdmin) {
      return res.status(403).json({ error: 'An administrator already exists. Only one administrator is allowed.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ username, password: hashedPassword });
    res.status(201).json({ message: 'Admin registered successfully', admin });
  } catch (error) {
    res.status(500).json({ error: 'Error registering admin' });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const admin = await Admin.findOne({ where: { username } });

    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', admin });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
};

module.exports = { register, login };