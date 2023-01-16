const Responses = require("../../utils/responses")
const User = require("../../models/user.model")
const bcrypt=require('bcrypt')
const JwtControl = require("../../utils/jwtControl")

class Controller{
    constructor(){}

    static async createUser(req,res){
        const user=await User.findOne({email:req.body.email})
        if(user)return Responses.failed('user already exists',403,'forbidden',res)
        bcrypt.hash(req.body.password,10,async(err,hash)=>{
            if(err)return Responses.failed(err,500,'error while hashing password',res)
            const user=await User.create({
                name:req.body.name,
                email:req.body.email,
                role:'USER',
                password:hash,
                phone:req.body.phone,
                address:req.body.address,
                city:req.body.city,
                country:req.body.country,
                postal:req.body.postal,
            })
            Responses.success(user,201,'user created',res)
        })
    }

    static async login(req,res){
        let user=await User.findOne({email:req.body.email})
        if(!user)return Responses.failed('incorrect credentials',403,'forbidden',res)
        user={...user._doc}
        bcrypt.compare(req.body.password,user.password,async (err,same)=>{
            if(err)return Responses.failed(err,500,'error while comparing password',res)
            if(!same)return Responses.failed('incorrect credentials',403,'forbidden',res)
            if(user.role==='ADMIN')return Responses.failed('incorrect credentials',403,'forbidden',res)
            user=await JwtControl.generateAndPushInUser(user)
            Responses.success(user,201,'logged in successfully',res)
        })
    }
}

module.exports= Controller