const Client = require('../models/client');
const { Op } = require('sequelize');

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


module.exports.userExists = (req, res, next) => {
    Client.findByPk(req.params.phoneNumber).then( client => {
        if(client){
            res.status(200).send('found');
        }else{
            res.status(201).send('notFound');
        }
    })
}

module.exports.findUsers = (req, res, next) => {
    Client.findAll({where:{phoneNumber: {
        [Op.like] : `${req.params.phoneNumber}%`
    }}}).then( users => {
        res.send(users);
    })
}