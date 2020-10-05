const express = require('express');

const admin = require('./admin');
const supplier = require('./supplier');

const catagories = require('./catagories');
const employees = require('./employees')
const cities = require('./cities')
const suppliers = require('./suppliers')
const token = require('./token')
const products = require('./products')
const validateToken = require('./validatetoken');

const router = express.Router();


router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});


router.use('/admin', admin);
router.use('/supplier', supplier);
router.use('/products', products)
router.use('/catagories',catagories);
router.use('/employees',employees)
router.use('/cities', cities)
router.use('/suppliers',suppliers);
router.use('/token',token);
router.use('/validate', validateToken);
module.exports = router;
