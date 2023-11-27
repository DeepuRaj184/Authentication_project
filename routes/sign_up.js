const express = require('express');

const router = express.Router()

const home_controller = require('../controllers/home_controller');
const sign_up_controller = require('../controllers/sign_up_controller');

router.post('/create/user',sign_up_controller.create)


module.exports = router