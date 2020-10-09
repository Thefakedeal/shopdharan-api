const express = require('express');
const router = express.Router();

const login = require('./login');
const myinfo = require('./myinfo')
const changepassword = require('./changepassword')
const orders = require('./orders')

router.use('/login', login);
router.use('/myinfo', myinfo)
router.use('/changepassword', changepassword)
router.use('/orders', orders)

module.exports = router;