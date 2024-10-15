const { get } = require('mongoose');
const Salary = require("../../Model/Account/salaryModels");


const getDetails = async (req, res, next) => {
    let sal;
  
    try {
        sal = await Salary.find();
    } catch (error) {
        console.log(error);
    }

    if (!sal) {
        return res.status(404).json({ massage: "unable to display" });
    }
    return res.status(200).json({ sal });
};



const Createsal = async (req, res, next) => {
    const { amount, status, year, month, cost} = req.body

    let sal;

    try {
        sal = new Salary({ amount, status, year, month,cost });
        await sal.save()
    } catch (error) {
        console.log(error);
    }

    if (!sal) {
        return res.status(404).json({ massage: "unable to create" });
    }

    return res.status(200).json({ sal });
};





const getById = async (req, res, next) => {
    let id = req.params.id;
    let sal;

    try {
        sal = await Salary.findById(id);
    } catch (error) {
        console.log(error);
    }

    if (!sal) {
        return res.status(404).json({ massage: "unable to find" });
    }

    return res.status(200).json({ sal });
};



const UpdateDetails = async (req, res, next) => {
    let id = req.params.id;
    let sal;
    const { amount, status, year, month,cost } = req.body

    try {
        sal = await Salary.findByIdAndUpdate(id, { amount: amount, status: status, year: year, month: month,cost:cost });
        await sal.save();
    } catch (error) {
        console.log(error);
    }
    if (!sal) {
        return res.status(404).json({ massage: "unable to update" });
    }

    return res.status(200).json({ sal });

};



const DeleteDetails = async (req, res, next) => {
    let id = req.params.id;
    let sal;

    try {
        sal = await Salary.findByIdAndDelete(id);
    } catch (error) {
        console.log(error);
    }
    if (!sal) {
        return res.status(404).json({ massage: "unable to delete" });
    }

    return res.status(200).json({ sal });

};

exports.getDetails = getDetails
exports.Createsal = Createsal
exports.getById = getById
exports.UpdateDetails = UpdateDetails
exports.DeleteDetails = DeleteDetails