const mongoose=require('mongoose')

const officeSchema=new mongoose.Schema({
    address:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    country:{
        type:String,
        required:true,
    }
},{timestamps:true})

module.exports=mongoose.model('Office',officeSchema)