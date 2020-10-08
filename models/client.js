const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Client = sequelize.define('client', {
    phoneNumber: {
        type: Sequelize.STRING,
        primaryKey:true,
        allowNull: false,
        unique: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    points: {
        type: Sequelize.INTEGER,
        allowNull:false
    }
  },
  {
 timestamps: false //prevent from making created at, edited at field.
});

module.exports = Client;