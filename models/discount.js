const Sequelize = require('sequelize');

const sequelize = require('../utils/database');


const ProductDiscount = sequelize.define('discount', {
    discountId:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:true
    },
    discountRatio:{
        type: Sequelize.FLOAT,
        allowNull:true
    },
    disabled:{
        type: Sequelize.BOOLEAN,
        allowNull: true
    }
    }, {
    timestamps: false //prevent from making created at, edited at field.
});

const CategoryDiscount = sequelize.define('discount', {
    discountId:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:true
    },
    discountRatio:{
        type: Sequelize.FLOAT,
        allowNull:true
    },
    disabled:{
        type: Sequelize.BOOLEAN,
        allowNull: true
    }
    }, {
    timestamps: false //prevent from making created at, edited at field.
});

module.exports.CategoryDiscount = CategoryDiscount;
module.exports.ProductDiscount = ProductDiscount;