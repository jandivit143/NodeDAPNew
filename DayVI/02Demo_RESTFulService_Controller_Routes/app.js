const express = require('express');

// body-parser is used to parse the request body and populate the
// req object.
const bodyParser = require('body-parser');

// ODM - Object Data Mapping
// mongoose
const mongoose = require('mongoose');

// create an express app
const app = express();

app.set('port',3300);
app.use(bodyParser.json());

const booksRouter = require('./routes/books');
app.use('/books',booksRouter);

// Database Connectivity
const dbHost = "mongodb://127.0.0.1:27017/fed_books_db"; // here create a database naming 'fed_books_db'
mongoose.connect(dbHost);


// To allow CORS - Cross Origin Resource Sharing
app.all('*', function(req,res,next){
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.listen(app.get('port'),function(){
    console.log('Server up at http://127.0.0.1:'+app.get('port'));
});

module.exports = app;