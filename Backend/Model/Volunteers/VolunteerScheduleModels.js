const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ScheduleSchema = Schema({
    event_name: {
        type: String,
        required: true
    },
    S_time: {
        type: String,
        required: true
    },
    E_time: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model(
    "VolunteerScheduleModels", //file name
    ScheduleSchema //function name
)