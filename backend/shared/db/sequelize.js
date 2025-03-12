const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  }
);

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
  } catch (error) {
    console.error('Error al sincronizar Sequelize:', error);
  }
};

syncDatabase();

sequelize.authenticate()
  .catch(err => console.error('Error al conectar a MySQL:', err));

module.exports = sequelize;
