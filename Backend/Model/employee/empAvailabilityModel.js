const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const empAvailability_Schema = Schema({
    emp_name: {
        type: String,
        required: true
    },
    schedule_date: {
        type: Date,
        required: true
    },
    schedule_start_time: {
        type: String,
        required: true
    },
    schedule_end_time: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model(
    "empAvailabilityModel", //file name
    empAvailability_Schema //function name
)