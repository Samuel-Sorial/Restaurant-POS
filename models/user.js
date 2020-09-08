const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const user = sequelize.define('user', {
  Username: {
      type: Sequelize.STRING,
      unique: true,
      primaryKey: true,
      allowNull: false,
  },
  Password: {
    type: Sequelize.STRING,
    allowNull:false
  },
  Role:{
    type: Sequelize.STRING,
    allowNull:false,
    values: ['admin', 'cashier']
  },
  Name:{
    type: Sequelize.STRING,
    allowNull: true,
  }
});
module.exports = user;