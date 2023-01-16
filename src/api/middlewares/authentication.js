const JwtControl = require("../utils/jwtControl")
const Responses = require('../utils/responses')

exports.adminAuth=async function(req,res,next){
    const authHeader=req.headers['Authorization']||req.headers['authorization']
    const token=authHeader.split(' ')[1]
    req.token=token
    const verification=await JwtControl.verifyAdmin(token)
    if(!verification)return Responses.failedAuth(res)
    next()
}