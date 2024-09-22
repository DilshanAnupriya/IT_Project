const { get } = require('mongoose');
const Dinner = require("../../Model/MedicalOfficer/NutritionModel");

//data display
const getAllDinner = async (req, res, next) => {

    let dinn;
    //Get all Items

    try{
        dinn = await Dinner.find ();
    } catch(err) {
        console.log(err);
    }
    //could not found
    if(!dinn){
        return res.status(404).json({message: "Item not found "});
    }
    //Display all Items
    return res.status(200).json({dinn});
}

//data insert
const addDinner = async( req, res, next) =>{

    const {Nutrition_title,Nutrition_description} =req.body;

    let dinn;

    try{
        dinn = new Dinner({Nutrition_title,Nutrition_description});
        await dinn.save();
    }catch(err){
        console.log(err);
    }
    //not found 
    if(!dinn){
        return res.status(404).json({ massage: "unable to find" })
    }

    //find by id
    return res.status(200).json({ dinn });


}

//get by id 
const getIdByDinner = async (req, res, next) => {
    let id = req.params.id;
    let dinn;

    //get by id
    try {
        dinn = await Dinner.findById(id);
    } catch (err) {
        console.log(err);
    }

    //not found 
    if(!dinn){
        return res.status(404).json({ massage: "unable to find" })
    }

    //find profile by id
    return res.status(200).json({ dinn });
}
//update Lunch
const updateDinner = async (req, res, next) => {
    let id = req.params.id;
    let dinn;
    const {Nutrition_title,Nutrition_description} = req.body;

    //update Lunch
    try {
        dinn = await Dinner.findByIdAndUpdate(id, 
            { Nutrition_title : Nutrition_title, Nutrition_description :Nutrition_description}
        );
        dinn = await dinn.save(); //Dinner
    } catch (error) {
        console.log(error);
    }

    //not found 
    if(!dinn){
        return res.status(404).json({ massage: "unable to update" })
    }

    //update Dinner
    return res.status(200).json({ dinn });
}
//delete Dinner 
const deleteDinner = async (req, res, next) => {
    let id = req.params.id;
    let dinn;

    //get item by id
    try {
        dinn = await Dinner.findByIdAndDelete(id);
    } catch (error) {
        console.log(error);
    }

    //not found 
    if(!dinn){
        return res.status(404).json({ massage: "unable to find" })
    }

    //find Dinner by id
    return res.status(200).json({ dinn });
}

exports.getAllDinner = getAllDinner
exports.addDinner = addDinner
exports.getIdByDinner = getIdByDinner
exports.updateDinner = updateDinner
exports.deleteDinner = deleteDinner