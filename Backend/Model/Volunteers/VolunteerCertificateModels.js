const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Certificate_Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    v_name: {
        type: String,
        required: true
    },
    issue_date: {
        type: Date,
        required: true
    },
    time_period: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model(
    "VolunteerCertificateModels",//file name
    Certificate_Schema //function name
)
