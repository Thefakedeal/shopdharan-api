const express = require('express');
const router = express.Router();

const addcity = require('./addcity')
const getcities = require('./getcities')
const getcity = require('./getcity')
const updatecity = require('./updatecity')
const deletecity = require('./deletecity')

router.use('/add',addcity);
router.use('/getall', getcities);
router.use('/get', getcity);
router.use('/update', updatecity);
router.use('/delete', deletecity);

module.exports = router;