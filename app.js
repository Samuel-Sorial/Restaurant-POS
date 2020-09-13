const path = require('path');

const express = require('express');

const bodyParser = require('body-parser');

const sequelize = require('./utils/database');

const session = require('express-session');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();

const homePage = require('./router/login');
const dashboard = require('./router/dashboard');


const sessionStore = new SequelizeStore({
    db: sequelize,
    expiration: 15 * 60 * 1000, // by milliseconds
    checkExpirationInterval: 16 * 60 * 1000
});

app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(session({
    secret: 'myownsecret',
    store: sessionStore,
    resave: true,
    saveUninitialized: false,
      cookie:{
      maxAge: 15 * 60 * 1000, // by milliseconds
      sameSite:true //prevent sending it to any other domain
  }
    
  
}));

sequelize.sync().
then(app.listen(3000)).
catch( err => console.log(err));

app.use(homePage);
app.use(dashboard);