const Category = require('../../models/category');
const Product = require('../../models/product');
const { Op } = require('sequelize');

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


module.exports.postAddDiscount = async (req, res, next) => {
    if(validateAdmin(req)){
        if(req.body.categoryId){
            Category.update({discount : req.body.ratio}, {where: {categoryId : req.body.categoryId}});
        }
        else{
            Product.update({discount: req.body.ratio}, {where: {productId: req.body.products}})
        }
        res.redirect('/admin/manage-discount');
    }
}


module.exports.getEditDiscount = async (req, res, next) => {
    if(validateAdmin){
        let products = await Product.findAll({where: {discount:{[Op.not] : null}}});
        Category.findAll({where:{discount: {
            [Op.not] : null       
        }}
    }).then(categories => {
        res.render('./admin/edit-discount.ejs', {
            categories: categories,
            products: products
        })
    })
    }
}