const router = require('express').Router();


const getinfo = require('./getinfo')
const updateinfo = require('./updateinfo')

const authenticateToken = require('../../middlewares/authenticateToken')
router.use(authenticateToken)

router.use('/get', getinfo)
router.use('/update', updateinfo)

module.exports = router