const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const NutritionSchema = new Schema({

    
    Nutrition_title:{
        type:String, //data type
        required:true, //validate
    },
    Nutrition_description:{
        type:String,
        required:true,
    },

});

module.exports = mongoose.model(
    "NutritionModel", //file name
    NutritionSchema //function name

)