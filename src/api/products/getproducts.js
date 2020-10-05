const express= require('express')
const router = express.Router()
const db = require('../../db')

router.get('/',async (req,res)=>{
    try{
        const supplier_id = req.query.supplier_id;
        const available = req.query.available;
        const request = await db.query(`SELECT product_id,product_name,supplier_id,product_description,image_id,available,price
        FROM products WHERE supplier_id=$1 AND ($2::boolean IS NULL OR available=$2)`,[supplier_id,available])
        const products = request.rows;
        res.status(200).json(products)
    }catch(err){
        res.sendStatus(400)
    }
})

module.exports = router;