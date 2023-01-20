class Responses{

    constructor(){}

    static success(data,status,message,res){
        res.status(status).send({
            message,
            data
        })
    }

    static failed(error,status,msg,res){
        res.status(status).send({
            message:msg,
            error
        })
    }

    static failedAuth(res){
        res.status(403).send({
            message:'unauthoraized',
            error:'access forbidden'
        })
    }

    static notFound(key,res){
        res.status(404).send({
            message:`unable to find ${key}`,
            error:'not found'
        })
    }
}

module.exports= Responses