const express = require('express');
const router = express.Router();
const login = require('./login');



router.use('/login', login);


module.exports = router;