const Venue = require("../../models/venue.model")
const Responses = require("../../utils/responses")

class Controller{
    constructor(){}

    static async list(req,res,next){
        try{
            const venues=await Venue.find().populate({path: 'rating',populate: {path: 'user'} })
            Responses.success(venues,200,'list retrieved',res)
        }
        catch(err){
            return Responses.failed(err,500,'error while retrieving',res)
        }
    }
}

module.exports= Controller