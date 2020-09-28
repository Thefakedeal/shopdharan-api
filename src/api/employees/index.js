const express = require('express');
const router = express.Router();

const addemployee = require('./addemployee')
const getemployees = require('./getemployees');
const deleteemployee = require('./deleteemployee')
const updateemployee = require('./updateemployee')
const getemployee = require('./getemployee');


router.use('/add', addemployee);
router.use('/getall',getemployees);
router.use('/delete', deleteemployee);
router.use('/update', updateemployee) 
router.use('/get', getemployee);

module.exports = router;