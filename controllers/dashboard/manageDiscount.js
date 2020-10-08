const Category = require('../../models/category');
const Product = require('../../models/product');
const validateAdmin = require('../../utils/validateAdmin');


module.exports.getManageDiscount = (req, res, next) => {
    if(validateAdmin(req)){
       Category.findAll().then(categories => {
           res.render('./admin/manage-discount.ejs',{
                categories: categories
           })
       })
    }
}