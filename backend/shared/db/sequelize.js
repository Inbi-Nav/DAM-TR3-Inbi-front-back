const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../../.env') });



const sequelize = new Sequelize(
  "a23inbnavnav_dualspirit",
  "a23inbnavnav_root",
  "Pedralbes2023",
  {
    host: "dam.inspedralbes.cat",
    dialect: 'mysql',
    logging: false,

  }
);

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
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
