const express = require("express");
const router = express.Router();

//insert model
const Volunteer = require("../../Model/Volunteers/VolunteerModels")


//insert controller
const VolunteerMController = require('../../Controllers/Volunteers/VolunteerControllers');


//volunteer registration
router.get("/", VolunteerMController.getAllVolunteers);
router.post("/add", VolunteerMController.CreateVolunteers);
router.get("/:id", VolunteerMController.getByIId);
router.put("/update/:id", VolunteerMController.UpdateVolunteer);
router.delete("/delete/:id", VolunteerMController.DeleteVolunteer);


//export
module.exports = router;
