const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')

router.post('/',(req,res)=>{
    const refreshToken = req.body.refreshToken;
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
    if (err) return res.sendStatus(403);
    const newUser= {
        id: user.id,
        role: user.role,
    }
    const accessToken = jwt.sign(newUser, process.env.ACCESS_TOKEN_SECRET,{expiresIn:'15m'});
    res.json({accessToken})
    });
})

module.exports =router;