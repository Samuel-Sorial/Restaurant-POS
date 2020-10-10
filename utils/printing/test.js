const print = require('./index');

let json = require('./test-invoice.json');
json.date = new Date(json.date);
print(json);
