const express = require("express");
const task = express.Router();

//insert model
const VolunteerTask = require("../../Model/Volunteers/VolunteerTaskModels");
//insert controller
const VolunteerTaskController = require('../../Controllers/Volunteers/VolunteerTaskControllers');

//volunteer task
task.get("/", VolunteerTaskController.getAllTask);
task.post("/create", VolunteerTaskController.CreateTask);
task.get("/:id", VolunteerTaskController.getByIId);
task.put("/update/:id", VolunteerTaskController.UpdateTask);
task.delete("/delete/:id", VolunteerTaskController.DeleteTask);




//export
module.exports = task;