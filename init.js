const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1122SAMUEL',
});

connection.query('CREATE DATABASE restaurant_pos', (err, result, field) => {
  console.log(err, result, field);
});
