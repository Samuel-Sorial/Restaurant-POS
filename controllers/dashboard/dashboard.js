const Category = require('../../models/category');
const Product = require('../../models/product');
const validateAdmin = require('../../utils/validateAdmin');

module.exports.getDashboard = (req, res, next) => {
  if (validateAdmin(req)) {
    console.log('hi');
    res.render('admin/dashboard.ejs', {
      currentPage: 'dashboard',
    });
  } else {
    res.send('You are not authorized to view the dashboard');
  }
};

module.exports.getManageCashier = (req, res, next) => {
  if (validateAdmin(req)) {
    res.render('admin/admin.ejs');
  }
};

module.exports.postAddUser = (req, res, next) => {
  console.log(req.body);
};

module.exports.postEditUser = (req, res, next) => {};
