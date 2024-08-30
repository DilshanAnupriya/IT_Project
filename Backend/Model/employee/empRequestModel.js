const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const empRequest_Schema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    Phone_no: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    edu_qualifications: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    years_experience: {
        type: String,
        required: true
    },
    computer_performance: {
        type: String,
        required: true
    },
    english_level: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model(
    "empRequestModel", //file name
    empRequest_Schema //function name
)