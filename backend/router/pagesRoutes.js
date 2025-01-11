const express = require('express');
const { SignUpPage } = require('../controllers/SignUpControllers');
const { LoginPage } = require('../controllers/LoginControllers');
const router = express.Router()

router.route('/signup').post(SignUpPage);
router.route('/login').post(LoginPage);

module.exports = router;