const express= require('express')
const router = express.Router()
const db = require('../../db')

router.get('/',async (req,res)=>{
    try{
        const supplier_id = req.query.supplier_id;
        const available = req.query.available;
        const product_name = req.query.product_name;
        const page_no = req.query.page_no || 0;
        const name = `%${product_name}%`
        const request = await db.query(`SELECT product_id,product_name,supplier_id,product_description,image_id,available,price
        FROM products WHERE ($1::text IS NULL OR supplier_id=$1) AND ($2::boolean IS NULL OR available=$2)
        AND ($3::text IS NULL OR product_name ILIKE $4) LIMIT 10 OFFSET $5`,[supplier_id,available,product_name,name,page_no])
        const products = request.rows;
        res.status(200).json(products)
    }catch(err){
        console.log(err)
        res.sendStatus(400)
    }
})

module.exports = router;