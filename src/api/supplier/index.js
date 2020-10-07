const express = require('express');
const router = express.Router();
const login = require('./login');
const myproducts = require('./myproducts')
const changepassword = require('./changepassword')

router.use('/login', login);
router.use('/myproducts', myproducts)
router.use('/changepassword', changepassword)

module.exports = router;