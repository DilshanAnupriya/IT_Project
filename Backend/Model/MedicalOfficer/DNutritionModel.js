const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DNutritionSchema = new Schema({
    DNutrition_title: {
        type: String,
        required: true,
    },
    DNutrition_description: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("DNutritionModel", DNutritionSchema);