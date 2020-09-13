const Sequelize = require('sequelize');

const sequelize = require('../utils/database');
const Client = require('./client');
const User = require('./user');
const invoiceProduct = require('./invoiceProduct');

const Invoice = sequelize.define('invoice', {
    invoiceId: {
        type: Sequelize.STRING,
        unique: true,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    discount: {
        type: Sequelize.NUMBER,
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
        type: Sequelize.NUMBER,
        allowNull: false,
    }
   } ,
   {
    timestamps: false //prevent from making created at, edited at field.
});

Invoice.belongsTo(User);
Invoice.belongsTo(Client);
Invoice.hasMany(invoiceProduct);

module.exports = Invoice;