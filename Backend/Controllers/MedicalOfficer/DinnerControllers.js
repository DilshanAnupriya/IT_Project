const Dinner = require("../../Model/MedicalOfficer/DNutritionModel");

//data display
const getAllDinner = async (req, res, next) => {

    let dinn;
    try {
        dinn = await Dinner.find();
    } catch (err) {
        console.log(err);
    }
    if (!dinn) {
        return res.status(404).json({ message: "Item not found" });
    }
    return res.status(200).json({ dinn });
}

//data insert
const addDinner = async (req, res, next) => {
    const { DNutrition_title, DNutrition_description } = req.body;
    let dinn;
    try {
        dinn = new Dinner({ DNutrition_title, DNutrition_description });
        await dinn.save();
    } catch (err) {
        console.log(err);
    }
    if (!dinn) {
        return res.status(404).json({ message: "Unable to add" });
    }


    return res.status(200).json({ dinn });


}

//get by id 
const getIdByDinner = async (req, res, next) => {
    let id = req.params.id;
    let dinn;


    try {
        dinn = await Dinner.findById(id);
    } catch (err) {
        console.log(err);
    }
    if (!dinn) {
        return res.status(404).json({ message: "Unable to find" });
    }








    return res.status(200).json({ dinn });
}

//update Dinner
const updateDinner = async (req, res, next) => {
    let id = req.params.id;
    const { DNutrition_title, DNutrition_description } = req.body;
    let dinn;





    
    try {
        dinn = await Dinner.findByIdAndUpdate(id, { DNutrition_title, DNutrition_description });
        dinn = await dinn.save();
    } catch (error) {
        console.log(error);
    }
    if (!dinn) {
        return res.status(404).json({ message: "Unable to update" });
    }
    return res.status(200).json({ dinn });
}

//delete Dinner 
const deleteDinner = async (req, res, next) => {
    let id = req.params.id;
    let dinn;
    try {
        dinn = await Dinner.findByIdAndDelete(id);
    } catch (error) {
        console.log(error);
    }
    if (!dinn) {
        return res.status(404).json({ message: "Unable to find" });
    }
    return res.status(200).json({ dinn });
}

exports.getAllDinner = getAllDinner;
exports.addDinner = addDinner;
exports.getIdByDinner = getIdByDinner;
exports.updateDinner = updateDinner;
exports.deleteDinner = deleteDinner;