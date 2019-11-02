const express = require('express');
const app = express();
const logger = require('morgan');
const pug = require('pug');
const bodyParser = require('body-parser');
const env = require('dotenv');
env.config();
const userRoute = require('./Routes/blogUser');

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
* Currently sends error.pug template
*
*/
app.use((err,req,res,next)=>{
    res.render('error',{'error':err.stack});
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
    console.log(`listening to ${process.env.PORT || 3000}`);
});

