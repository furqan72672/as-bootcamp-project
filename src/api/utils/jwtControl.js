const jwt = require('jsonwebtoken');
const vars=require('../../config/vars')
const jwt_secret=vars.jwt.secret
const User=require('../models/user.model')

class JwtControl{

    constructor(){}

    static async generateAndPushInUser(user){
        const jwt_payload={
            _id:user._id,
            email:user.email,
            role:user.role
        }
        const token=jwt.sign(jwt_payload,jwt_secret)
        user.token=token
        return user
    }

    static async verifyAdmin(token){
        try{
            const decoded=jwt.verify(token,jwt_secret)
            if(!decoded._id)return false
            const user=await User.findById(decoded._id)
            if(user.role!=='ADMIN')return false
            return true
        }
        catch(err){
            return false
        }
    }

    static async extractId(token){
        const decodedToken=jwt.decode(token)
        return decodedToken._id
    }
    
}

module.exports= JwtControl