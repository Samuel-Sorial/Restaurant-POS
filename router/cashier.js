const express = require('express');

const router = express.Router();

const clientManagementController = require('../controllers/manageClient');

const placeOrderController = require('../controllers/place-order');

const invoiceManagementController = require('../controllers/manageInvoice');

router.get('/manage-client', clientManagementController.getManageClient);

router.post('/add-client', clientManagementController.postAddClient);

router.post('/manage-client', clientManagementController.postEditClient);

router.get('/check-number-:phoneNumber', clientManagementController.userExists);

router.get('/find-numbers-:phoneNumber', clientManagementController.findUsers);

router.post('/place-order', placeOrderController.postPlaceOrder);

router.get('/manage-invoice', invoiceManagementController.getInvoices);

router.get('/invoice-:id', invoiceManagementController.printInvoice);

router.delete('/invoice-:id', invoiceManagementController.deleteInvoice);

module.exports = router;
