const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Category = require('./category');

const invoiceProduct = require('./invoiceProduct');

const Product = sequelize.define('product', {
    productId:{
        type:Sequelize.STRING,
        unique: true,
        primaryKey:true,
        allowNull:false
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    price:{
        type:Sequelize.NUMBER,
        allowNull:false,
    },
    ratio:{
        type: Sequelize.NUMBER,
        allowNull: true
    },
    discount:{
        type: Sequelize.NUMBER,
        allowNull:true
    },
    }, {
    timestamps: false //prevent from making created at, edited at field.
});

Product.belongsTo(Category);
Product.hasMany(invoiceProduct);