const { get } = require('mongoose');
const Breakfast = require("../../Model/MedicalOfficer/NutritionModel");

//data display
const getAllBreakfast = async (req, res, next) => {

    let bfast;
    //Get all Items

    try{
        bfast = await Breakfast.find ();
    } catch(err) {
        console.log(err);
    }
    //could not found
    if(!bfast){
        return res.status(404).json({message: "Item not found "});
    }
    //Display all Items
    return res.status(200).json({bfast});
}

//data insert
const addBreakfast = async( req, res, next) =>{

    const {Nutrition_title,Nutrition_description} =req.body;

    let bfast;

    try{
        bfast = new Breakfast({Nutrition_title,Nutrition_description});
        await bfast.save();
    }catch(err){
        console.log(err);
    }
    //not found 
    if(!bfast){
        return res.status(404).json({ massage: "unable to find" })
    }

    //find by id
    return res.status(200).json({ bfast });


}

//get by id 
const getIdByBreakfast = async (req, res, next) => {
    let id = req.params.id;
    let bfast;

    //get by id
    try {
        bfast = await Breakfast.findById(id);
    } catch (err) {
        console.log(err);
    }

    //not found 
    if(!bfast){
        return res.status(404).json({ massage: "unable to find" })
    }

    //find profile by id
    return res.status(200).json({ bfast });
}
//update Breakfast
const updateBreakfast = async (req, res, next) => {
    let id = req.params.id;
    let bfast;
    const {Nutrition_title,Nutrition_description} = req.body;

    //update Breakfast
    try {
        bfast = await Breakfast.findByIdAndUpdate(id, 
            { Nutrition_title : Nutrition_title, Nutrition_description :Nutrition_description}
        );
        bfast = await bfast.save(); //breakfast
    } catch (error) {
        console.log(error);
    }

    //not found 
    if(!bfast){
        return res.status(404).json({ massage: "unable to update" })
    }

    //update Breakfast
    return res.status(200).json({ bfast });
}
//delete Breakfast 
const deleteBreakfast = async (req, res, next) => {
    let id = req.params.id;
    let bfast;

    //get item by id
    try {
        bfast = await Breakfast.findByIdAndDelete(id);
    } catch (error) {
        console.log(error);
    }

    //not found 
    if(!bfast){
        return res.status(404).json({ massage: "unable to find" })
    }

    //find Breakfast by id
    return res.status(200).json({ bfast });
}

exports.getAllBreakfast = getAllBreakfast
exports.addBreakfast = addBreakfast
exports.getIdByBreakfast = getIdByBreakfast
exports.updateBreakfast = updateBreakfast
exports.deleteBreakfast = deleteBreakfast