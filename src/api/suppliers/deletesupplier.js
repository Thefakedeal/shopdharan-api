const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authenticateToken')
const db = require('../../db')

const ROLES = require('../defaults/roles.json')
router.delete('/',authenticateToken, async(req,res)=>{
    try{
      if (req.role != ROLES.ADMIN) return res.sendStatus(403);
        const supplier_id = req.body.supplier_id;
        await db.query(`DELETE FROM suppliers WHERE supplier_id=$1`,[supplier_id])
        res.sendStatus(204)
    }catch(err){
        res.sendStatus(500)
    }
})

module.exports = router;