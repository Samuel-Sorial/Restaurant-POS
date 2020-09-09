const User = require('../models/user');
const bcrypt = require('bcryptjs');
const salt = '$2a$12$NIH/WK/ESjWi5bTw7NkpZu';

module.exports.getLogin = (req,res,next) => {
    res.render('../views/home.ejs');
}


module.exports.postLogin = (req,res,next) => {
    req.session.logedIn = true;
    const username = req.body.username;
    const password = req.body.password;
    
}