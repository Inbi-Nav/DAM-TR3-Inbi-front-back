// backend/microservices/auth_service/routes/authRoutes.js
const express = require('express');
const { register } = require('../controllers/authController');

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', register);

module.exports = router;