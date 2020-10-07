const Category = require('../../models/category');
const Product = require('../../models/product');
const validateAdmin = require('../../utils/validateAdmin');

module.exports.getDashboard = (req, res, next) => {
    if(validateAdmin(req)){
        console.log('hi');
        res.render('admin/dashboard.ejs',{
            currentPage:'dashboard'
        })
    }else{
        res.send('You are not authorized to view the dashboard');
    }
}


