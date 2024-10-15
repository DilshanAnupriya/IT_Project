const Funds = require("../../Model/Account/fundModels");

const getDetails = async (req, res, next) => {
    let fund;

    try {
        fund = await Funds.find();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" }); // Handle server error
    }

    if (!fund.length) { // Check if fund is an empty array
        return res.status(404).json({ message: "No funds found" });
    }
    return res.status(200).json({ fund });
};

const CreateFund = async (req, res, next) => {
    console.log("Request Body:", req.body); // Log the request body

    const { fund_name, fund_amount, fund_date, description } = req.body;

    let fund;

    try {
        fund = new Funds({ fund_name, fund_amount, fund_date, description });
        await fund.save();
    } catch (error) {
        console.error("Error creating fund:", error);
        return res.status(500).json({ message: "Error creating fund", error: error.message });
    }

    if (!fund) {
        return res.status(404).json({ message: "Unable to create fund" });
    }

    return res.status(201).json({ fund });
};

const getById = async (req, res, next) => {
    let id = req.params.id;
    let fund;

    try {
        fund = await Funds.findById(id);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" }); // Handle server error
    }

    if (!fund) {
        return res.status(404).json({ message: "Fund not found" });
    }

    return res.status(200).json({ fund });
};

const UpdateDetails = async (req, res, next) => {
    let id = req.params.id;
    const { fund_name, fund_amount, fund_date, description } = req.body;

    let fund;

    try {
        fund = await Funds.findByIdAndUpdate(id, { fund_name, fund_amount, fund_date, description }, { new: true }); // Added { new: true }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" }); // Handle server error
    }

    if (!fund) {
        return res.status(404).json({ message: "Unable to update" });
    }

    return res.status(200).json({ fund });
};

const DeleteDetails = async (req, res, next) => {
    let id = req.params.id;
    let fund;

    try {
        fund = await Funds.findByIdAndDelete(id);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" }); // Handle server error
    }

    if (!fund) {
        return res.status(404).json({ message: "Unable to delete" });
    }

    return res.status(200).json({ fund });
};

exports.getDetails = getDetails;
exports.CreateFund = CreateFund;
exports.getById = getById;
exports.UpdateDetails = UpdateDetails;
exports.DeleteDetails = DeleteDetails;
