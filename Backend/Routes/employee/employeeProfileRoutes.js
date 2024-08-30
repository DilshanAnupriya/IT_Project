const express = require("express");
const profile = express.Router();

//insert controller
const empProfileController = require('../../Controllers/employee/employeeProfileControllers');

//employee profile
profile.get("/", empProfileController.getAllProfile);
profile.post("/create", empProfileController.createProfile);
profile.get("/:id", empProfileController.getIdByProfile);
profile.put("/update/:id", empProfileController.updateProfile);
profile.delete("/delete/:id", empProfileController.deleteProfile);

//export
module.exports = profile;