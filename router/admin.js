const express = require('express');

const dashboardController = require('../controllers/dashboard');

const router = express.Router();

router.get('/' , dashboardController.getDashboard);

router.get('/manage-product', dashboardController.getEditProduct);

router.post('/manage-product', dashboardController.postEditProduct);

router.get('/manage-category', dashboardController.getEditCategory);

router.post('/manage-category', dashboardController.postEditCategory);

module.exports = router;
