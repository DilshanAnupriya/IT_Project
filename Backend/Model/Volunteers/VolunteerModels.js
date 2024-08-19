
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Volunteer_Schema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    date_of_birth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    skills: {
        type: String,
        required: true
    },
    type_of_work: {
        type: String,
        required: true
    },
    legal_eligibility: {
        type: String,
        required: true
    },
    days: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model(
    "VolunteerModels",//file name
    Volunteer_Schema //function name
)

