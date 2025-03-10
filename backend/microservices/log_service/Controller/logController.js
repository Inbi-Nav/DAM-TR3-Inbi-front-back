const Log = require('../models/Log');

const createLog = async (req, res) => {
  const { message, level } = req.body;
  try {
    const log = await Log.create({ message, level });
    res.status(201).json({ message: 'Log creado exitosamente', log });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el log', details: error.message });
  }
};

module.exports = { createLog };