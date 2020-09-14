const user = require('../models/user');

module.exports.getDashboard = (req, res, next) => {
    console.log('helo')
    if(req.session.logedIn && req.session.role == 'admin'){
        res.render('admin/dashboard.ejs',{
            currentPage:'dashboard'
        })
    }else{
        res.send('you are not authorized');
    }
}