const mongoose = require('mongoose');
const sequelize = require('../../../shared/db/sequelize');
const { Types } = require('mysql2');
const { DataTypes } = require('sequelize');
const { create } = require('../../game_service/models/Game');

module.exports = (sequelize) => {  
    const Transaction = sequelize.define('Transaction', {
        amount: {
            Type: DataTypes.DECIMAL(10, 2),
            allowNull: false   
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    });
    return Transaction;
};