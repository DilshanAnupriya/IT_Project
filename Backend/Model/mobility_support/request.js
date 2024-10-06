const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const requirementSchema = new Schema({
    elderId : {
        type : String,
        required : true
       
    },
    requests : {
        type : String,
       
    },

})
    // table eke schemas
const Requests = mongoose.model("rSchema",requirementSchema);

module.exports = Requests;