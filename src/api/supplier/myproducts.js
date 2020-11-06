const express = require('express');
const router = express.Router();
const db = require('../../db')
const ROLES = require('../defaults/roles.json')
const authenticateToken = require('../middlewares/authenticateToken')

router.get('/', authenticateToken, async (req,res)=>{
    try{
        if(req.role !== ROLES.SUPPLIER) return res.status(403).send("Only Suppliers Can Access This Info")
        const query = await db.query('SELECT * FROM products WHERE supplier_id=$1',[req.id])
        const products = query.rows;
        res.json(products)
    }catch(err){
        res.status(500).send(err)
    }
})


module.exports = router;
