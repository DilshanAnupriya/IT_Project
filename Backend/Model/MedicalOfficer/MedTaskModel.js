const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const MedTask_Schema = new Schema({

    
    
    Elder_pname:{
        type:String,
        required:true,
    },
    
    Treatments:{
        type:String,
        required:true,
    },
    Taskdate:{
        type:Date,
        required:true,
    },
    Status:{
        type:String,
        required:true,
    },
    
 
});

module.exports = mongoose.model(
    "MedTaskModel", //file name
    MedTask_Schema //function name

)