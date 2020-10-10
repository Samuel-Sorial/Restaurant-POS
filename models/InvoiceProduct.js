const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const InvoiceProduct = sequelize.define(
  'InvoiceProduct',
  {
    invoiceId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    count: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false, //prevent from making created at, edited at field.
  }
);

module.exports = InvoiceProduct;
