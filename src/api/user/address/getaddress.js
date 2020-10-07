const router = require('express').Router();
const db =  require('../../../db')
const ROLES = require('../../defaults/roles.json')
router.get('/', async (req,res)=>{
    try{
        if(req.role !== ROLES.USER) return res.status(403).send("Only Users Can Perform this action")
        const user_id = req.id;
        const query = await db.query(`SELECT address.address_id, address.city_id, address.street_name, address.details 
        FROM address,user_address
        WHERE address.address_id = user_address.address_id AND user_address.user_id=$1
        `,[user_id])
        const addresses =  query.rows;
        res.json(addresses)
    }catch(err){
        res.status(500).send("Something Went wrong")
    }
})

module.exports = router;