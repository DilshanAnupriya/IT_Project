const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    bank: {
        type: String,
        required: true
    },
    accNo: {
        type: String,
        required: true,
        unique: true // Assuming account number should be unique for each account
    },
    branch: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
}, {
    timestamps: true // To automatically manage createdAt and updatedAt fields
});

module.exports = mongoose.model(
    "Account", // Model name
    accountSchema // Schema name
);
