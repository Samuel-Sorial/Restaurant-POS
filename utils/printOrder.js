const print = require('./printing/index');

module.exports = function (inv) {
  inv.products = inv.products.map(p => {
    let total =
      p.ratio > 0
        ? p.price * (((p.count - 1) * p.ratio) / 100 + 1)
        : p.count * p.price;
    p.total = Math.round(100 * total) / 100;
    return p;
  });
  inv.isDiscount = inv.discount > 0 ;
  print(inv);
};
