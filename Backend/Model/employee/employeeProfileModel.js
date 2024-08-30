const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeProfile_Schema = Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    job_role: {
        type: String,
        required: true
    },
    nic: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    qualifications: {
        type: String,
        required: true
    },
    bank_details: {
        type: String,
        required: true
    },
    joined_date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model(
    "employeeProfileModel", //file name
    employeeProfile_Schema //function name
)