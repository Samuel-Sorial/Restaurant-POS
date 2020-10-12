const User = require('../models/user');
const bcrypt = require('bcryptjs');
const salt = '$2a$12$NIH/WK/ESjWi5bTw7NkpZu';

module.exports.getLogin = (req, res, next) => {
  if (req.session.logedIn) {
    if (req.session.role == 'admin') {
      res.redirect('admin');
    } else {
      res.redirect('place-order');
    }
    return;
  }
  res.render('home.ejs');
};

module.exports.postLogin = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  User.findByPk(username)
    .then(async result => {
      if (result) {
        const rightPassword = result.validatePassword(password);
        if (await rightPassword) {
          req.session.logedIn = true;
          req.session.role = result.role;
          req.session.username = result.username;
          req.session.name = result.name;
          if (req.session.role == 'admin') {
            return res.render('admin/dashboard.ejs', {
              currentPage: 'dashboard',
              role: 'admin'
            });
          } else {
            return res.redirect('place-order');
          }
        }
      }
      res.redirect('/');
    })
    .catch(err => console.log(err));
};

module.exports.logOut = (req, res, next) => {
  if (req.session.logedIn) {
    console.log('destroying');
    req.session.destroy();
    req.session = null;
  }
  res.redirect('/');
};
