const User = require('../models/User');

const registerUser = async (username, password, email) => {
  try {
    const user = new User({ username, password, email });
    await user.save();
    return user;
  } catch (error) {
    throw new Error('Error al registrar el usuario');
  }
};

const loginUser = async (username, password) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error('Contraseña incorrecta');
    }

    return user;
  } catch (error) {
    throw new Error('Error al iniciar sesión');
  }
};

module.exports = { registerUser, loginUser };