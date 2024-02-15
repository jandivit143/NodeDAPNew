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

// Database Connectivity
const dbHost = "mongodb://127.0.0.1:27017/fed_books_db"; // here create a database naming 'fed_books_db'
mongoose.connect(dbHost);

// book schema
const bookSchema = mongoose.Schema({
    name: String,
    isbn:{type:String,index:true,unique:true},
    author:String,
    pages:Number
},{
    versionKey:false
});

var Book = mongoose.model('Book', bookSchema);

app.listen(app.get('port'),function(){
    console.log('Server up at http://127.0.0.1:'+app.get('port'));
});

// To allow CORS - Cross Origin Resource Sharing
app.all('*', function(req,res,next){
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
async function getBooks(){
    const books = await Book.find({});
    return books;
}

// Get All Books
app.get('/books', function(req,res){
    getBooks().then(function(result){
        res.json(result);
    })
});

// Get a book by isbn
app.get('/books/:isbn',function(req,res){
    console.log('Fetching details of the book with isbn:- '+req.params.isbn);
    Book.findOne({isbn: req.params.isbn})
    .then((result) => {
        res.json(result);
    });
});

// Get a book by id
app.get('/books/book/:id',function(req,res){
    console.log('Fetching details of the book with id:- '+req.params.id);
    Book.findById({_id: req.params.id})
    .then((result) => {
        res.json(result);
    });
});

// For Thunder Client - POST
// http://localhost:3300/books
// Headers - Content-Type - application/json
// Body - {Book Object}
/**
    {
        "name": "New Book",
        "isbn": "isbn8888",
        "author": "New Author",
        "pages": 456
    }
*/
// Insert a new book
app.post('/books',function(req,res){
    console.log('Adding a new book',req.body.name);
    var book = new Book({
        name: req.body.name,
        isbn: req.body.isbn,
        author: req.body.author,
        pages: req.body.pages
    });
    book.save().then((result) => {
        res.json({
            message: "Successfully added the book",book:result
        });
    });
});

// For Thunder Client - PUT
// http://localhost:3300/books
// Headers - Content-Type - application/json
// Body - {Book Object}
/**
    {
        "name": "New Book",
        "author": "New Author",
        "pages": 456
    }
*/
// Update an existing book
app.put('/books/:isbn', function(req,res){
    Book.findOne({isbn: req.params.isbn})
    .then((resultBook) => {
        console.log(resultBook);
        if(!resultBook){
            res.json({
                message: "Book with ISBN " + req.params.isbn + " not found!"
            })
        }
        resultBook.name = req.body.name;
        resultBook.author = req.body.author;
        resultBook.pages = req.body.pages;
        resultBook.save().then((result) => {
            res.json({
                message: "Successfully updated the book",book:result
            });
        });
    });
});

// For Thunder Client - DELETE
// http://localhost:3300/books
// Delete an existing book
app.delete('/books/:isbn', function(req,res){
    Book.findOneAndRemove({isbn: req.params.isbn})
    .then((result) => {
        console.log(result);
        if(!result){
            res.json({
                message: "Book with ISBN " + req.params.isbn + " not found!"
            })
        }
        res.json({
            message: "Successfully deleted the book",book:result
        });
    }).catch((err) => {
        console.error(err);
    });
});