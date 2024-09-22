const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const funds_Schema = new Schema({
    funds: {
        type: Number,
        required: true
    },
    a_amout: {
        type: Number,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    count: {
       type: Number,
       required: true
    }
});
module.exports = mongoose.model(
    "fundModels",//file name
    funds_Schema //function name
)
