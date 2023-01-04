const mongoose=require('mongoose')

const venueSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    capacity:{
        type:Number,
        required:true,
    },
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
    },
    
},{timestamps:true})

module.exports=mongoose.model('Venue',venueSchema)