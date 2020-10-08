const Sequelize = require('sequelize');

const sequelize = require('../utils/database');


const Discount = sequelize.define('discount', {
    discountId:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
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