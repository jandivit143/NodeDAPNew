const express = require('express');
const router = express.Router();
const usersCtrl = require('./../controllers/users-controller');

// Get All Users
router.get('/', usersCtrl.getAllUsers);

// Get a user by id
router.get('/:id', usersCtrl.getUserById);

// Create a new user
router.post('/', usersCtrl.addAUser);

// Update an existing user
router.put('/:id', usersCtrl.updateAUser);

// Delete a user by id
router.delete('/:id', usersCtrl.deleteAUser);

module.exports = router;