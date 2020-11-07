const express = require('express');
const router = express.Router();
const login = require('./login');
const orders = require('./orders')
const myproducts = require('./myproducts')
const changepassword = require('./changepassword')
const info = require('./info')
const photo = require('./photo')

const requestpin = require('./requestpin')
const forgotpassword = require('./forgotpassword')

router.use('/login', login);
router.use('/myproducts', myproducts)
router.use('/changepassword', changepassword)
router.use('/orders', orders)
router.use('/info', info)
router.use('/photo', photo)
router.use('/requestpin', requestpin)
router.use('/forgotpassword', forgotpassword)

module.exports = router;