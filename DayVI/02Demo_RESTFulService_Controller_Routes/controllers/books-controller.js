const mongoose = require('mongoose');

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

async function getBooks(){
    const books = await Book.find({});
    return books;
}

exports.getAllBooks = (req,res) => {
    getBooks().then(function(result){
        res.json(result);
    });
};

// Get a book by isbn
exports.getBook = (req,res) => {
    console.log('Fetching details of the book with isbn:- '+req.params.isbn);
    Book.findOne({isbn: req.params.isbn})
    .then((result) => {
        res.json(result);
    });
};

// Get a book by id
exports.getBookById = (req,res) => {
    console.log('Fetching details of the book with id:- '+req.params.id);
    Book.findById({_id: req.params.id})
    .then((result) => {
        res.json(result);
    });
};

// Insert a new book
exports.addBook = (req,res) => {
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
}

// Update an existing book
exports.updateBook = (req,res) => {
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
};

// Delete an existing book
exports.deleteBook = (req,res) => {
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
}

// Delete an existing book by id
exports.deleteBookById = (req,res) => {
    Book.findByIdAndRemove({_id: req.params.id})
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
}