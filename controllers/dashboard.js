const user = require('../models/user');

const handle = (req,res,next) => {
    res.send('Hello');
};

module.exports = handle;