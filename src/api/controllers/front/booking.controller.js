const Booking = require("../../models/booking.model")
const Responses = require("../../utils/responses")

class Controller{
    constructor(){}

    static async create(req,res,next){
        try{
            const booking=await Booking.create({
                user:req.id,
                date:req.body.date,
                time:req.body.time,
                venue:req.body.venue
            })
            Responses.success(booking,201,'booking created',res)
        }
        catch(err){
            return Responses.failed(err,500,'error while creating',res)
        }
    }

    static async list(req,res,next){
        try{
            const booking=await Booking.find({user:req.id})
            Responses.success(booking,200,'list retrieved',res)
        }
        catch(err){
            return Responses.failed(err,500,'error while retrieving',res)
        }
    }
}

module.exports= Controller