const express = require('express');
const router = express.Router();
const db = require('../../../db')
const ROLES = require('../../defaults/roles.json')

router.get('/',async (req,res)=>{
    
    try{
        if(req.role !== ROLES.SUPPLIER) return res.status(403).send("You Cant Access This")
        const supplier_id = req.id;
        const query = await db.query(`SELECT supplier_id,supplier_name,image_id,city_id,
        email_id,supplier_description,visible,catagory_id,contact_number
        FROM suppliers
        WHERE supplier_id=$1
        `,[supplier_id])
        const supplier = query.rows[0];
        if(!supplier) res.sendStatus(404);
        res.json(supplier)
    }
    catch(err){
        res.sendStatus(500)
    }

})

module.exports = router;