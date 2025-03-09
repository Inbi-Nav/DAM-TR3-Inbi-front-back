// # Punto de entrada del microservicio
const express = require('express');
const connectDB = require('../../shared/db/mongo');
const User = require('./models/User');

const app = express();
connectDB();

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = new User({
            username,
            email,
            password
        });
        await user.save();
        res.status(201).json({message: "Usuario registrado correctamente"});
    } catch (error) {
        res.status(500).json({message: "Error al registrar el usuario"});
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
