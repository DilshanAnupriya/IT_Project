const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    gmail: {
        type: String,
        required: true
    },
    phoneNo: {
        type: Number,
        required: true
    }, 
    gender: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true  
    },

});

const User = mongoose.model("User", userSchema);