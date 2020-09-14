const Product = require('../models/product');

const Category = require('../models/category');

module.exports.getPlaceOrder = (req, res, next) => {

    Category.findAll({include: Product}).then(categories => {
        res.render('place-order.ejs', {categories: categories});
    }).catch(err => console.log(err));
}