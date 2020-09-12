const user = require('../models/user');

const getDashboard = (req,res,next) => {
    res.send('Hello');
};

module.exports = getDashboard;