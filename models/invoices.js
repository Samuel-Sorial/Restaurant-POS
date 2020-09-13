const Sequelize = require('sequelize');

const sequelize = require('../utils/database');
const Client = require('./client');
const User = require('./user');

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
    },
    phoneNumber: {
        type: Sequelize.STRING,
        allowNull: true,
        references: {
            model: Client,
            key: 'phoneNumber'
        }
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            model: User,
            key: 'username'
            }
    }
   } ,
   {
    timestamps: false //prevent from making created at, edited at field.
    });
    module.exports = Invoice;