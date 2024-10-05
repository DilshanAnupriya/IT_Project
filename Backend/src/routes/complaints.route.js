const express = require('express');
const router = express.Router();

const { add, read, updates, replies, deletes, get, getAllReviewsAndComplaints  } = require('../controllers/complaint.controller.js');

router.get('/review-and-complaint', getAllReviewsAndComplaints);

/**
 * @route POST /api/complaint/add
 * @desc Add a new complaint
 * @access Public
 */
router.post('/add', add);

/**
 * @route GET /api/complaint/read/:id
 * @desc Fetch all complaints for a specific user
 * @access Public
 */
router.get('/read/:id', read);
router.get('/get', get);

/**
 * @route PUT /api/complaint/update/:id
 * @desc Update a complaint by ID
 * @access Public
 */
router.put('/update/:id', updates);

/**
 * @route PUT /api/complaint/replies/:id
 * @desc Reply to a complaint by adding a response
 * @access Public
 */
router.put('/replies/:id', replies);

/**
 * @route DELETE /api/complaint/deletes/:id
 * @desc Delete a complaint by ID
 * @access Public
 */
router.delete('/deletes/:id', deletes);

module.exports = router;
