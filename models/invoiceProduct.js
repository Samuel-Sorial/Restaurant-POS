const Sequelize = require('sequelize');

const sequelize = require('../utils/database');
const Invoice = require('./invoice');
const Product = require('./product');

const InvoiceProduct = sequelize.define('invoiceProduct', {
    count:{
        type: Sequelize.NUMBER,
        allowNull: false,
    },
    totalPrice:{
        type: Sequelize.NUMBER,
        allowNull: false
    }
}, {
    timestamps: false //prevent from making created at, edited at field.
});

InvoiceProduct.belongsTo(Product);
InvoiceProduct.belongsTo(Invoice);