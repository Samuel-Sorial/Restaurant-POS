const Category = require('../models/category');
const Product = require('../models/product');
const validateAdmin = require('../utils/validateAdmin');

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


module.exports.getManageCategory = (req, res, next) => {
    if(validateAdmin(req)){
        Category.findAll().then(categories => {
            res.render('./admin/manage-category.ejs' , 
            {
               categories: categories 
            });
        }).catch(err => console.log(err))
    }else{
        res.send('please login with the admin');
    }
}

module.exports.getManageSpecificCategory = (req, res, next) => {
    Category.findByPk(req.params.id).then( category=> {
        res.render('./admin/manageSpecificCategory.ejs', {category: category});
    }).catch(err => console.log(err));
}
module.exports.postManageCategory = (req, res, next) => {
    if(validateAdmin(req)){
        const category = req.body.categoryName;
        Category.create({name: category}).then( result => res.redirect('/admin/manage-category')
        );
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

module.exports.postCategoryName = (req, res, next) => {
    if(validateAdmin){
        const categoryName = req.body.categoryName;
        Category.findByPk(req.params.id).then( result => {
            result.name = categoryName
            result.save().then(res.redirect('/admin/manage-category'));
        })
    }
}

module.exports.deleteManageCategory = (req, res, next ) => {
        const categoryId = req.params.id;
        Category.findByPk(categoryId)
        .then( result => {
             result.destroy()
            }
        )
        .catch(err => console.log(err));
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
        res.redirect('/');
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

