const express = require('express');
const router = express.Router();
const getorders = require('./getorders')
const authenticateToken = require('../../middlewares/authenticateToken')

router.use(authenticateToken)
router.use('/getall', getorders)

module.exports = router;