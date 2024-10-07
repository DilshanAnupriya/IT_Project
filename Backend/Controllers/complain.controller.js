const { reviewAndComplaint } = require("../Model/review_complains.model.js");

const add = async (req, res) => {
    const { name, email, description, date, userid } = req.body;
    const type = 'c';
    const status = 'pending';
    const rating = null;
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

const read = async (req, res) => {
    const { id } = req.params;
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
        console.error('Error occurred while replying to the complaint', error);
        res.status(500).json({ message: 'Error occurred while replying to the complaint' });
    }
};

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
