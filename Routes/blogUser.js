const express = require('express');
const routes = express.Router();
const token = require('./../Controllers/logincontroller');

routes.post('/blog/user/register',token.verify,(req,res)=>{
    if(!req.body){
        throw new Error("Server Error");
    }
    if(!req.body.bpwd || !req.body.bmail || !req.body.bname || !req.body.bdob){
        throw new Error("Form Incomplete");
    } 
    res.json({status:200,message:'SUCCESS',decoded:decoded});
    
});

routes.post('/blog/user/login',(req,res)=>{
    if(!req.body){
        throw new Error("Server Error");
    }
    if(!req.body.bpwd || !req.body.bmail){
        throw new Error("Form Incomplete");
    }
    let uid = token.login(req.body.bmail,req.body.bpwd);
    if(!uid){
        throw new Error("Token Not Generated");
    }
    res.json({status:200,token:uid});
});

module.exports = routes;