const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Invoice = sequelize.define('invoice', {
  discount: {
    type: Sequelize.FLOAT,
    defaultValue: 0,
    allowNull: true,
  },
  isDelivery: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  totalPrice: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  hidden: {
    type: Sequelize.BOOLEAN,
  },
});

module.exports = Invoice;
