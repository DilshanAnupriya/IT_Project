const mongoose = require("mongoose");

const careplanSchema = new mongoose.Schema({
    elderName: {
        type: String,
        required: true,
    },
    personalCare: {
        type: String,
        required: true,
    },
    medication: {
        type: String,
        required: true,
    },
    meals: {
        type: String,
        required: true,
    },
    companions: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    });

module.exports = mongoose.model("Careplan", careplanSchema);
