const user = require('../models/user');

module.exports.getDashboard = (req, res, next) => {
    if(req.session.logedIn && req.session.role == 'admin'){
        console.log('hi');
        res.render('admin/dashboard.ejs',{
            currentPage:'dashboard'
        })
    }else{
        res.send('You are not authorized to view the dashboard');
    }
}