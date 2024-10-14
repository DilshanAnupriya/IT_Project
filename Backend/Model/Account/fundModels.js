const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const funds_Schema = new Schema({
    fund_name: {
        type: String,
        required: true
    },
    fund_amount: {
        type: Number,
        required: true
    },
    fund_date: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model(
    "fundModels", // Collection name
    funds_Schema  // Schema name
);


