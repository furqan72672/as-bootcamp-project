const mongoose=require('mongoose')

const venueSchema=new mongoose.Schema({
    rating:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Rating',
    },
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
    images:[String]
    
},{timestamps:true})

module.exports=mongoose.model('Venue',venueSchema)