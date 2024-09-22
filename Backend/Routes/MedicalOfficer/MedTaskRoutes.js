const express = require("express");
const MTasksd = express.Router();

const Tasks = require("../../Model/MedicalOfficer/MedTaskModel");

//Insert Task Controller
const MedTaskController = require('../../Controllers/MedicalOfficer/MedTaskControllers');

MTasksd.get("/",MedTaskController.getAllMedTasks);
MTasksd.post("/add",MedTaskController.addMedTasks);
MTasksd.get("/:id", MedTaskController.getIdByMedTask);
MTasksd.put("/update/:id", MedTaskController.updateMedicalTasks);
MTasksd.delete("/delete/:id", MedTaskController.deleteMedTasks);

//export
module.exports = MTasksd;