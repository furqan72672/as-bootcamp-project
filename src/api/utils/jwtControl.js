const jwt = require('jsonwebtoken');
const vars=require('../../config/vars')
const jwt_secret=vars.jwt.secret

class JwtControl{

    constructor(){}

    static async generateAndPushInUser(user){
        const jwt_payload={
            _id:user._id,
            email:user.email,
            role:user.role
        }
        const token=await jwt.sign(jwt_payload,jwt_secret)
        user.token=token
        return user
    }

    static async verifyUser(token){
        let verification
        jwt.verify(token,jwt_secret,(err,decoded)=>{
            if(err)return verification=false
            if(!decoded._id)return verification=false
            verification=true
        })
        return verification
    }

    static async extractId(token){
        const decodedToken=jwt.decode(token)
        return decodedToken._id
    }
    
}

module.exports= JwtControl