const express = require("express");
const Dinner = express.Router();


//Insert Dinner Controller
const DinnerController = require('../../Controllers/MedicalOfficer/DinnerControllers');

Dinner.get("/",DinnerController.getAllDinner);
Dinner.post("/add",DinnerController.addDinner);
Dinner.get("/:id", DinnerController.getIdByDinner);
Dinner.put("/update/:id", DinnerController.updateDinner);
Dinner.delete("/delete/:id", DinnerController.deleteDinner);

//export
module.exports = Dinner;