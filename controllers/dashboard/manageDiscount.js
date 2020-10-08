const Category = require('../../models/category');
const Product = require('../../models/product');
const validateAdmin = require('../../utils/validateAdmin');


module.exports.getManageDiscount = (req, res, next) => {
    if(validateAdmin(req)){
       Category.findAll({include: Product}).then(categories => {
           res.render('./admin/manage-discount.ejs',{
                categories: categories
           })
       })
    }
}


module.exports.postAddDiscount = (req, res, next) => {
    if(validateAdmin(req)){
        if(req.body.categoryId){
            console.log(req.body)
        }else{
            console.log(req.body)
        }
        res.redirect('/admin/manage-discount');
    }
}