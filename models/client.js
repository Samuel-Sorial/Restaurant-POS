const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

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
        allowNull: falseClientR,
        allowNull: false
    }
  },
  {
 timestamps: false
  });

module.exports = Client;