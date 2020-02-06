const express = require('express');
const routes = express.Router();
const token = require('./../Controllers/logincontroller');
const dao = require('./../Dao/userDao');
const validate = require('./../Validate/validateBlogger');
const locker = require('./../Controllers/safe');
const LOG = require('./../lib/Logger');
const LOGGER = new LOG(__filename);

//token.verify
//dao.closeClient
routes.post('/barterer/user/register',validate.validateUser,dao.getClient,dao.checkUserExist,dao.addUser,locker.encrypt,dao.addAuth,(req,res)=>{
    LOGGER.Log(`In : ${req.url}`);
    if(res.error){
        throw new Error(`Error in creating user : ${res.error}`);
    }
        res.json({message:'SUCCESS'});
});

routes.post('/barterer/user/login',validate.validateLogin,dao.getClient,dao.checkUserExist,dao.getAuth,locker.authorize,token.login,(req,res)=>{
   LOGGER.Log(`In : ${req.url}`);
   if(res.error){
       throw new Error(`Error is logging in : ${res.error}`);
   }
    res.set('authorization',res.token);
    res.json({message:'SUCCESS'});
});

module.exports = routes;