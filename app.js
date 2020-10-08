const path = require('path');

const express = require('express');

const bodyParser = require('body-parser');

const sequelize = require('./utils/database');

const session = require('express-session');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();

const homePage = require('./router/login');
const admin = require('./router/admin');
const cashier = require('./router/cashier.js');


// Relationships initialization

const User = require('./models/user');
const Invoice = require('./models/invoice');
const Client = require('./models/client');
const Product = require('./models/product');
const Category = require('./models/category');
const InvoiceProduct = require('./models/invoiceProduct');

Invoice.belongsTo(User);
Invoice.belongsTo(Client);
Product.belongsTo(Category);
Category.hasMany(Product);
InvoiceProduct.belongsTo(Product);
InvoiceProduct.belongsTo(Invoice);


// End of relationship initialization

const sessionStore = new SequelizeStore({
    db: sequelize,
    expiration: 30 * 60 * 1000, // by milliseconds
    checkExpirationInterval: 30 * 60 * 1000
});

app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()).use(bodyParser.urlencoded({
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
app.use(cashier);
app.use('/admin',admin);

