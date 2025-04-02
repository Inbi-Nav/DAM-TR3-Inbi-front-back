const Log = require('../models/Log');
const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '../../logs/game_logs.txt');

exports.createLog = async (req, res) => {
    try {
        const { eventType, message, userId, details } = req.body;

        const logEntry = new Log({ eventType, message, userId, details });
        await logEntry.save();

        const logText = `[${new Date().toISOString()}] ${eventType} | ${message} | userId=${userId} | ${JSON.stringify(details)}\n`;
        fs.appendFileSync(logFilePath, logText);

        res.status(201).json({ message: 'Log guardado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar log', details: error.message });
    }
};
D