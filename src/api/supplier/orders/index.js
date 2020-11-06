const express = require('express');
const router = express.Router();
const getneworders = require('./getneworders')
const getoldorders = require('./getoldorders')
const authenticateToken = require('../../middlewares/authenticateToken')

router.use(authenticateToken)
router.use('/getnew', getneworders)
router.use('/getold', getoldorders)
module.exports = router;