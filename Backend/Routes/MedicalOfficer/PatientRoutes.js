const express = require("express");
const patient = express.Router();


//Insert Patient Controller
const PatientController = require('../../Controllers/MedicalOfficer/PatientControllers');

patient.get("/",PatientController.getAllPatients);
patient.post("/add",PatientController.addPatient);
patient.get("/:id", PatientController.getIdByPatient);
patient.put("/update/:id", PatientController.updatePatient);
patient.delete("/delete/:id", PatientController.deletePatient);

//export
module.exports = patient;