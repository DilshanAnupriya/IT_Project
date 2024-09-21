const User = require('../../Model/user/userModels');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

const addUser = async (req, res) => {
    const newUser = new User({
        fullName: req.body.fullName,
        dob: req.body.dob,
        gmail: req.body.gmail,
        phoneNo: req.body.phoneNo,
        gender: req.body.gender,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
});
try {
    const user = await newUser.save();
    res.status(201).json(user);
}
catch (error) {
    res.status(409).json({ message: error.message });
}
}

const getById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: "User not found" });
  }
}

const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(user);

   }
    
    catch (error) {
        res.status(404).json({ message: "User not found" });
    }
}

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

module.exports = { 
   getAllUsers, 
   addUser,
   getById, 
   updateUser, 
   deleteUser 
  };
