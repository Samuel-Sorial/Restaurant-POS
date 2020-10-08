const express = require('express');

const router = express.Router();

const clientManagementController = require('../controllers/manageClient');

router.get('/manage-client', clientManagementController.getManageClient);

router.post('/manage-client', clientManagementController.postManageClient);

router.get('/check-number-:phoneNumber', clientManagementController.userExists);

module.exports = router;