const express = require('express');

const dashboardController = require('../controllers/dashboard');

const placeOrderController = require('../controllers/place-order');

const router = express.Router();

router.get('/' , dashboardController.getDashboard);

router.get('/place-order', placeOrderController.getPlaceOrder);

router.get('/edit-product', dashboardController.getEditProduct);

router.post('/edit-product', dashboardController.postEditProduct);

router.get('/edit-category', dashboardController.getEditCategory);

router.post('/edit-category', dashboardController.postEditCategory);

module.exports = router;
