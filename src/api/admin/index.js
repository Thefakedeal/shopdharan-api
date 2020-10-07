const express = require('express');
const router = express.Router();
const login = require('./login');
const myinfo = require('./myinfo')
const changepassword = require('./changepassword')

router.use('/login', login);
router.use('/myinfo', myinfo)
router.use('/changepassword', changepassword)

module.exports = router;