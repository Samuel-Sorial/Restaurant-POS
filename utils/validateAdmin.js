
const validateAdmin = (req) => {
    return req.session.logedIn && req.session.role == 'admin';
}


module.exports = validateAdmin;