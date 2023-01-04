class Responses{

    constructor(){}

    static success(data,status,msg,res){
        res.status(status).send({
            message:msg,
            data
        })
    }

    static failed(err,status,msg,res){
        res.status(status).send({
            message:msg,
            err
        })
    }
}

module.exports= Responses