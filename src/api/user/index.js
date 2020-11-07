const express = require('express');
const router = express.Router();

const orders = require('./orders')
const address = require('./address')

const signup = require('./signup')
const login = require('./login')
const changepassword = require('./changepassword')
const requestpin = require('./requestpin')

router.use('/orders', orders)
router.use('/address',address)

router.use('/signup', signup)
router.use('/login',login)
router.use('/changepassword',changepassword)
router.use('/requestpin', requestpin)

module.exports = router;