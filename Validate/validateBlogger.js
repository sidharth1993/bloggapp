const LOG = require('./../lib/Logger');
const LOGGER = new LOG(__filename);
function validateUser(req,res,next){
    LOGGER.Log('In validateUser');
    if(!req.body){
        res.error = "Server Error";
        LOGGER.ErrLog('In validateUser',res.error);
        next(res.error);
    }
    if(!req.body.bpwd || !req.body.bmail || !req.body.bname || !req.body.bdob){
        res.error = "Form Incomplete";
        LOGGER.ErrLog('In validateUser',res.error);
        next(res.error);
    }
    LOGGER.Log('Leaving validateUser');
    next();
}

function validateLogin(req,res,next){
    LOGGER.Log("In ValidateLogin");
    if(!req.body){
        res.error = "Server Error";
        LOGGER.ErrLog('In validateLogin',res.error);
        next(res.error);
    }
    if(!req.body.bpwd || !req.body.bmail){
        res.error = "Form Incomplete";
        LOGGER.ErrLog('In validateLogin',res.error);
        next(res.error);
    }

    LOGGER.Log("Leaving ValidateLogin");
    next();
}
module.exports = {
    validateUser:validateUser,
    validateLogin:validateLogin
    
}