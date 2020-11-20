const Print = require('./utils/printOrder');
const inv = require('./invoice.json');

var data = { ...inv };
data.date = new Date(inv.date);
data.force = true;
Print(data);
