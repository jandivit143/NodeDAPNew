const express = require('express');

// connect
require('../db/db');

// model
const Book = require('./book');

const app = express();
const port = 3000;
app.use(express.json());

app.get('/book',(req,res) => {
    Book.find().then((books) => {
        if(books.length !== 0){
            res.json(books);
        }else{
            res.status(404).send('Books not found!');
        }
    }).catch((err) => {
        res.status(500).send('Internal Server Error ' + err);
    })
});

app.get('/book/:id',(req,res) => {
    Book.findById(req.params.id).then((book) => {
        if(book){
            res.json(book);
        }else{
            res.status(404).send('Book not found!');
        }
    }).catch((err) => {
        res.status(500).send('Internal Server Error ' + err);
    });
});

app.post('/book',(req,res)=> {
    console.log('using spread operator',req.body);
    console.log('not using spread operator',{...req.body});
    const newBook = new Book({...req.body});
    newBook.save().then(() => {
        res.send('New book added successfully!')
    }).catch((err) => {
        res.status(500).send('Internal Server Error ' + err);
    });
});

app.put('/book/:id',(req,res) => {
    Book.updateOne({_id: req.params.id},{$set:{title:req.body.title, author:req.body.author,
        numberPages:req.body.numberPages, publisher:req.body.publisher}}).then((book)=>{
            if(book){
                res.send({
                    message:'Book updated successfully!',
                    bookUpdated:book
                })
            }else{
                res.send('Book not found!')
            }
        }).catch((err) => {
            res.status(500).send('Internal Server Error ' + err);
        });
});

app.delete('/book/:id',(req,res) => {
    Book.findByIdAndDelete(req.params.id).then((book) => {
        if(book){
            res.json('Book deleted successfully!');
        }else{
            res.status(404).send('Book not found!');
        }
    }).catch((err) => {
        res.status(500).send('Internal Server Error ' + err);
    });
})

app.listen(port, () => {
    console.log(`Server up and running at port ${port} - Book Service!`);
})