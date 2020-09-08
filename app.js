const path = require('path');
const express = require('express');
const sequelize = require('./utils/database');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));

sequelize.sync().
then(app.listen(3000, console.log('Started listening'))).
catch( err => console.log(err));

