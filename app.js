const path = require('path');

const express = require('express');

const bodyParser = require('body-parser');

const sequelize = require('./utils/database');

const session = require('express-session');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();

const homePage = require('./router/login');
const admin = require('./router/admin');


// Relationships initialization

const User = require('./models/user');
const Invoice = require('./models/invoice');
const Client = require('./models/client');
const Product = require('./models/product');
const Category = require('./models/category');
const InvoiceProduct = require('./models/invoiceProduct');

Invoice.belongsTo(User);
Invoice.belongsTo(Client);
Invoice.hasMany(Product);
User.hasMany(Invoice);
Client.hasMany(Invoice);
Category.hasMany(Product);
Product.belongsTo(Category);
Product.hasMany(InvoiceProduct);
InvoiceProduct.belongsTo(Product);
InvoiceProduct.belongsTo(Invoice);

// End of relationship initialization

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
app.use(admin);
