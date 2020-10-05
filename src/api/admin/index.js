const express = require('express');
const router = express.Router();
const login = require('./login');
const myinfo = require('./myinfo')


router.use('/login', login);
router.use('/myinfo', myinfo)

module.exports = router;