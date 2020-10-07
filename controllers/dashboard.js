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
