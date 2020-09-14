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

module.exports.getEditProduct = (req, res, next) => {
    const currCategories = Category.findAll().then( categories => {
        res.render('./admin/edit-product.ejs', {
            categories: categories
        });
    }).catch(err => console.log(err));
}


module.exports.getEditCategory = (req, res, next) => {
    if(validateAdmin(req)){
        res.render('./admin/edit-category.ejs' , {
            categories: [{name:'hello'}]
        });
    }else{
        res.send('please login with the admin');
    }
}


module.exports.postEditCategory = (req, res, next) => {
    if(validateAdmin(req)){
        const category = req.body.categoryName;
        Category.create({name: category});
    }
}

module.exports.postEditProduct = (req, res, next) => {
    if(validateAdmin(req)){
        const productName = req.body.productName;
        const price = req.body.price;
        const ratio = req.body.ratio;
        const categoryId = req.body.category;
        Product.create({
                name: productName,
                price: price,
                ratio: ratio,
                categoryCategoryId: categoryId
        });
        res.redirect('/');
    }
}
