const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../../.env') });

console.log('Configuración de BD:', {
  name: process.env.DB_NAME,
  user: process.env.DB_USER,
  host: process.env.DB_HOST
});

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
    console.log('Base de datos sincronizada correctamente');
  } catch (error) {
    console.error('Error al sincronizar Sequelize:', error);
  }
};

syncDatabase();

sequelize.authenticate()
  .then(() => console.log('Conexión a MySQL establecida correctamente'))
  .catch(err => console.error('Error al conectar a MySQL:', err));

module.exports = sequelize;
