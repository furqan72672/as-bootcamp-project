const Appointment = require("../../models/appointment.model")
const Responses = require("../../utils/responses")

class Controller{
    constructor(){}

    static async create(req,res,next){
        try{
            const appointment=await Appointment.create({
                user:req.id,
                date:req.body.date,
                time:req.body.time,
                office:req.body.office
            })
            Responses.success(appointment,201,'appointment created',res)
        }
        catch(err){
            return Responses.failed(err,500,'error while creating',res)
        }
    }

    static async list(req,res,next){
        try{
            const appointment=await Appointment.find({user:req.id})
            Responses.success(appointment,200,'list retrieved',res)
        }
        catch(err){
            return Responses.failed(err,500,'error while retrieving',res)
        }
    }
}

module.exports= Controller