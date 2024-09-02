const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const Medreport_Schema = new Schema({

    
    Elder_firstname:{
        type:String, //data type
        required:true, //validate
    },
    Elder_lastname:{
        type:String,
        required:true,
    },
    
    Age:{
        type:Number,
        required:true,
    },
    Gender:{
        type:String,
        required:true,
    },
    Current_need:{
        type:String,
        required:true,
    },
    Summary:{
        type:String,
        required:true,
    },

    
 
});

module.exports = mongoose.model(
    "Medreport", //file name
    Medreport_Schema //function name

)