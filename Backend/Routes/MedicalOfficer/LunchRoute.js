const express = require("express");
const Lunch = express.Router();


//Insert Lunch Controller
const LunchController = require('../../Controllers/MedicalOfficer/LunchControllers');

Lunch.get("/",LunchController.getAllLunch);
Lunch.post("/add",LunchController.addLunch);
Lunch.get("/:id", LunchController.getIdByLunch);
Lunch.put("/update/:id", LunchController.updateLunch);
Lunch.delete("/delete/:id", LunchController.deleteLunch);

//export
module.exports = Lunch;