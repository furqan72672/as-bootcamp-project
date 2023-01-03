class Responses{

    constructor(){}

    static success(data,status,msg,res){
        res.status(status).send({
            message:msg,
            data
        })
    }
}

module.exports= Responses