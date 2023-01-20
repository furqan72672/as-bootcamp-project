const Venue = require("../../models/venue.model")
const Rating = require("../../models/rating.model")
const Responses = require("../../utils/responses")
const mongoose = require("mongoose")

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

    static async getOne(req,res,next){

        try{
            const venue=await Venue.findById(req.params.id)
            if(!venue?._id)return Responses.notFound('venue',res)
            if(!venue?.rating||venue.rating.length===0)return Responses.success(venue,200,'venue retrieved',res)
            const ratings=await Rating.aggregate([
                {
                    $match:{
                        venue:new mongoose.Types.ObjectId("63b6cdf279ce450da424cc6e")
                    }
                },
                {
                    $group:{
                        _id:"$venue",
                        "stars":{$sum:"$stars"},
                        "count":{$sum:1}
                    }
                }
            ])
            venue._doc.stars=ratings[0].stars
            venue._doc.count=ratings[0].count
            Responses.success(venue,200,'list retrieved',res)
        }
        catch(err){
            return Responses.failed(err,500,'error while retrieving',res)
        }
    }
}

module.exports= Controller