const mysql = require('mysql2');
const user = require('./config.json');
const connection = mysql.createConnection({
  host: user.host,
  user: user.user,
  password: user.password,
});

connection.query(`CREATE DATABASE ${user.database}`, (err, result, field) => {
  console.log(err, result, field);
});
