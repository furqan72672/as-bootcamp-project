const Responses = require("../../utils/responses")
const User = require("../../models/user.model")
const bcrypt=require('bcrypt')
const JwtControl = require("../../utils/jwtControl")
const Email=require('../../utils/emailControl')
const ForgotPassword = require("../../models/forgotPassword.model")
const randomString=require('../../utils/randomString')


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

    static async forgotPassword(req,res){
        let user=await User.findOne({email:req.body.email})
        if(!user)return Responses.failed('incorrect credentials',403,'forbidden',res)
        const fpUser=await ForgotPassword.findOne({user:user._id})
        let secret
        if(!fpUser?._id){
            secret=randomString.generate()
            const fp=await ForgotPassword.create({user:user._id,secret:secret})
            if(!fp?._id)return Responses.failed(fp,500,'error while creating reset email',res)
        }
        else{
            secret=fpUser.secret
        }
        await Email.sendResetEmail(req,res,secret)
    }

    static async verifySecret(req,res){
        const fp=await ForgotPassword.findOne({secret:req.body.secret})
        if(!fp?._id)return Responses.failed('incorrect credentials',403,'forbidden',res)
        const del=await ForgotPassword.deleteOne({secret:req.body.secret})
        if(!del.deletedCount)return Responses.failed('incorrect credentials',403,'forbidden',res)
        const user=await User.findById(fp.user)
        if(!user?._id)return Responses.failed('error while verifying',403,'can not verify user',res)
        Responses.success(user,200,'reset password',res)
    }

    static async resetPassword(req,res){
        const user=await User.findById(req.body.id)
        if(!user?._id)return Responses.failed('incorrect credentials',403,'forbidden',res)
        bcrypt.hash(req.body.password,10,async(err,hash)=>{
            if(err)return Responses.failed(err,500,'error while hashing password',res)
            const newUser=await User.findByIdAndUpdate(user._id,{password:hash})
            Responses.success(newUser,201,'user updated',res)
        })
    }

}

module.exports= Controller