const express = require('express');

const dashboardController = require('../controllers/dashboard');

const placeOrderController = require('../controllers/place-order');

const router = express.Router();

router.get('/home' , dashboardController.getDashboard);

router.get('/place-order', placeOrderController.getPlaceOrder);

module.exports = router;
