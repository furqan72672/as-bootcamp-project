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

    static async edit(req,res,next){
        Venue.updateOne({_id:req.params.id},{status:req.body.status.toUpperCase()},(err,result)=>{
            if(err)return Responses.failed(err,500,'error while updating',res)
            if(!result.nModified)return Responses.failed('venue not found',404,'error while updating',res)
            Responses.success(result,201,'changes saved',res)
        })
    }

    static async create(req,res,next){
        try{
            const venue=await Venue.create({
                name:req.body.name,
                description:req.body.description,
                capacity:req.body.capacity,
                address:req.body.address,
                city:req.body.city,
                country:req.body.country
            })
            Responses.success(venue,201,'venue created',res)
        }
        catch(err){
            Responses.failed(err,500,'error while creating',res)
        }
    }

    static async remove(req,res,next){
        Venue.deleteOne({_id:req.params.id},(err,result)=>{
            if(err)return Responses.failed(err,500,'error while deleting',res)
            if(!result.deletedCount)return Responses.failed('venue not found',404,'error while deleting',res)
            Responses.success(result,201,'venue deleted',res)
        })
    }
}

module.exports=Controller