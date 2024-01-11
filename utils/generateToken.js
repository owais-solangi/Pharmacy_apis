const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

const generateToken = async(id,email)=>{
    try {

        // Generate an accesss Token....
        const newAccessToken = jwt.sign({id:id,email:email},config.secret, {expiresIn: config.jwtExpiration} );
        return newAccessToken
        
    } catch (error) {
        console.log({
            message: "generate Token Error....",
            error
        });
        return resp = {
            message: "! Access token is not generated"
        }
        
    }
}

const RefreshToken = async(id,email)=>{
    try {

        const refreshToken = jwt.sign({email:email}, config.secret, {expiresIn: config.jwtRefreshExpiration});
        return refreshToken
        
    } catch (error) {
        console.log({
            message: "Refresh Token Error....",
            error
        });
        return resp = {
            message: "! Refresh token is not generated"
        }
    }
}

module.exports = {
    generateToken,
    RefreshToken
}