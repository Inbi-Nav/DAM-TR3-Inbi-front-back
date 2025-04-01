const { DataTypes } = require('sequelize');
const sequelize = require('../../../shared/db/sequelize');

const GameSettings = sequelize.define('GameSettings', {
  key: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  value: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});

module.exports = GameSettings;
