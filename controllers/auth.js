const User = require('../models/user');
const bcrypt = require('bcryptjs');
const salt = '$2a$12$NIH/WK/ESjWi5bTw7NkpZu';

module.exports.getLogin = (req,res,next) => {
    if(req.session.logedIn){
        if(req.session.role == 'admin'){
            res.redirect('home');
        }else{
            res.redirect('cashier');
        }
        return;
    }
    res.render('../views/home.ejs');
}


module.exports.postLogin = (req,res,next) => {
    const username = req.body.username;
    const password = req.body.password;
    User.findByPk(username).then( result => {
        if(result){
            const rightPassword =  result.validate(password);
            if(rightPassword){
                req.session.logedIn = true;
                req.session.role = result.role;
            }
        }
        res.redirect('');
   }).catch(err => console.log(err))
}


module.exports.logOut = (req,res,next) => {
    if(req.session.logedIn){
        req.session.destroy();
        req.session = null;
    }
    res.redirect('');
}