const { get } = require('mongoose');
const Patient = require("../../Model/MedicalOfficer/PatientModel");

//data display
const getAllPatients = async (req, res, next) => {

    let Pat;
    //Get all patients

    try{
        Pat = await Patient.find ();
    } catch(err) {
        console.log(err);
    }
    //could not found
    if(!Pat){
        return res.status(404).json({message: "Patient not found "});
    }
    //Display all patients
    return res.status(200).json({Pat});
}

//data insert
const addPatient = async( req, res, next) =>{

    const {Elder_name,diagnosis,datein,roomnum,age,Prescription} =req.body;

    let pat;

    try{
        pat = new Patient({Elder_name,diagnosis,datein,roomnum,age,Prescription});
        await pat.save();
    }catch(err){
        console.log(err);
    }
    //not found 
    if(!pat){
        return res.status(404).json({ massage: "unable to find" })
    }

    //find profile by id
    return res.status(200).json({ pat });


}

//get by id 
const getIdByPatient = async (req, res, next) => {
    let id = req.params.id;
    let pat;

    //get profile by id
    try {
        pat = await Patient.findById(id);
    } catch (err) {
        console.log(err);
    }

    //not found 
    if(!pat){
        return res.status(404).json({ massage: "unable to find" })
    }

    //find profile by id
    return res.status(200).json({ pat });
}
//update Patient
const updatePatient = async (req, res, next) => {
    let id = req.params.id;
    let pat;
    const {Elder_name,diagnosis,datein,roomnum,age,Prescription} = req.body;

    //update Patient
    try {
        pat = await Patient.findByIdAndUpdate(id, 
            { Elder_name : Elder_name,diagnosis :diagnosis,datein :datein,roomnum :roomnum,age :age,Prescription:Prescription }
        );
        pat = await pat.save(); //pat
    } catch (error) {
        console.log(error);
    }

    //not found 
    if(!pat){
        return res.status(404).json({ massage: "unable to update" })
    }

    //update profile
    return res.status(200).json({ pat });
}
//delete patient 
const deletePatient = async (req, res, next) => {
    let id = req.params.id;
    let pat;

    //get profile by id
    try {
        pat = await Patient.findByIdAndDelete(id);
    } catch (error) {
        console.log(error);
    }

    //not found 
    if(!pat){
        return res.status(404).json({ massage: "unable to find" })
    }

    //find profile by id
    return res.status(200).json({ pat });
}

exports.getAllPatients = getAllPatients
exports.addPatient = addPatient
exports.getIdByPatient =getIdByPatient
exports.updatePatient= updatePatient
exports.deletePatient = deletePatient