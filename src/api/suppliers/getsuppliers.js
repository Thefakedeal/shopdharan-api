const express = require('express');
const router = express.Router();
const db = require('../../db')


router.get('/',async (req,res)=>{
    try{
        const {
            visible,
            city_id,
            catagory_id,
            supplier_name
        } = req.query;
    
        const name = `%${supplier_name}%`
        const query = await db.query(`SELECT supplier_id, supplier_name,contact_number, visible,supplier_description,image_id
            FROM suppliers
            WHERE ($1::boolean IS NULL OR visible=$1) AND ($2::text IS NULL OR city_id=$2)
            AND ($3::text IS NULL OR catagory_id=$3) AND ($4::text IS NULL OR supplier_name ILIKE $5)
        `,[visible,city_id,catagory_id,supplier_name, name])
        const suppliers = query.rows;
        res.json(suppliers)
    }
    catch(err){
        res.sendStatus(500)
    }

})

module.exports = router;
