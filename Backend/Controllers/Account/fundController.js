const { get } = require('mongoose');
const Funds = require("../../Model/Account/fundModels");



const getDetails = async (req, res, next) => {
    let fund;
  
    try {
        fund = await Funds.find();
    } catch (error) {
        console.log(error);
    }

    if (!fund) {
        return res.status(404).json({ massage: "unable to display" });
    }
    return res.status(200).json({ fund });
};



const CreateFund = async (req, res, next) => {
    const { funds, a_amout, balance, count } = req.body

    let fund;

    try {
        fund = new Funds({ funds, a_amout, balance, count });
        await fund.save()
    } catch (error) {
        console.log(error);
    }

    if (!fund) {
        return res.status(404).json({ massage: "unable to create" });
    }

    return res.status(200).json({ fund });
};





const getById = async (req, res, next) => {
    let id = req.params.id;
    let fund;

    try {
        fund = await Funds.findById(id);
    } catch (error) {
        console.log(error);
    }

    if (!fund) {
        return res.status(404).json({ massage: "unable to find" });
    }

    return res.status(200).json({ fund });
};



const UpdateDetails = async (req, res, next) => {
    let id = req.params.id;
    let fund;
    const { funds, a_amout, balance, count } = req.body

    try {
        fund = await Funds.findByIdAndUpdate(id, { funds: funds, a_amout: a_amout, balance: balance, count: count });
        await fund.save();
    } catch (error) {
        console.log(error);
    }
    if (!fund) {
        return res.status(404).json({ massage: "unable to update" });
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
    }
    if (!fund) {
        return res.status(404).json({ massage: "unable to delete" });
    }

    return res.status(200).json({ fund });

};

exports.getDetails = getDetails
exports.CreateFund = CreateFund
exports.getById = getById
exports.UpdateDetails = UpdateDetails
exports.DeleteDetails = DeleteDetails