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
    phone_no: {
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
    yearsOfQualification: {
        type: String,
        required: true
    },
    computerLiteracy: {
        type: String,
        required: true
    },
    englishSkills: {
        type: String,
        required: true
    },
    reference: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model(
    "empRequestModel", //file name
    empRequest_Schema //function name
)