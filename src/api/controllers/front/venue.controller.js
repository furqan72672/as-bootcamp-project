const Venue = require("../../models/venue.model")
const Rating = require("../../models/rating.model")
const Responses = require("../../utils/responses")

class Controller{
    constructor(){}

    static async list(req,res,next){
        try{
            const venues=await Venue.find().populate({path: 'rating',populate: {path: 'user'} })
            // venues.forEach((venue)=>{
            //     const totalRating=await Rating.aggregate([
            //         {
            //             $group:{
            //                 venue:"$venue",
            //                 total:{$sum:"$stars"},
            //                 count:{$sum:1}
            //             }
            //         }
            //     ])
            // })

            // const totalRating=await Rating.aggregate([
            //     {
            //         $match:{
            //             venue:'63bdb79d1e921f4852377f2b'
            //         }
            //     },
            //     {
            //         $group:{
            //             total:{$sum:"$stars"},
            //             count:{$sum:1}
            //         }
            //     }
            // ])
            // console.log(totalRating)
            
            Responses.success(venues,200,'list retrieved',res)
        }
        catch(err){
            return Responses.failed(err,500,'error while retrieving',res)
        }
    }
}

module.exports= Controller