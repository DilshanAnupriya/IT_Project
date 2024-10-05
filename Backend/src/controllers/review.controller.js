const { reviewAndComplaint } = require("../models/review_n_complains.model");

/**
 * Adds a new review to the database
 * @param {Object} req - Express request object containing review data
 * @param {Object} res - Express response object to send status and data
 */
const add = async (req, res) => {
    const { name, email, description, rating, date, userid } = req.body;
    const type = 'r';
    const status = 'pending';
    try {
        const newReview = new reviewAndComplaint({
            name, email, description, rating, date, userid, type, status
        });

        const savedReview = await newReview.save();
        res.status(200).json({ savedReview });
    } catch (error) {
        console.error('Error occurred while adding review', error);
        res.status(500).json({ message: 'Error adding Review' });
    }
};

/**
 * Fetches all reviews from the database
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object to send status and data
 */
const read = async (req, res) => {
    const {id} = req.params
    try {
        const reviews = await reviewAndComplaint.find({userid: id, type: 'r'});
        res.status(200).json({ reviews });
    } catch (error) {
        console.error('Error while fetching reviews ', error);
        res.status(500).json({ message: 'Error while fetching reviews' });
    }
};
const get = async (req, res) => {
    try {
        const reviews = await reviewAndComplaint.find({ type: 'r'});
        res.status(200).json({ reviews });
    } catch (error) {
        console.error('Error while fetching reviews ', error);
        res.status(500).json({ message: 'Error while fetching reviews' });
    }
};

/**
 * Updates a review's description by ID
 * @param {Object} req - Express request object containing the review ID and new description
 * @param {Object} res - Express response object to send status and updated review
 */
const updates = async (req, res) => {
    const { id } = req.params;
    const { description } = req.body;

    try {
        const update = await reviewAndComplaint.findByIdAndUpdate(
            id,
            { description },
            { new: true }
        );

        res.status(200).json({ update });
    } catch (error) {
        console.error('Error occurred while updating the review', error);
        res.status(500).json({ message: 'Error occurred while updating the review' });
    }
};

/**
 * Replies to a review by adding a response
 * @param {Object} req - Express request object containing review ID and response
 * @param {Object} res - Express response object to send status and updated review
 */
const replies = async (req, res) => {
    const { id } = req.params;
    const { response } = req.body;
    const status = 'resolved'

    try {
        const reply = await reviewAndComplaint.findByIdAndUpdate(
            id,
            { response, status },
            { new: true }
        );

        res.status(200).json({ reply });
    } catch (error) {
        console.error('Error occurred while replying to the review', error);
        res.status(500).json({ message: 'Error occurred while replying to the review' });
    }
};

/**
 * Deletes a review by ID
 * @param {Object} req - Express request object containing review ID
 * @param {Object} res - Express response object to send status and deletion message
 */
const deletes = async (req, res) => {
    const { id } = req.params;
    try {
        const deleting = await reviewAndComplaint.findByIdAndDelete(id);
        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        console.error('Error while deleting the review ', error);
        res.status(500).json({ message: 'Error while deleting the review', error });
    }
};

module.exports = { add, read, updates, replies, deletes, get };
