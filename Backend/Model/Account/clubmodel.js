const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const club_Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    club_types: {
        type: String,
        required: true
    },
    event: {
        type: String,
        required: true
    },
    donations: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model(
    "clubModels", // file name
    club_Schema   // schema name
);
