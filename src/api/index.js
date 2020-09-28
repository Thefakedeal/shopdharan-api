const express = require('express');

const admin = require('./admin');
const supplier = require('./supplier');

const catagories = require('./catagories');
const employees = require('./employees')
const cities = require('./cities')
const suppliers = require('./suppliers')

const router = express.Router();


router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});


router.use('/admin', admin);
router.use('/supplier', supplier);

router.use('/catagories',catagories);
router.use('/employees',employees)
router.use('/cities', cities)
router.use('/suppliers',suppliers);

module.exports = router;
