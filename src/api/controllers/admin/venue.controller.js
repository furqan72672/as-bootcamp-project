const Venue = require("../../models/venue.model")
const Responses = require("../../utils/responses")
const fs=require('fs')
const path=require('path')

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
        try{
            const oldVenue=(await Venue.find({_id:req.params.id}))[0]
            let images=[]

            if(typeof req.body.oldImages==='object')images=[...req.body.oldImages]
            else if(typeof req.body.oldImages==='string')images=[req.body.oldImages]

            const deletableImages=oldVenue.images.filter(img=>images.indexOf(img)<0)
            console.log(deletableImages)
            deletableImages.forEach(img=>{
                console.log(path.join(__dirname,'../../../uploads/images',img))
                if(fs.existsSync(path.join(__dirname,'../../../uploads/images',img))){
                    fs.rmSync(path.join(__dirname,'../../../uploads/images',img))
                }
            })
            if(req.files['images']){
                req.files['images'].forEach(image=>{
                    images.push(image.filename)
                })
            }

            const venue={
                name:req.body.name||oldVenue.name,
                description:req.body.description||oldVenue.description,
                capacity:req.body.capacity||oldVenue.capacity,
                address:req.body.address||oldVenue.address,
                city:req.body.city||oldVenue.city,
                country:req.body.country||oldVenue.country,
                rating:req.body.rating||oldVenue.rating,
                images:images||oldVenue.images
            }
            Venue.updateOne({_id:req.params.id},venue,(err,result)=>{
                if(err)return Responses.failed(err,500,'error while updating',res)
                if(!result.nModified)return Responses.failed('venue not found',404,'error while updating',res)
                Responses.success(result,201,'changes saved',res)
            })
        }
        catch(err){
            console.log(err)
            return Responses.failed(err,500,'error while updating',res)
        }
    }

    static async create(req,res,next){
        try{
            let images=[]
            req.files['images'].forEach(image=>{
                images.push(image.filename)
            })
            const venue=await Venue.create({
                name:req.body.name,
                description:req.body.description,
                capacity:req.body.capacity,
                address:req.body.address,
                city:req.body.city,
                country:req.body.country,
                images:[...images]
            })
            Responses.success(venue,201,'venue created',res)
            // Responses.success('',201,'venue created',res)
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