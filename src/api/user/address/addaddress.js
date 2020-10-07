const router = require('express').Router()
const uuid = require('uuid')

const ROLES = require('../../defaults/roles.json')
const db = require('../../../db')

router.post('/', async (req,res)=>{
    
    const client = await db.connect()
    try{
        if(req.role !== ROLES.USER) return res.status(403).send("Only Users Can Perform this action")
        const address_id = uuid.v4()
        const {city_id,street_name,details} = req.body;
        if(!city_id) return res.status(400).send("City Must Be Specified")
        if(!street_name) return res.status(400).send("Street Name Must Be Specified");
        
        await client.query(`BEGIN`)
        const addaddress = await client.query(`INSERT INTO address(address_id, city_id, street_name, details) 
            VALUES($1,$2,$3,$4)
        `,[address_id,city_id,street_name,details])
        const linkaddress= await client.query(`INSERT INTO user_address(user_id, address_id) VALUES($1,$2)`,[req.id,address_id])
        client.query('COMMIT')
        res.json(address_id)
    }catch(err){
        res.status(500).send("Something Went Wrong.")
        client.query(`ROLLBACK`)
    }finally{
        client.release()
    }
})

module.exports = router;