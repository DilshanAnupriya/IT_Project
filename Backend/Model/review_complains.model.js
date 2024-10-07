const mongoose = require('mongoose')

const reviewAndComplaintSchema =  new mongoose.Schema({
    userid: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    type : {
        type: String,
        required: true,
        enum: ['r','c']
    },
    status: {
        type: String,
        enum: ['pending', 'resolved']
    },
    rating: {
        type: Number,
        enum: [1,2,3,4,5, null]
    },
    date: {
        type: String,
    },
    response: {
        type: String,
        default: 'pending'
    }
}, {timestamps: true})

const reviewAndComplaint = mongoose.model('ReviewAndComplaint', reviewAndComplaintSchema)

module.exports = { reviewAndComplaint }