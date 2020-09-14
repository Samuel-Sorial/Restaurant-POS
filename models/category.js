const Sequelize = require('sequelize');

const sequelize = require('../utils/database');


const Category = sequelize.define('category', {
    categoryId:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    name:{
        type: Sequelize.STRING,
        allowNull:false
    }
},
    {
        timestamps: false //prevent from making created at, edited at field.
    });

module.exports = Category;