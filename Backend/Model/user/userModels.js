const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    dob: {
        type: String, // Consider using Date type for better date handling
        required: true
    },
    gmail: {
        type: String,
        required: true,
        unique: true, // Ensure each email is unique
        lowercase: true // Normalize email to lowercase
    },
    phoneNo: {
        type: String, // Use String to handle leading zeros and formatting
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

// Optional: Add a method to compare passwords if you're using a library like bcrypt
userSchema.methods.comparePassword = function (password) {
    // Logic to compare password with hashed password
};


const User = mongoose.model("User", userSchema);
module.exports = User;