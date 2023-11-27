const express = require('express');

const router = express.Router()

const home_controller = require('../controllers/home_controller');
const passport = require('passport');

router.get('/',home_controller.home)
router.post('/createsession',passport.authenticate('local',{failureRedirect:'/'}),home_controller.createsession)
router.get('/user/sign-up',home_controller.sign_up);
router.use('/sign-up',require('./sign_up'));
router.use('/sign-in',require('./sign_in'))

module.exports = router;