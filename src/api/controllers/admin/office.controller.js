const Office=require('../../models/office.model')
const Responses = require('../../utils/responses')

class Controller{
    constructor(){}

    static async list(req,res,next){
        try{
            const offices=await Office.find()
            Responses.success(offices,200,'list retrieved',res)
        }
        catch(err){
            return Responses.failed(err,500,'error while retrieving',res)
        }
    }

    static async create(req,res,next){
        try{
            const office=Office.create({
                address:req.body.address,
                city:req.body.city,
                country:req.body.country
            })
            Responses.success(office,200,'office created',res)
        }
        catch(err){
            return Responses.failed(err,500,'error while creating',res)
        }

    }

    static async edit(req,res,next){
        try{
            const oldOffice=(await Office.find({_id:req.params.id}))[0]
            const office={
                address:req.body.address||oldOffice.address,
                city:req.body.city||oldOffice.city,
                country:req.body.country||oldOffice.country,
            }
            Office.updateOne({_id:req.params.id},office,(err,result)=>{
                if(err)return Responses.failed(err,500,'error while updating',res)
                if(!result.nModified)return Responses.notFound('office',res)
                Responses.success(result,201,'changes saved',res)
            })
        }
        catch(err){
            return Responses.failed(err,500,'error while updating',res)
        }
    }
    
    static async remove(req,res,next){
        Office.deleteOne({_id:req.params.id},(err,result)=>{
            if(err)return Responses.failed(err,500,'error while deleting',res)
            if(!result.deletedCount)return Responses.notFound('office',res)
            Responses.success(result,201,'office deleted',res)
        })
    }
}

module.exports=Controller