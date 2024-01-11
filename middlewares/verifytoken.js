const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

const verifyToken = async(req,res,next)=>{

    const token = req.header('x-access-token');

    if(!token){
        return res.status(400).json({message: "unauthorized"});
    }

    jwt.verify(token, config.secret,(err,user)=>{
        if(err){
            return res.status(404).json({message : "Forbidden...."});
        }

        req.user = user;
        next();
    })

}

module.exports = verifyToken;