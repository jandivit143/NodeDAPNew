const express = require('express');
const app = express();

// custom middleware
const myLogger = function(req,res,next){
    console.log('LOGGED at', new Date().toLocaleTimeString());
    next(); // call to the next middleware function!
}

// custom middleware
const myRequestTime = function(req,res,next){
    req.rqstTm = new Date().toLocaleTimeString();
    next(); // call to the next middleware function!
}

// use the middleware along with express app
app.use(myLogger, myRequestTime);

app.get('/',function(req,res){
    var responseText = "Hello World!<br/>";
    responseText += '<b>Requested at ' + req.rqstTm + ' </b>';
    res.send(responseText);
});

const server = app.listen(9876, function(){
    console.log('Express app listening at: ', server.address().port);
});