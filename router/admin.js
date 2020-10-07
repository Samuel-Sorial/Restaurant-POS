const express = require('express');

const dashboardController = require('../controllers/dashboard');

const productManagementController = require('../controllers/dashboard/manageProduct');

const router = express.Router();

router.get('/' , dashboardController.getDashboard);

router.get('/manage-product', productManagementController.getManageProduct);

router.post('/manage-product', productManagementController.postManageProduct);

router.get('/manage-product-:id', productManagementController.getEditProduct);

router.delete('/manage-product-:id', productManagementController.deleteProduct);

router.get('/manage-category', dashboardController.getManageCategory);

router.post('/manage-category', dashboardController.postManageCategory);

router.get('/manage-category-:id', dashboardController.getManageSpecificCategory);

router.post('/manage-category-:id', dashboardController.postCategoryName);

router.delete('/manage-category-:id', dashboardController.deleteManageCategory);

module.exports = router;
