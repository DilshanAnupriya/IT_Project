const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LNutritionSchema = new Schema({
    LNutrition_title: {
        type: String,
        required: true,
    },
    LNutrition_description: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("LNutritionModel", LNutritionSchema);