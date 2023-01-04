const mongoose=require('mongoose')

const ratingSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    venue:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Venue',
        required:true
    },
    stars:{
        type:Number,
        required:true,
    },
    comment:{
        type:String
    }
},{timestamps:true})

module.exports=mongoose.model('Rating',ratingSchema)