const User = require('../../Model/user/userModels');

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve users", error: error.message });
  }
}

// Add a new user
const addUser = async (req, res) => {
  const newUser = new User({
    fullName: req.body.fullName,
    dob: req.body.dob,
    gmail: req.body.gmail,
    phoneNo: req.body.phoneNo,
    gender: req.body.gender,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });

  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(409).json({ message: "Failed to create user", error: error.message });
  }
}

// Get user by ID
const getById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user", error: error.message });
  }
}

// Update user by ID
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
}

// Delete user by ID
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
}

module.exports = {
  getAllUsers,
  addUser,
  getById,
  updateUser,
  deleteUser
};