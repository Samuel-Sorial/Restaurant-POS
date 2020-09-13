const Sequelize = require('sequelize').Sequelize;

const sequelize = new Sequelize('restaurant_pos', 'root', '1122SAMUEL', {
    dialect: 'mysql',
    host: 'localhost',
    logging:false
});

module.exports = sequelize;
