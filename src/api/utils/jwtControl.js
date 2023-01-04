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

    
}

module.exports= JwtControl