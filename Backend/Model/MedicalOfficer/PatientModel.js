const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const patientSchema = new Schema({

    
    Elder_name:{
        type:String, //data type
        required:true, //validate
    },
    diagnosis:{
        type:String,
        required:true,
    },
    datein:{
        type:Date,
        required:true,
     },
    
    roomnum:{
        type:Number,
        required:true,
     },
    age:{
        type:Number, 
        required:true,
    },
    Prescription:{
        type:String,
        required:true,
    },
    
 
});

module.exports = mongoose.model(
    "PatientModel", //file name
    patientSchema //function name

)