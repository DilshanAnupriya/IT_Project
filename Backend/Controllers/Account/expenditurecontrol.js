const { get } = require('mongoose');
const Expenditure = require("../../Model/Account/expenditureModel");

// Fetch all expenditure details
const getExpenditureDetails = async (req, res, next) => {
    let expenditures;

    try {
        expenditures = await Expenditure.find();
        if (!expenditures) {
            return res.status(404).json({ message: "Unable to display expenditures" });
        }
        return res.status(200).json({ expenditures });
    } catch (error) {
        console.error("Error fetching expenditures:", error);
        return res.status(500).json({ message: "Server error while fetching expenditures" });
    }
};

// Create a new expenditure entry
const createExpenditure = async (req, res, next) => {
    const { expenditure_type, amount, status } = req.body;

    let expenditure;

    try {
        expenditure = new Expenditure({ expenditure_type, amount, status });
        await expenditure.save();
        return res.status(201).json({ newExpenditure: expenditure });
    } catch (error) {
        console.error("Error creating expenditure:", error);
        return res.status(500).json({ message: "Unable to create expenditure" });
    }
};

// Get expenditure details by ID
const getExpenditureById = async (req, res, next) => {
    let id = req.params.id;
    let expenditure;

    try {
        expenditure = await Expenditure.findById(id);
        if (!expenditure) {
            return res.status(404).json({ message: "Unable to find expenditure" });
        }
        return res.status(200).json({ expenditure });
    } catch (error) {
        console.error("Error fetching expenditure by ID:", error);
        return res.status(500).json({ message: "Server error while fetching expenditure" });
    }
};

// Update expenditure details
const updateExpenditureDetails = async (req, res, next) => {
    let id = req.params.id;
    const { expenditure_type, amount, status } = req.body;

    try {
        const expenditure = await Expenditure.findByIdAndUpdate(id, { 
            expenditure_type, 
            amount, 
            status 
        }, { new: true, runValidators: true }); // Ensure to return the updated document and validate

        if (!expenditure) {
            return res.status(404).json({ message: "Unable to update expenditure" });
        }

        return res.status(200).json({ expenditure });
    } catch (error) {
        console.error("Error updating expenditure:", error);
        return res.status(500).json({ message: "Unable to update expenditure" });
    }
};

// Delete expenditure entry by ID
const deleteExpenditureDetails = async (req, res, next) => {
    let id = req.params.id;

    try {
        const expenditure = await Expenditure.findByIdAndDelete(id);
        if (!expenditure) {
            return res.status(404).json({ message: "Unable to delete expenditure" });
        }
        return res.status(200).json({ message: "Expenditure deleted successfully", expenditure });
    } catch (error) {
        console.error("Error deleting expenditure:", error);
        return res.status(500).json({ message: "Unable to delete expenditure" });
    }
};

exports.getExpenditureDetails = getExpenditureDetails;
exports.createExpenditure = createExpenditure;
exports.getExpenditureById = getExpenditureById;
exports.updateExpenditureDetails = updateExpenditureDetails;
exports.deleteExpenditureDetails = deleteExpenditureDetails;
