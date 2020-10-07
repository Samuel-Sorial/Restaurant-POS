const Category = require('../../models/category');
const Product = require('../../models/product');
const validateAdmin = require('../../utils/validateAdmin');



module.exports.getManageProduct = (req, res, next) => {
    if(validateAdmin(req)){
        Category.findAll({include: Product}).then( categories => {
            res.render('./admin/manage-product.ejs', {
                categories: categories,
                productName:"",
                productRatio: 0,
                productPrice: 0,
                editing: false
            });
        }).catch(err => console.log(err));
    }
}


module.exports.getEditProduct = (req, res, next) => {
    if(validateAdmin(req)){
        Category.findAll({include: Product}).then( categories => {
            Product.findByPk(req.params.id).then( product => {
                res.render('./admin/manage-product.ejs', {
                    categories: categories,
                    productName : product.name,
                    productPrice : product.price,
                    productRatio : product.ratio,
                    productId : product.productId,
                    editing:true
                });
            })
        }).catch(err => console.log(err));
    }
}


module.exports.postManageProduct = (req, res, next) => {
    if(validateAdmin(req)){
        const productName = req.body.productName;
        const price = req.body.price;
        const ratio = req.body.ratio;
        if(req.body.editingType){
            Product.findByPk(req.body.editingType).then( result => {
                result.name = productName;
                result.price = price;
                result.ratio = ratio;
                result.categoryCategoryId =  req.body.categoryId;
                result.save();
            });
        }else{
        Product.create({
                name: productName,
                price: price,
                ratio: ratio,
                categoryCategoryId: req.body.categoryId
        });
        res.redirect('/admin/manage-product');
    }
    }
}


module.exports.deleteProduct = (req, res , next) => {
    if(validateAdmin(req)){
        Product.findByPk(req.params.id).then( product =>{
             product.hidden = true;
             product.save();
        }).catch( err => console.log(err));
    }
}

