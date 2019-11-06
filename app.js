const express = require('express');
const app = express();
const logger = require('morgan');
const pug = require('pug');
const bodyParser = require('body-parser');
const env = require('dotenv');
env.config();
const userRoute = require('./Routes/blogUser');
const LOG = require('./lib/Logger');
const LOGGER = new LOG(__filename);

app.set('view engine','pug');
app.use(logger('dev'));
app.use(bodyParser.json());

/*
*
* Registration & Login
*
*/
app.use(userRoute);

/*
*
* Generic errors and Internal Server Exceptions
* Currently sends error messages
*
*/
app.use((err,req,res,next)=>{
    LOGGER.ErrLog('Errors',err.stack);
    res.json({error:res.error});
});

/*
*
* URL not found
* Currently sends 404.pug template
*/
app.get('*',(req,res)=>{
    res.render('404');
})

app.listen(process.env.PORT || 3000,()=>{
    LOGGER.ErrLog(`Server running at ${process.env.PORT || 3000}`);
});

