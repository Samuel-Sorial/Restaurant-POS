const Invoice = require('../models/invoice');
const User = require('../models/user');
const Client = require('../models/client');
const Product = require('../models/product');
const Print = require('../utils/printing/index');
const InvoiceProduct = require('../models/InvoiceProduct');

module.exports.getInvoices = (req, res, next) => {
  Invoice.findAll({include: Client, order: [['id', 'DESC']], limit: 50}).then(
    (invoices) => {
      invoices.map((invoice) => {
        let created = invoice.createdAt;
        invoice.date = created.toString().slice(0, 24);
      });
      res.render('invoice.ejs', {
        invoices: invoices,
      });
    }
  );
};

module.exports.printInvoice = (req, res, next) => {
  Invoice.findByPk(req.params.id, {
    include: [Product, Client, User],
  }).then((res) => {
    for (let prod of res.products) {
      prod.count = prod.InvoiceProduct.count;
    }
    console.log('hi');
    Print({
      invoiceId: res.id,
      cashierName: res.user.name,
      products: res.products,
      date: res.createdAt,
      total: res.totalPrice,
      discount: res.discount,
      afterDiscount: res.totalPrice - res.discount,
      clientPhone: res.clientPhoneNumber,
      clientName: res.client.name,
      clientAddress: res.client.address,
      isDelivery: res.isDelivery,
    });
  });
  res.send();
};

module.exports.deleteInvoice = (req, res, next) => {};
