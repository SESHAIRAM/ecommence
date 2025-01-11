const express = require('express');
const { SignUpPage } = require('../controllers/SignUpControllers');
const router = express.Router()

router.route('/signup').post(SignUpPage);

module.exports = router;