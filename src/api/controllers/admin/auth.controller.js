const Responses = require("../../utils/responses")
const User = require("../../models/user.model")
const mongoose = require("mongoose")
const bcrypt=require('bcrypt')
const JwtControl = require("../../utils/jwtControl")

class Controller{
    constructor(){}

    static async createOnce(req,res){
        const users=await User.find({role:'ADMIN'})
        if(users.length)return Responses.failed('admin already present',403,'forbidden',res)
        bcrypt.hash(req.body.password,10,async(err,hash)=>{
            if(err)return Responses.failed(err,500,'error while hashing password',res)
            const user=await User.create({
                name:req.body.name,
                email:req.body.email,
                role:'ADMIN',
                password:hash
            })
            Responses.success(user,201,'admin created',res)
        })
    }

    static async login(req,res){
        let user=await User.find({email:req.body.email})
        if(user.length===0)return Responses.failed('incorrect credentials',403,'forbidden',res)
        user={...user[0]._doc}
        bcrypt.compare(req.body.password,user.password,async (err,same)=>{
            if(err)return Responses.failed(err,500,'error while comparing password',res)
            if(!same)return Responses.failed('incorrect credentials',403,'forbidden',res)
            if(user.role!=='ADMIN')return Responses.failed('incorrect credentials',403,'forbidden',res)
            user=await JwtControl.generateAndPushInUser(user)
            console.log(user)
            Responses.success(user,201,'logged in successfully',res)
        })
    }
}

module.exports= Controller