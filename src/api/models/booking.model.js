const mongoose=require('mongoose')

const bookingSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    date:{
        type:Date,
        required:true,
    },
    time:{
        type:String,
        required:true,
    },
    venue:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Venue',
        required:true
    },
    status:{
        type:String,
        enum: ['PENDING','COMPLETED'],
        default:'PENDING'
    },
},{timestamps:true})

module.exports=mongoose.model('Booking',bookingSchema)