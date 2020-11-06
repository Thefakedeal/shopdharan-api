const express = require('express');
const router = express.Router();

const admin = require('./admin');
const supplier = require('./supplier');
const user = require('./user')

const catagories = require('./catagories');
const employees = require('./employees')
const cities = require('./cities')
const suppliers = require('./suppliers')
const token = require('./token')
const products = require('./products')
const validateToken = require('./validatetoken');
const order_status = require('./orderstatus')
const logout = require('./logout')

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});


router.use('/admin', admin);
router.use('/supplier', supplier);
router.use('/user', user)

router.use('/products', products)
router.use('/catagories',catagories);
router.use('/employees',employees)
router.use('/cities', cities)
router.use('/suppliers',suppliers);
router.use('/token',token);
router.use('/validate', validateToken);
router.use('/orderstatus',order_status)

router.use('/logout', logout)
module.exports = router;
