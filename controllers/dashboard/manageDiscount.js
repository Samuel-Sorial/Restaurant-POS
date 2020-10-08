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

module.exports.postEditDiscount = (req, res, next) => {
    if(validateAdmin){
        if(req.body.categoryId){
            Category.findByPk(req.body.categoryId).then( category => {
                console.log(category);
                category.discount = req.body.ratio;
                category.save();
            }).catch( err=> console.log(err));
        }else{
            Product.findByPk(req.body.productId).then ( product => {
                console.log(product);
                product.discount = req.body.ratio;
                product.save();
            })
        }
        res.redirect('/admin/manage-discount')
    }
}


module.exports.deleteProductDiscount = (req, res, next) => {
    if(validateAdmin){
        Product.findByPk(req.params.id).then( product => {
            product.discount = null;
            product.save();
        })
    }
}

module.exports.deleteCategoryDiscount = (req, res, next) => {
    if(validateAdmin){
        Category.findByPk(req.params.id).then( category => {
            category.discount = null;
            category.save();
        })
    }
}