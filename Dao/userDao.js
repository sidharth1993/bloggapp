const LOG = require('./../lib/Logger');
const LOGGER = new LOG(__filename);
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://blogguser:bloggpwd@cluster0-ec6hi.mongodb.net/test?retryWrites=true&w=majority";
const dbname = "bloggapp";
//const url = `mongodb://localhost:27017/${dbname}`;
const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

function getClient(req,res,next) {
    LOGGER.Log('In getClient');
    if (!client.isConnected()) {
        LOGGER.Log('In getClient','Connecting to DB');
        try {
            client.connect(err => {
                if (err) {
                    res.error="Error in connecting to DB";
                    LOGGER.ErrLog('ERROR','In getClient',res.error,err.stack);
                }
                LOGGER.Log('Connected to DB');
                next();
            });
        } catch (e) {
            LOGGER.ErrLog('ERROR','In getClient',err.stack);
        }
    }else{
        LOGGER.Log('In getClient','DB connection alive');
        next();
    }
    LOGGER.Log('Leaving getClient');
}

function checkUserExist(req, res, next) {
    LOGGER.Log('In checkUserExist');
    let login = req.url.indexOf('login')>=0 ? true : false;
    const blogger = client.db(dbname).collection("blogger");
    try {
        blogger.find({
            bmail: req.body.bmail
        }).toArray((err,user) => {
            LOGGER.Log('In checkUserExist','User present',user.length);
            if (user.length > 0) {
                if(!login){
                    res.error = "User already exists";
                    LOGGER.Log('ERROR','In checkUserExist',res.error);
                    next(res.error);
                    //closeClient(req, res, next);
                }else{
                    res._id = user[0]._id;
                    LOGGER.Log('In checkUserExist',user[0].bmail,user[0]._id);
                    next();
                }

            } else {
                LOGGER.Log('In checkUserExist','User not present');
                if(!login){
                    next();
                }else{
                    res.error = "User does not exist";
                    next(res.error);
                }
                
            }
        });
    } catch (error) {
        LOGGER.ErrLog('ERROR','In checkUserExist',error.stack);
    }

    LOGGER.Log('Leaving checkUserExist');
}

function addUser(req, res, next) {
    LOGGER.Log('In addUser');
    const blogger = client.db(dbname).collection("blogger");
    blogger.insertOne({
        bname: req.body.bname,
        bmail: req.body.bmail,
        bdob: req.body.bdob
    }).then(response => {
        if (response && response.insertedId) {
            res.insertedId = response.insertedId;
            next();
        } else {
            res.error = "Error in Database Operation";
            LOGGER.ErrLog('ERROR','In addUser',res.error);
            next(res.error);
            //closeClient(req, res, next);
        }
    });
}

function addAuth(req, res, next) {
    LOGGER.Log('In addAuth');
    const auth = client.db(dbname).collection("auth");
    auth.insertOne({
        bno: res.insertedId,
        bpwd: res.hash
    }).then(inResponse => {
        if(inResponse.insertedId){
            next();
        }else{
            res.error = "Error in Database Operation";
            next(res.error);
            //closeClient(req, res, next);
        }
    });
}

function getAuth(req,res,next){
    LOGGER.Log('In getAuth');
    const auth = client.db(dbname).collection('auth');
    auth.findOne({bno:res._id},{_id:0,bpwd:1},(err,one)=>{
        if(err){
            res.error = 'Unable to retrieve user';
            LOGGER.ErrLog('In getAuth',res.error);
            next(res.error);
        }
        if(!one){
            res.error = 'Unable to retrieve user';
            LOGGER.ErrLog('In getAuth',res.error);
            next(res.error);
        }
        LOGGER.Log('In getAuth','User found',one);
        res.bpwd = one.bpwd;
        next();
    });
}

function closeClient(req,res,next){
    LOGGER.Log('In closeClient');
    if(client.isConnected()){
        client.close().then(()=>{
            LOGGER.Log('DB connection closed');
        });
    }
    next();
}

module.exports = {
    getClient: getClient,
    checkUserExist: checkUserExist,
    addUser: addUser,
    addAuth: addAuth,
    getAuth: getAuth,
    closeClient: closeClient
}