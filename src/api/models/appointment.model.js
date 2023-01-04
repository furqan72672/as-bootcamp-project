const mongoose=require('mongoose')

const appointmentSchema=new mongoose.Schema({
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
    status:{
        type:String,
        enum: ['PENDING','ACCEPTED','REJECTED'],
        default:'PENDING'
    },
},{timestamps:true})

module.exports=mongoose.model('Appointment',appointmentSchema)