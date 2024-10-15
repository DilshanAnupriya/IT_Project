const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenditure_Schema = new Schema({
    expenditure_type: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model(
    "expenditureModels", // Model name
    expenditure_Schema   // Corrected variable name
);
