const express = require('express');
const router = express.Router();

const { add, read, updates, replies, deletes, get } = require('../controllers/review.controller.js');

/**
 * @route POST /api/review/add
 * @desc Add a new review
 * @access Public
 */
router.post('/add', add);

/**
 * @route GET /api/review/read
 * @desc Fetch all reviews
 * @access Public
 */
router.get('/read/:id', read);
router.get('/get', get);

/**
 * @route PUT /api/review/update/:id
 * @desc Update a review by ID
 * @access Public
 */
router.put('/update/:id', updates);

/**
 * @route PUT /api/review/replies/:id
 * @desc Reply to a review by adding a response
 * @access Public
 */
router.put('/replies/:id', replies);

/**
 * @route DELETE /api/review/deletes/:id
 * @desc Delete a review by ID
 * @access Public
 */
router.delete('/deletes/:id', deletes);

module.exports = router;
