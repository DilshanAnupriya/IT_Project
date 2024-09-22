const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VolunteerTask_Schema = Schema({
    task_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    special_instruction: {
        type: String,
        required: true
    },
    assign_to: {
        type: String,
        required: true
    }


});

module.exports = mongoose.model(
    "VolunteerTaskModels", //file name
    VolunteerTask_Schema //function name
)