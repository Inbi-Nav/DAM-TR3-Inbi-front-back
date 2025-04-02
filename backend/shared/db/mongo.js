const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      console.log(' MONGODB_URI no definido');
      return;
    }

    await mongoose.connect(uri);
    console.log(' MongoDB conectado');
  } catch (error) {
    console.error(' Error al conectar en MongoDB:', error.message);
  }
};

module.exports = connectDB;
