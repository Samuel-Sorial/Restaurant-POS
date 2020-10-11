const Category = require('../../models/category');
const validateAdmin = require('../../utils/validateAdmin');

module.exports.getManageCategory = (req, res, next) => {
  if (validateAdmin(req)) {
    Category.findAll()
      .then((categories) => {
        res.render('./admin/manage-category.ejs', {
          role: req.session.role,
          categories: categories,
        });
      })
      .catch((err) => console.log(err));
  } else {
    res.send('As a cashier, you can not add a category');
  }
};

module.exports.getManageSpecificCategory = (req, res, next) => {
  if (validateAdmin(req)) {
    Category.findByPk(req.params.id)
      .then((category) => {
        res.render('./admin/manageSpecificCategory.ejs', {
          role: req.session.role,
          category: category,
        });
      })
      .catch((err) => console.log(err));
  } else {
    res.send('As a cashier, you can not ediit a category');
  }
};
module.exports.postManageCategory = (req, res, next) => {
  if (validateAdmin(req)) {
    const category = req.body.categoryName;
    Category.create({name: category}).then((result) =>
      res.redirect('/admin/manage-category')
    );
  }
};

module.exports.postCategoryName = (req, res, next) => {
  if (validateAdmin(req)) {
    const categoryName = req.body.categoryName;
    Category.findByPk(req.params.id).then((result) => {
      result.name = categoryName;
      result.save().then(res.redirect('/admin/manage-category'));
    });
  }
};

module.exports.deleteManageCategory = (req, res, next) => {
  if (validateAdmin(req)) {
    const categoryId = req.params.id;
    Category.findByPk(categoryId)
      .then((result) => {
        result.destroy();
      })
      .catch((err) => console.log(err));
  }
};
