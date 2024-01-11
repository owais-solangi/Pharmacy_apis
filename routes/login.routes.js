// const express = require("express");
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const config = require("../config/auth.config")
const verifytoken = require('../middlewares/verifytoken');
const {generateToken , RefreshToken} = require('../utils/generateToken');



module.exports = function (app) {
    
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    
  //   app.post("/api/v1/login", verifytoken , async (req, res) => {
  //     try {
  //       const { email, password, refreshToken } = req.body;
    
  //       // Stronger validation
  //       if (!email || !password) {
  //         return res.status(400).json({ error: 'Please provide both email and password.' });
  //       }
    
  //       let user = await User.findOne({ where: { email } });
    
  //       if (user) {
  //         const passwordMatch = await bcrypt.compare(password, user.password);
          
  //         if (passwordMatch) {
  //           // Check if refreshToken is provided for token refresh
  //           let newAccessToken = null;

  //           if (refreshToken) {
  //             jwt.verify(refreshToken, config.secret, (err, user) => {
  //               if (err) {
  //                 console.error('Error verifying refresh token:', err);
  //               } else {
  //                 // Generate a new access token
  //                 newAccessToken = jwt.sign({ id: user.id, email: user.email }, config.secret, config.jwtRefreshExpiration);
  //               }
  //             });
  //           }

  //           // Create JWT token if not provided during refresh
  //           if (!newAccessToken) {
  //             newAccessToken = jwt.sign({ id: user.id, email: user.email }, config.secret , config.jwtExpiration);
  //           }

  //           const newRefreshToken = jwt.sign({ id: user.id, email: user.email }, config.secret);
            
  //           return res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken, message: 'Login successful.' });
  //         } else {
  //           return res.status(401).json({ error: 'Invalid email or password.' });
  //         }
  //       } else {
  //         return res.status(401).json({ error: 'Invalid email or password.' });
  //       }
  //     } catch (error) {
  //       console.error('Error during login:', error);
  //       return res.status(500).json({ error: 'Internal Server Error' });
  //     }
  // });

  app.post("/api/v1/login", async(req,res)=>{
    try {
        const {email,password} = req.body;

        if(!email || !password){
          return res.status(400).send("Please Provide email and password.....")
        }


          let user = await User.findOne({ where : {email}});
          if(user){

          const PasswordMatch = await bcrypt.compare(password , user.password);

          if(PasswordMatch){

            const newAccessToken = await generateToken(user.id, user.email)

            const refreshToken = await RefreshToken(user.id,user.email);
            // console.log(`Token: ${newAccessToken} refreshToken: ${refreshToken}`);
            return res.status(202).json({ newAccessToken : newAccessToken, refreshToken: refreshToken , message:"Login Successfully...."})
          }else{
            return res.status(400).send("error: invalid credentials");
          }

          
        }else{
          return res.status(400).send("error: email and password are wrong.....")
        }
        
      } catch (error) {
        console.log(error);
      }
  });

  app.post("/api/v1/refresh-token",async(req,res)=>{
    try {
      const refreshToken = req.body.refreshToken;

      jwt.verify(refreshToken , config.secret , async(err,user)=>{
        if(err){
          return res.status(403).send(err)
        }

        const accessToken = await generateToken(user.email);
        res.json({accessToken})
      })
      
    } catch (error) {
      console.log(error);
      
    }
  })

}