const mongoose=require('mongoose')

const forgotPasswordSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    secret:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports=mongoose.model('ForgotPassword',forgotPasswordSchema)