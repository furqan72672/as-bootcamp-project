const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type: String,
        enum: ['ADMIN','USER'],
        default:'USER'
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
    },
    address:{
        type:String,
    },
    city:{
        type:String,
    },
    country:{
        type:String,
    },
    postal:{
        type:String
    }

    
},{timestamps:true})

module.exports=mongoose.model('User',userSchema)