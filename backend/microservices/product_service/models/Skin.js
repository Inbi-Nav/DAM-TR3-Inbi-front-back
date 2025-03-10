const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Skin = sequelize.define('Skin', {
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    imageUrl: { type: DataTypes.STRING, allowNull: false },
  });

  return Skin;
};