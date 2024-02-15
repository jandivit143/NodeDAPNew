const express = require('express');
const router = express.Router();

const booksCtrl = require('../controllers/books-controller');

// Get All Books
router.get('/',booksCtrl.getAllBooks);

// Get a book by isbn
router.get('/:isbn',booksCtrl.getBook);

// Get a book by id
router.get('/book/:id',booksCtrl.getBookById);

// Insert a new book
router.post('/',booksCtrl.addBook);

// Update a book
router.put('/:isbn',booksCtrl.updateBook);

// Delete a book
router.delete('/:isbn',booksCtrl.deleteBook);

// Delete a book by id
router.delete('/deletebook/:id',booksCtrl.deleteBookById);

module.exports = router;