const { get } = require('mongoose');
const Lunch = require("../../Model/MedicalOfficer/NutritionModel");

//data display
const getAllLunch = async (req, res, next) => {

    let lunc;
    //Get all Items

    try{
        lunc = await Lunch.find ();
    } catch(err) {
        console.log(err);
    }
    //could not found
    if(!lunc){
        return res.status(404).json({message: "Item not found "});
    }
    //Display all Items
    return res.status(200).json({lunc});
}

//data insert
const addLunch = async( req, res, next) =>{

    const {Nutrition_title,Nutrition_description} =req.body;

    let lunc;

    try{
        lunc = new Lunch({Nutrition_title,Nutrition_description});
        await lunc.save();
    }catch(err){
        console.log(err);
    }
    //not found 
    if(!lunc){
        return res.status(404).json({ massage: "unable to find" })
    }

    //find by id
    return res.status(200).json({ lunc });


}

//get by id 
const getIdByLunch = async (req, res, next) => {
    let id = req.params.id;
    let lunc;

    //get by id
    try {
        lunc = await Lunch.findById(id);
    } catch (err) {
        console.log(err);
    }

    //not found 
    if(!lunc){
        return res.status(404).json({ massage: "unable to find" })
    }

    //find profile by id
    return res.status(200).json({ lunc });
}
//update Lunch
const updateLunch = async (req, res, next) => {
    let id = req.params.id;
    let lunc;
    const {Nutrition_title,Nutrition_description} = req.body;

    //update Lunch
    try {
        lunc = await Lunch.findByIdAndUpdate(id, 
            { Nutrition_title : Nutrition_title, Nutrition_description :Nutrition_description}
        );
        lunc = await lunc.save(); //Lunch
    } catch (error) {
        console.log(error);
    }

    //not found 
    if(!lunc){
        return res.status(404).json({ massage: "unable to update" })
    }

    //update Lunch
    return res.status(200).json({ lunc });
}
//delete Lunch 
const deleteLunch = async (req, res, next) => {
    let id = req.params.id;
    let lunc;

    //get item by id
    try {
        lunc = await Lunch.findByIdAndDelete(id);
    } catch (error) {
        console.log(error);
    }

    //not found 
    if(!lunc){
        return res.status(404).json({ massage: "unable to find" })
    }

    //find Lunch by id
    return res.status(200).json({ lunc });
}

exports.getAllLunch = getAllLunch
exports.addLunch = addLunch
exports.getIdByLunch = getIdByLunch
exports.updateLunch = updateLunch
exports.deleteLunch = deleteLunch