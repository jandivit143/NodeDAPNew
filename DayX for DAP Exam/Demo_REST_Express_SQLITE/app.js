// const db = require('./database');
/**
 * If you are practicing in personal laptop or desktop, before going through the code, first create one db
 * naming 'DAP_BOOKSDB' and a collection naming 'books' and insert some documents.
 * Install Extension for VSCode - Thunder Client
 */
const express = require('express');

// body-parser is used to parse the request body and populate the req object.
const bodyParser = require('body-parser');

// Create an express app
const app = express();

app.set('port', 3300);
app.use(bodyParser.json());

const usersRouter = require('./routes/users');
app.use("/api/users", usersRouter);

// // To allow CORS - Cross Origin Resouce Sharing
// app.all('*', function(req, res, next){
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });

app.listen(app.get('port'), function(){
    console.log('Server up at http://127.0.01:'+app.get('port'));
});

module.exports = app;
