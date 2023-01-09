const Appointment = require("../../models/appointment.model")
const Responses = require("../../utils/responses")

class Controller{
    constructor(){}

    static async list(req,res,next){
        try{
            const appointments=await Appointment.find().populate('user').populate('office')
            Responses.success(appointments,200,'list retrieved',res)
        }
        catch(err){
            return Responses.failed(err,500,'error while retrieving',res)
        }
    }

    static async edit(req,res,next){
        Appointment.updateOne({_id:req.params.id},{status:req.body.status.toUpperCase()},(err,result)=>{
            if(err)return Responses.failed(err,500,'error while updating',res)
            if(!result.nModified)return Responses.failed('appointment not found',404,'error while updating',res)
            Responses.success(result,201,'changes saved',res)
        })
    }
}

module.exports=Controller