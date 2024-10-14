const Lunch = require("../../Model/MedicalOfficer/LNutritionModel");

//data display
const getAllLunch = async (req, res, next) => {
    let lunc;
    try {
        lunc = await Lunch.find();
    } catch (err) {
        console.log(err);
    }
    if (!lunc) {
        return res.status(404).json({ message: "Item not found" });
    }
    return res.status(200).json({ lunc });
}

//data insert
const addLunch = async (req, res, next) => {
    const { LNutrition_title, LNutrition_description } = req.body;
    let lunc;
    try {
        lunc = new Lunch({ LNutrition_title, LNutrition_description });
        await lunc.save();
    } catch (err) {
        console.log(err);
    }
    if (!lunc) {
        return res.status(404).json({ message: "Unable to add" });
    }
    return res.status(200).json({ lunc });
}

//get by id 
const getIdByLunch = async (req, res, next) => {
    let id = req.params.id;
    let lunc;
    try {
        lunc = await Lunch.findById(id);
    } catch (err) {
        console.log(err);
    }
    if (!lunc) {
        return res.status(404).json({ message: "Unable to find" });
    }
    return res.status(200).json({ lunc });
}

//update Lunch
const updateLunch = async (req, res, next) => {
    let id = req.params.id;
    const { LNutrition_title, LNutrition_description } = req.body;
    let lunc;
    try {
        lunc = await Lunch.findByIdAndUpdate(id, { LNutrition_title, LNutrition_description });
        lunc = await lunc.save();
    } catch (error) {
        console.log(error);
    }
    if (!lunc) {
        return res.status(404).json({ message: "Unable to update" });
    }
    return res.status(200).json({ lunc });
}

//delete Lunch 
const deleteLunch = async (req, res, next) => {
    let id = req.params.id;
    let lunc;
    try {
        lunc = await Lunch.findByIdAndDelete(id);
    } catch (error) {
        console.log(error);
    }
    if (!lunc) {
        return res.status(404).json({ message: "Unable to find" });
    }
    return res.status(200).json({ lunc });
}

exports.getAllLunch = getAllLunch;
exports.addLunch = addLunch;
exports.getIdByLunch = getIdByLunch;
exports.updateLunch = updateLunch;
exports.deleteLunch = deleteLunch;