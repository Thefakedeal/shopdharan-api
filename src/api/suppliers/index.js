const express = require('express');
const router = express.Router();

const addsupplier = require('./addsupplier');
const getsuppliers = require('./getsuppliers');
const getsupplier = require('./getsupplier');
const updatesupplier = require('./updatesupplier');
const deletesupplier = require('./deletesupplier');

router.use('/add',addsupplier)
router.use('/getall', getsuppliers)
router.use('/get', getsupplier)
router.use('/update',updatesupplier)
router.use('/delete',deletesupplier);

module.exports = router