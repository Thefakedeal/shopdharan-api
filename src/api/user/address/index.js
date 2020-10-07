const router = require('express').Router()
const authenticateToken = require('../../middlewares/authenticateToken')
const addaddress = require('./addaddress')
const getaddress = require('./getaddress')
const deleteaddress = require('./deleteaddress')

router.use(authenticateToken)

router.use('/add',addaddress)
router.use('/getall', getaddress)
router.use('/delete', deleteaddress)

module.exports = router;