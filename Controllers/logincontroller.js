const jwt = require('jsonwebtoken');
const LOG = require('./../lib/Logger');
const LOGGER = new LOG(__filename);

const login = (req,res,next) => {
    LOGGER.Log('In login token');
    res.token = jwt.sign({
            bmail: req.body.bmail
        }, 'gss', {
            expiresIn: '24h'
    });
    LOGGER.Log('In login token','Token generated',res.token);
    next();
}

const verify = (req, res, next) => {
    if (req.headers && req.headers.authorization) {
        jwt.verify(req.headers.authorization, 'gss', (err, decoded) => {
            if (err) {
                throw new Error('Invalid token');
            }
            if (decoded) {
                next();
            }else{
                throw new Error('Invalid token'); 
            }
        });
    }
}


module.exports = {
    login: login,
    verify: verify
}