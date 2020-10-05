const express= require('express')
const router = express.Router()

const getproducts = require('./getproducts')
const getproduct = require('./getproduct')
const addproduct = require('./addproduct')
const updateproduct = require('./updateproduct')
const searchproducts = require('./searchproducts')
const deleteproduct = require('./deleteproduct')

router.use('/getall',getproducts)
router.use('/get', getproduct)
router.use('/add',addproduct)
router.use('/update', updateproduct)
router.use('/search', searchproducts)
router.use('/delete', deleteproduct)

module.exports = router;