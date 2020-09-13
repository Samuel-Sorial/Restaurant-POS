const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('' , authController.getLogin);

router.post('', authController.postLogin);

router.post('/logout', authController.logOut);

router.get('/logout', (req,res,next) => res.send('hell'));

router.get('/:anylink', (req,res,next) => {
    res.render('error404.ejs');
})

module.exports = router;