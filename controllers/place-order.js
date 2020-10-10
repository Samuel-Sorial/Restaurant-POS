const Product = require('../models/product');

const Category = require('../models/category');

const Invoice = require('../models/invoice');

const Client = require('../models/client');

module.exports.getPlaceOrder = (req, res, next) => {
  Category.findAll({include: Product})
    .then((categories) => {
      res.render('place-order.ejs', {categories: categories});
    })
    .catch((err) => console.log(err));
};

module.exports.postPlaceOrder = async (req, res, next) => {
  let client = await Client.findByPk(req.body.client.number);
  if (client) {
    Invoice.create({
      discount: req.body.prices.totalDiscount,
      isDelivery: req.body.delivery,
      totalPrice: req.body.prices.overall,
      userUsername: req.body.cashier,
      clientPhoneNumber: client.phoneNumber,
    }).then((invoice) => {
      for (let product of req.body.products) {
        invoice.addProduct(product.id);
      }
      invoice.save();
      console.log(invoice.createdAt);
    });
  } else {
    Invoice.create({
      discount: req.body.prices.totalDiscount,
      isDelivery: req.body.delivery,
      totalPrice: req.body.prices.overall,
      userUsername: req.body.cashier,
      clientPhoneNumber: null,
    }).then((invoice) => {
      for (let product of req.body.products) {
        invoice.addProduct(product.id);
      }
      invoice.save();
    });
  }
};
