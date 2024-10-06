const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sheduleSchema = new Schema({
    elderId : {
        type : String,
       
    },
    name : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        required : true
    },
    phone_number : {
        type : Number,
        required :true
    },
    email : {
        type : String,
    },
    NIC : {
        type : String,
       
    },
    current_status : {
        type : String,
    },
    current_physical_condition : {
        type : String,
    },
    previous_therapy : {
        type : String,
    },
    therapy_goal : {
        type : String,
    },
    date : {
        type : Date,
       
    },
    preferred_time: {
        type: String,
     
        validate: {
            validator: function(v) {
                return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v); // Regex to validate HH:mm format
            },
            message: props => `${props.value} is not a valid time format!`
        }
    },
    frequency : {
        type : String,
        
    },
    location : {
        type : String,
    },
    therapist_preference : {
        type : String,
    }


})
 // table eke schemas
const Shedule = mongoose.model("Schema",sheduleSchema);

module.exports = Shedule;