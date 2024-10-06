const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const equipmentSchema = new Schema({
    name : {
        type : String,
        required : true
    },

    discription : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
       
    },
    condition : {
        type : String,
    },
    model_number : {
        type : String,
    },
   

})
 // table eke schemas
const equipment = mongoose.model("eSchema",equipmentSchema);

module.exports = equipment;