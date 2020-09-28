const express = require('express');
const router = express.Router();

const getCatagory = require('./getcatagory')
const getCatagories = require('./getcatagories')
const addCatagory = require('./addcatagory')
const updateCatagory = require('./updatecatagory')
const deleteCatagory = require('./deletecatagory')

router.use('/get',getCatagory);
router.use('/getall',getCatagories);
router.use('/add',addCatagory);
router.use('/update', updateCatagory);
router.use('/delete', deleteCatagory);

module.exports = router;