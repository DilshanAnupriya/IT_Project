const { reviewAndComplaint } = require("../models/review_n_complains.model");

/**
 * Adds a new complaint to the database
 * @param {Object} req - Express request object containing complaint data
 * @param {Object} res - Express response object to send status and data
 */
const add = async (req, res) => {
    const { name, email, description, date, userid } = req.body;
    const type = 'c';
    const status = 'pending';
    const rating = null; // Complaints do not have ratings
    try {
        const newComplaint = new reviewAndComplaint({
            name, email, description, rating, date, userid, type, status
        });

        const savedComplaint = await newComplaint.save();
        res.status(200).json({ savedComplaint });
    } catch (error) {
        console.error('Error occurred while adding complaint', error);
        res.status(500).json({ message: 'Error adding complaint' });
    }
};

/**
 * Fetches all complaints from the database for a specific user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object to send status and data
 */
const read = async (req, res) => {
    const { id } = req.params; // Get the user ID from URL
    try {
        const complaints = await reviewAndComplaint.find({ userid: id, type: 'c' });
        res.status(200).json({ complaints });
    } catch (error) {
        console.error('Error while fetching complaints', error);
        res.status(500).json({ message: 'Error while fetching complaints' });
    }
};
const get = async (req, res) => {
    try {
        const complaints = await reviewAndComplaint.find({ type: 'c' });
        res.status(200).json({ complaints });
    } catch (error) {
        console.error('Error while fetching complaints', error);
        res.status(500).json({ message: 'Error while fetching complaints' });
    }
};

/**
 * Updates a complaint's description by ID
 * @param {Object} req - Express request object containing the complaint ID and new description
 * @param {Object} res - Express response object to send status and updated complaint
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
        console.error('Error occurred while updating the complaint', error);
        res.status(500).json({ message: 'Error occurred while updating the complaint' });
    }
};

/**
 * Replies to a complaint by adding a response
 * @param {Object} req - Express request object containing complaint ID and response
 * @param {Object} res - Express response object to send status and updated complaints
 */
const replies = async (req, res) => {
    const { id } = req.params;
    const { response } = req.body;
    const status = 'resolved'

    try {
        const reply = await reviewAndComplaint.findByIdAndUpdate(
            id,
            { response,status },
            { new: true }
        );

        res.status(200).json({ reply });
    } catch (error) {
        console.error('Error occurred while replying to the complaint', error);
        res.status(500).json({ message: 'Error occurred while replying to the complaint' });
    }
};

/**
 * Deletes a complaint by ID
 * @param {Object} req - Express request object containing complaint ID
 * @param {Object} res - Express response object to send status and deletion message
 */
const deletes = async (req, res) => {
    const { id } = req.params;
    try {
        const deleting = await reviewAndComplaint.findByIdAndDelete(id);
        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        console.error('Error while deleting the complaint', error);
        res.status(500).json({ message: 'Error while deleting the complaint', error });
    }
};


// Fetch all reviews and complaints
const getAllReviewsAndComplaints = async (req, res) => {
    try {
      const data = await reviewAndComplaint.find();
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching reviews and complaints:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  };

module.exports = { add, read, updates, replies, deletes, get, getAllReviewsAndComplaints };
