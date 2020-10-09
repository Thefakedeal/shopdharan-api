const router = require('express').Router()
const authenticateToken =  require('../../middlewares/authenticateToken')
const getorders = require('./getorders')
const getorder =require('./getorder')
const updateorderstatus = require('./updateorderstatus')
const getorderstatus = require('./getorderstatus')
const deleteorder= require('./deleteorder')

router.use(authenticateToken)
router.use('/getall', getorders)
router.use('/get',getorder)
router.use('/update', updateorderstatus)
router.use('/getorderstatus',getorderstatus)
router.use('/delete', deleteorder)

module.exports = router;