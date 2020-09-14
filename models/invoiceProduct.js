const Sequelize = require('sequelize');

const sequelize = require('../utils/database');


const InvoiceProduct = sequelize.define('invoiceProduct', {
    count:{
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    totalPrice:{
        type: Sequelize.FLOAT,
        allowNull: false
    }
}, {
    timestamps: false //prevent from making created at, edited at field.
});

module.exports = InvoiceProduct;