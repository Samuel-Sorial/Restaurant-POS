const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const bcrypt = require('bcryptjs');

const Invoice = require('./invoice');
/*
  username: samuel
  password:12345
  hashed password that will be generated each time: $2a$12$NIH/WK/ESjWi5bTw7NkpZu4aHeQcoWbUa2OYqkWzmSTdBiuuAg.xe
*/
const User = sequelize.define(
  'user',
  {
    username: {
      type: Sequelize.STRING,
      unique: true,
      primaryKey: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false,
      values: ['admin', 'cashier'],
    },
    name: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {timestamps: false}
);
User.prototype.validatePassword = function (password) {
  return bcrypt.compare(password, this.password)
};

module.exports = User;
