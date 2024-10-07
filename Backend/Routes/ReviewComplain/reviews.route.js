const express = require('express');
const router = express.Router();

const { add, read, updates, replies, deletes, get } = require('../../Controllers/ReviewComplain/review.controller.js');

router.post('/add', add);
router.get('/read/:id', read);
router.get('/get', get);
router.put('/update/:id', updates);
router.put('/replies/:id', replies);
router.delete('/deletes/:id', deletes);

module.exports = router;
