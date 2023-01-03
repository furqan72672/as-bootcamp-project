const Responses = require("../../utils/responses")
const User = require("../../models/user.model")

class Controller{
    constructor(){}

    static createOnce(req,res){

    }

    static login(req,res){
        Responses.success({token:'abc'},201,'logged in successfully',res)
    }
}

module.exports= Controller