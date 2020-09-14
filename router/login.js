const express = require('express');

const authController = require('../controllers/auth');

const placeOrderController = require('../controllers/place-order');

const router = express.Router();

router.get('' , authController.getLogin);

router.post('', authController.postLogin);

router.get('/place-order', placeOrderController.getPlaceOrder);

router.post('/logout', authController.logOut);

router.get('/logout', (req,res,next) => res.send('hell'));


module.exports = router;