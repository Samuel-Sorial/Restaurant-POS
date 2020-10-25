const Sequelize = require('sequelize').Sequelize;
const user = require('../config.json');

const sequelize = new Sequelize(user.database, user.user, user.password, {
  dialect: 'mysql',
  host: user.host,
  logging: false,
});

module.exports = sequelize;
