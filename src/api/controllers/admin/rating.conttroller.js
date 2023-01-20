const Rating = require("../../models/rating.model")
const Responses = require("../../utils/responses")

class Controller{
    constructor(){}

    static async list(req,res,next){
        try{
            const rating=await Rating.find().populate('user').populate('venue')
            Responses.success(rating,200,'list retrieved',res)
        }
        catch(err){
            return Responses.failed(err,500,'error while retrieving',res)
        }
    }

    static async remove(req,res,next){
        Rating.deleteOne({_id:req.params.id},(err,result)=>{
            if(err)return Responses.failed(err,500,'error while deleting',res)
            if(!result.deletedCount)return Responses.notFound('rating',res)
            Responses.success(result,201,'rating deleted',res)
        })
    }
}

module.exports=Controller