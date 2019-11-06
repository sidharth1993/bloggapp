const bcrypt = require('bcrypt');
const salt = 10;
const LOG = require('./../lib/Logger');
const LOGGER = new LOG(__filename);

function encrypt(req,res,next){
    LOGGER.Log('Inside encrypt','safe');
    bcrypt.hash(req.body.bpwd,salt,(err,hash)=>{
        if(err){
            res.error = "Error in hashing";
            next(res.error);
        }
        res.hash = hash;
        next();
    });
}

function authorize(req,res,next){
    LOGGER.Log('Inside authorize','safe');
    bcrypt.compare(req.body.bpwd,res.bpwd,(err,result)=>{
        LOGGER.Log('Inside authorize','authorize ',result);
       if(!result){
            res.error = "Incorrect Password";
            next(res.error);
       }else{
            next();
       }
       
    });
}

module.exports = {
    encrypt:encrypt,
    authorize:authorize
}