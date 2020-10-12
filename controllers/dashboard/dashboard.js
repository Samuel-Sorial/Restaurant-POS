const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const validateAdmin = require('../../utils/validateAdmin');
const salt = bcrypt.genSaltSync(10);

module.exports.getDashboard = (req, res, next) => {
  if (validateAdmin(req)) {
    console.log('hi');
    res.render('admin/dashboard.ejs', {
      currentPage: 'dashboard',
      role: req.session.role
    });
  } else {
    res.send('You are not authorized to view the dashboard');
  }
};

module.exports.getManageCashier = (req, res, next) => {
  if (validateAdmin(req)) {
    User.findAll().then(result => {
      res.render('admin/admin.ejs', {
        users: result,
        role: req.session.role
      });
    });
  } else {
    res.send('You cant add cashiers');
  }
};

module.exports.postAddUser = async (req, res, next) => {
  if (validateAdmin(req)) {
    let password = await bcrypt.hash(req.body.password, salt);
    User.create({
      username: req.body.username,
      password: password,
      role: req.body.admin == 'on' ? 'admin' : 'cashier',
      name: req.body.name
    }).then(() => {
      res.redirect('/admin/manage-cashier');
    });
  } else {
    res.send('You cant add cashiers');
  }
};

module.exports.postEditUser = async (req, res, next) => {
  if (validateAdmin(req)) {
    User.findByPk(req.body.username).then(async result => {
      result.name = req.body.name.toString();
      if (req.body.password) {
        result.password = await bcrypt.hash(req.body.password, salt);
      }
      result.role = req.body.admin ? 'admin' : 'cashier';
      result.save();
      res.redirect('/admin/manage-cashier');
    });
  }
};
