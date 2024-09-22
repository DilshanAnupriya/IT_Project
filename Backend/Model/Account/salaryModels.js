const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salary_Schema = new Schema({
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    month: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },

  
});
module.exports = mongoose.model(
    "salaryModels",//file name
    salary_Schema //function name
)
