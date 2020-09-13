const Sequelize = require('sequelize');

const sequelize = require('../utils/database');
const Invoice = require('./invoice');

const Client = sequelize.define('client', {
    phoneNumber: {
        type: Sequelize.STRING,
        primaryKey:true,
        allowNull: false,
        unique: true
    },
    Name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    Address: {
        type: Sequelize.STRING,
        allowNull: false
    }
  },
  {
 timestamps: false //prevent from making created at, edited at field.
});

Client.hasMany(Invoice);

module.exports = Client;