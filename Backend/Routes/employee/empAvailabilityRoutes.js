const express = require("express");
const Availability = express.Router();

//insert controller
const empAvailabilityController = require('../../Controllers/employee/empAvailabilityControllers');

//employee Availability
Availability.get("/", empAvailabilityController.getAllAvailability);
Availability.post("/create", empAvailabilityController.createAvailability);
Availability.get("/:id", empAvailabilityController.getIdByAvailability);
Availability.put("/update/:id", empAvailabilityController.updateAvailability);
Availability.delete("/delete/:id", empAvailabilityController.deleteAvailability);

//export
module.exports = Availability;