const express = require('express');
const router = express.Router();

const { add, read, updates, replies, deletes, get, getAllReviewsAndComplaints  } = require('../../Controllers/ReviewComplain/complain.controller.js');

router.get('/review-and-complaint', getAllReviewsAndComplaints);
router.post('/add', add);
router.get('/read/:id', read);
router.get('/get', get);
router.put('/update/:id', updates);
router.put('/replies/:id', replies);
router.delete('/deletes/:id', deletes);

module.exports = router;
