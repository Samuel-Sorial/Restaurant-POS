const express = require('express');

const dashboardController = require('../controllers/dashboard');

const router = express.Router();

router.get('/home' , dashboardController.getDashboard);

module.exports = router;
