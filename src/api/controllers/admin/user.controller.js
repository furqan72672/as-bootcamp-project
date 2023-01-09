const Responses = require("../../utils/responses")
const User = require("../../models/user.model")
const mongoose = require("mongoose")
const bcrypt=require('bcrypt')
const JwtControl = require("../../utils/jwtControl")

class Controller{
    constructor(){}

    static async getProfile(req,res,next){
        const id=await JwtControl.extractId(req.token)
        try{
            const user=await User.findOne({_id:id})
            if(!user._id)return Responses.failed('user not found',404,'error while retrieving',res)
            Responses.success(user,200,'profile retrieved',res)
        }
        catch(err){
            Responses.failed(err,500,'error while retrieving',res)
        }
    }

    static async updateProfile(req,res,next){
        try{
            const oldUser=await User.findOne({_id:req.params.id})
            if(req.body.password){
                bcrypt.hash(req.body.password,10,async (err,hash)=>{
                    if(err)return Responses.failed(err,500,'error while encrypting password',res)
                    const payload={
                        name:req.body.name||oldUser.name,
                        password:hash||oldUser.password
                    }
                    const user=await User.updateOne({_id:req.params.id},payload)
                    if(user.nModified!==1)return Responses.failed('user did not update',500,'error while updating',res)
                    Responses.success(user,201,'profile updated',res)
                })
            }
            else{
                const payload={
                    name:req.body.name||oldUser.name,
                    password:oldUser.password
                }
                const user=await User.updateOne({_id:req.params.id},payload)
                if(user.nModified!==1)return Responses.failed('user did not update',500,'error while updating',res)
                Responses.success(user,201,'profile updated',res)
            }
            
        }
        catch(err){
            Responses.failed(err,500,'error while updating',res)
        }
    }
}

module.exports= Controller