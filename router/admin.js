const express = require('express');

const dashboardController = require('../controllers/dashboard/dashboard');

const categoryManagementController = require('../controllers/dashboard/manageCategory');

const productManagementController = require('../controllers/dashboard/manageProduct');

const discountManagementController = require('../controllers/dashboard/manageDiscount');

const router = express.Router();

router.get('/' , dashboardController.getDashboard);

router.get('/manage-product', productManagementController.getManageProduct);

router.post('/manage-product', productManagementController.postManageProduct);

router.get('/manage-product-:id', productManagementController.getEditProduct);

router.delete('/manage-product-:id', productManagementController.deleteProduct);

router.get('/manage-category', categoryManagementController.getManageCategory);

router.post('/manage-category', categoryManagementController.postManageCategory);

router.get('/manage-category-:id', categoryManagementController.getManageSpecificCategory);

router.post('/manage-category-:id', categoryManagementController.postCategoryName);

router.delete('/manage-category-:id', categoryManagementController.deleteManageCategory);

router.get('/manage-discount', discountManagementController.getManageDiscount);

router.post('/manage-discount', discountManagementController.postAddDiscount);

router.get('/manage-discount/edit', discountManagementController.getEditDiscount);

router.post('/manage-discount/edit', discountManagementController.postEditDiscount);

router.delete('/manage-discount/delete-category-:id', discountManagementController.deleteCategoryDiscount);

router.delete('/manage-discount/delete-product-:id', discountManagementController.deleteProductDiscount);


module.exports = router;
