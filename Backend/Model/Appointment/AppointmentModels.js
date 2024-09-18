const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gmail: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    appointmenttype: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Appointment", appointmentSchema);