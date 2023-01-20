const Rating = require("../../models/rating.model")
const Responses = require("../../utils/responses")

class Controller{
    constructor(){}

    static async create(req,res,next){
        try{
            const rating=await Rating.create({
                user:req.id,
                stars:req.body.stars,
                comment:req.body.comment||null,
                venue:req.body.venue
            })
            Responses.success(rating,201,'rating created',res)
        }
        catch(err){
            return Responses.failed(err,500,'error while creating',res)
        }
    }
}

module.exports= Controller