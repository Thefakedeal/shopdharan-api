const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')

router.post('/token',(req,res)=>{
    const refreshToken = req.body.refreshToken;
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
    if (err) return res.sendStatus(403);
    const newUser= {
        id: user.id,
        is_user: user.is_user,
        is_supplier: user.is_supplier,
        is_employee: user.is_employee,
        is_admin: user.is_admin,
    }
    const accessToken = jwt.sign(newUser, process.env.ACCESS_TOKEN_SECRET,{expiresIn:'15m'});
    res.json({accessToken})
    });
})

module.exports =router;