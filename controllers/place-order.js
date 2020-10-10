const Product = require('../models/product');

const Category = require('../models/category');

const Invoice = require('../models/invoice');

const Client = require('../models/client');

const Print = require('../utils/printing/index');

const InvoiceProduct = require('../models/InvoiceProduct');

module.exports.getPlaceOrder = (req, res, next) => {
  Category.findAll({include: Product})
    .then((categories) => {
      res.render('place-order.ejs', {categories: categories});
    })
    .catch((err) => console.log(err));
};

module.exports.postPlaceOrder = async (req, res, next) => {
  let client = await Client.findByPk(req.body.client.number);
  if (!client && req.body.client.number.length > 0) {
    client = await Client.create({
      phoneNumber: req.body.client.number,
      name: req.body.client.username,
      address: req.body.client.address,
      points: 0,
    }).catch((err) => console.log(err));
  } else {
    client.phoneNumber = req.body.client.number;
    client.name = req.body.client.username;
    client.address = req.body.client.address;
    if (req.body.client.usedPoints) {
      client.points = client.points - parseInt(req.body.client.usedPoints);
    }
  }
  Invoice.create({
    discount: req.body.prices.totalDiscount,
    isDelivery: req.body.delivery,
    totalPrice: req.body.prices.overall,
    userUsername: req.body.cashier,
    clientPhoneNumber: client.phoneNumber,
  }).then(async (invoice) => {
    for (let product of req.body.products) {
      invoice.addProduct(product.id, {through: {count: product.count}});
    }
    client.points =
      parseInt(client.points) +
      parseInt(invoice.totalPrice) -
      parseInt(invoice.discount);
    if (req.body.client.number.length > 0) {
      client.save();
    }
    console.log({
      invoiceId: invoice.id,
      cashierName: 'samuel',
      products: req.body.products,
      date: invoice.createdAt,
      total: invoice.totalPrice,
      discount: invoice.discount,
      afterDiscount: req.body.prices.total,
      clientPhone: client.phoneNumber,
      clientName: client.name,
      clientAddress: client.address,
      isDelivery: invoice.isDelivery,
    });
    // Print({
    //   cashierName: 'Samuel',
    //   products:
    // })
  });
  res.send();
};
