const { get } = require('mongoose');
const Salary = require("../../Model/Account/salaryModels");

// Fetch all salary details
const getDetails = async (req, res, next) => {
    let sal;
  
    try {
        sal = await Salary.find();
    } catch (error) {
        console.log(error);
    }

    if (!sal) {
        return res.status(404).json({ message: "unable to display" });
    }
    return res.status(200).json({ sal });
};

// Create a new salary entry
const Createsal = async (req, res, next) => {
    const { amount, status, year, month, cost, occupation } = req.body; // Include occupation

    let sal;

    try {
        sal = new Salary({ amount, status, year, month, cost, occupation }); // Add occupation field
        await sal.save();
    } catch (error) {
        console.log(error);
    }

    if (!sal) {
        return res.status(404).json({ message: "unable to create" });
    }

    return res.status(200).json({ sal });
};

// Get salary details by ID
const getById = async (req, res, next) => {
    let id = req.params.id;
    let sal;

    try {
        sal = await Salary.findById(id);
    } catch (error) {
        console.log(error);
    }

    if (!sal) {
        return res.status(404).json({ message: "unable to find" });
    }

    return res.status(200).json({ sal });
};

// Update salary details
const UpdateDetails = async (req, res, next) => {
    let id = req.params.id;
    const { amount, status, year, month, cost, occupation } = req.body; // Include occupation

    let sal;
    try {
        sal = await Salary.findByIdAndUpdate(id, { 
            amount, 
            status, 
            year, 
            month, 
            cost, 
            occupation  // Update occupation field
        });
        await sal.save();
    } catch (error) {
        console.log(error);
    }

    if (!sal) {
        return res.status(404).json({ message: "unable to update" });
    }

    return res.status(200).json({ sal });
};

// Delete salary entry by ID
const DeleteDetails = async (req, res, next) => {
    let id = req.params.id;
    let sal;

    try {
        sal = await Salary.findByIdAndDelete(id);
    } catch (error) {
        console.log(error);
    }

    if (!sal) {
        return res.status(404).json({ message: "unable to delete" });
    }

    return res.status(200).json({ sal });
};

exports.getDetails = getDetails;
exports.Createsal = Createsal;
exports.getById = getById;
exports.UpdateDetails = UpdateDetails;
exports.DeleteDetails = DeleteDetails;
