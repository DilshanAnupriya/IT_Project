const express = require('express');
const { signup, login, getAllUsers, updateUser, deleteUser } = require('../../Controllers/ElderCare/authController')
const router = express.Router();

// Signup Route
router.post('/signup', signup);

// Login Route
router.post('/login', login);

router.get('/', getAllUsers);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
