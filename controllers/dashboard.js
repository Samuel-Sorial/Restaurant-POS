const user = require('../models/user');

module.exports.getDashboard = (req, res, next) => {
    if(req.session.logedIn && req.session.role == 'admin'){
        res.render('dashboard.ejs',{
            currentPage:'dashboard'
        })
    }else{
        res.send('you are not authorized');
    }
}