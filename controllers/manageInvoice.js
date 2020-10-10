const Invoice = require('../models/invoice');
const Client = require('../models/client');
const Product = require('../models/product');
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
  Invoice.findByPk(req.params.id, {include: Product}).then((res) =>
    console.log(res.products)
  );
};

module.exports.deleteInvoice = (req, res, next) => {};
