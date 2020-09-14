const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Invoice = sequelize.define('invoice', {
    invoiceId: {
        type: Sequelize.STRING,
        unique: true,
        primaryKey: true,
        allowNull: false,
    },
    discount: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
        allowNull: true
    },
    isDelivery: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    totalPrice: {
        type: Sequelize.FLOAT,
        allowNull: false,
    }
   } ,
   {
    timestamps: false //prevent from making created at, edited at field.
});

module.exports = Invoice;