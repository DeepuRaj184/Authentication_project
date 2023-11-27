const express = require('express');

const router = express.Router()

const home_controller = require('../controllers/home_controller')
const sign_in_controller = require('../controllers/sign_in_controller');
const passport = require('passport');

router.post('/user/loggedin',passport.checkAuthentication,sign_in_controller.loggedin)
router.get('/user/loggedin',sign_in_controller.loggedin)
router.post('/user/reset',sign_in_controller.reset)
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/user/callback',passport.authenticate('google',{failureRedirect:'/'}),sign_in_controller.loggedinpage);
router.get('/user/sign-out',sign_in_controller.destroy)

module.exports = router