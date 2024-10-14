const Parent = require('../../Model/ElderCare/Parent');

// Submit the form (Create a new parent record)
const submitForm = async (req, res) => {
  const { fullname, address, birthday, age, gender, service, ownername, contact } = req.body;
  try {
    const parent = new Parent(
      req.body
    );
    const savedUser = await parent.save();
    console.log(savedUser)
    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error submitting form' });
  }
};

// Fetch all parent records for a specific user (Add this function)
const getUserParentsById = async (req, res) => {
  const userId = req.params._id; // Assuming you have user authentication middleware
  try {
    const parents = await Parent.find({ ownerId: userId }); // Filter by user
    res.status(200).json(parents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching parent records' });
  }
};

// Fetch all parent records
const getAllParents = async (req, res) => {
  try {
    const parents = await Parent.find();
    res.status(200).json(parents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching parent records' });
  }
};

// Update parent record
const updateParent = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const parent = await Parent.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res.status(200).json(parent);
  } catch (error) {
    res.status(500).json({ error: 'Error updating parent record' });
  }
};

// Delete a parent record
const deleteParent = async (req, res) => {
  const { id } = req.params;
  try {
    await Parent.findByIdAndDelete(id);
    res.status(200).json({ message: 'Parent record deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting parent record' });
  }
};

module.exports = {
  submitForm,
  getAllParents,
  updateParent,
  deleteParent,
  getUserParentsById,
};
