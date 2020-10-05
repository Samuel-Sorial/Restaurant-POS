const express = require('express');

const dashboardController = require('../controllers/dashboard');

const router = express.Router();

router.get('/' , dashboardController.getDashboard);

router.get('/manage-product', dashboardController.getManageProduct);

router.post('/manage-product', dashboardController.postManageProduct);

router.get('/manage-category', dashboardController.getManageCategory);

router.post('/manage-category', dashboardController.postManageCategory);

router.get('/manage-category-:id', dashboardController.getManageSpecificCategory);

router.post('/manage-category-:id', dashboardController.postCategoryName);

router.delete('/manage-category-:id', dashboardController.deleteManageCategory);

module.exports = router;
