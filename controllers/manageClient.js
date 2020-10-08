const Client = require('../models/client');

module.exports.getManageClient = (req, res, next) => {
    Client.findAll().then( clients => {
        res.render('user.ejs', {clients: clients})
    });
}

module.exports.postManageClient = (req, res, next) => {
    Client.create({
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        points: 0
    });
    res.redirect('/manage-client');
}