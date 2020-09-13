const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Product = require('./product');

const Category = sequelize.define('product', {
    categoryId:{
        type: Sequelize.STRING,
        allowNull:false,
        primaryKey:true,
        unique: true
    },
    name:{
        type: Sequelize.STRING,
        allowNull:false
    }
},
    {
        timestamps: false //prevent from making created at, edited at field.
    });

Category.hasMany(Product, {
    foreignKey: {
        name: 'categoryId',
        allowNull: false,
    }
});
