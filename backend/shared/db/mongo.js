const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB conctado');
  } catch (error) {
    console.error('Error al conectar en MongoDB :', error);
    process.exit(1);
  }
};

module.exports = connectDB;