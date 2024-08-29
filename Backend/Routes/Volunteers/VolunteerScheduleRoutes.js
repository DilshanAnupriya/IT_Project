const express = require("express");
const schedule = express.Router();

//insert model
const Schedule = require("../../Model/Volunteers/VolunteerScheduleModels");


//insert controller
const VolunteerSchedule = require('../../Controllers/Volunteers/VolunteerScheduleControllers');


schedule.get("/", VolunteerSchedule.DisplaySchedule);
schedule.post("/add", VolunteerSchedule.CreateSchedule);
schedule.get("/:id", VolunteerSchedule.GetId);
schedule.put("/update/:id", VolunteerSchedule.UpdateSchedule);
schedule.delete("/delete/:id", VolunteerSchedule.DeleteSchedule);

module.exports = schedule;