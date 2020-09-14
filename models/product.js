const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Product = sequelize.define('product', {
    productId:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    price:{
        type:Sequelize.FLOAT,
        allowNull:false,
    },
    ratio:{
        type: Sequelize.FLOAT,
        allowNull: true
    },
    discount:{
        type: Sequelize.FLOAT,
        allowNull:true
    },
    }, {
    timestamps: false //prevent from making created at, edited at field.
});

module.exports = Product;