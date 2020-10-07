const express = require('express');
const router = express.Router();
const getorders = require('./getorders')
const cancelorder = require('./cancelorder')
const addorder = require('./addorder')
const getorder = require('./getorder')

router.use('/get', getorder)
router.use('/getall',getorders)
router.use('/cancel', cancelorder)
router.use('/add',addorder)

module.exports = router;