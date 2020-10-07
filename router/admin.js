const express = require('express');

const dashboardController = require('../controllers/dashboard/dashboard');

const categoryManagementController = require('../controllers/dashboard/manageCategory');

const productManagementController = require('../controllers/dashboard/manageProduct');

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

module.exports = router;
