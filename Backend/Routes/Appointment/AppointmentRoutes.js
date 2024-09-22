const express = require("express");
const router = express.Router();
const AppointmentControllers = require("../../Controllers/Appointments/AppointmentControllers");

router.get("/getAppAll", AppointmentControllers.getAllAppointments);
router.post("/addApp", AppointmentControllers.addAppointment);
router.get("/getApp/:id", AppointmentControllers.getById);
router.put("/updateApp/:id", AppointmentControllers.update);
router.delete("/deleteApp/:id", AppointmentControllers.deleteAppointment);

module.exports = router;
