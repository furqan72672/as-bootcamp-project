const Booking=require('../../models/booking.model')
const Responses = require('../../utils/responses')

class Controller{
    constructor(){}

    static async list(req,res,next){
        try{
            const bookings=await Booking.find().populate('user').populate('venue')
            Responses.success(bookings,200,'list retrieved',res)
        }
        catch(err){
            return Responses.failed(err,500,'error while retrieving',res)
        }
    }
}

module.exports=Controller