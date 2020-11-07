const express = require('express');
const router = express.Router();

const orders = require('./orders')
const address = require('./address')

const signup = require('./signup')
const login = require('./login')
const changepassword = require('./changepassword')
const requestpin = require('./requestpin')
const forgotpassword = require('./forgotpassword')

router.use('/orders', orders)
router.use('/address',address)

router.use('/signup', signup)
router.use('/login',login)
router.use('/changepassword',changepassword)
router.use('/requestpin', requestpin)
router.use('/forgotpassword', forgotpassword)

module.exports = router;