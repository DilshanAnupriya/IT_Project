const express = require('express');
const router = express.Router();
const User =  require("../../Controllers/user/userControllers");

router.get('/all', User.getAllUsers);
router.post('/add', User.addUser);
router.get('/:id', User.getById);
router.patch('/:id', User.updateUser);
router.delete('/:id', User.deleteUser);

module.exports = router;