const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')

router.post('/',(req,res)=>{
    const accessToken = req.body.accessToken;
    jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
    if (err) return res.json({valid: false})
    res.status(200).json({valid: true})
    });
})

module.exports =router;
 