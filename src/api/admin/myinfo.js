const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authenticateToken');
const db = require('../../db')
const ROLES = require('../defaults/roles.json')

router.get('/', authenticateToken, async (req,res)=>{
    try{
        if(req.role !== ROLES.ADMIN || ROLES.EMPLOYEE) return res.status(403).send("You Dont Have Access To This Route")
        const request = await db.query(`SELECT employee_id,employee_name, is_admin, user_name, added, email
            FROM employee where employee_id = $1
        `,[req.id])
        const myinfo = request.rows[0]
        res.json(myinfo)
    }catch(err){
        res.status(500).send("Something Went Wrong")
    }  
})

module.exports = router;