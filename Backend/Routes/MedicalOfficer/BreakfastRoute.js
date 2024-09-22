const express = require("express");
const Breakfast = express.Router();


//Insert Breakfast Controller
const BreakfastController = require('../../Controllers/MedicalOfficer/BreakfastControllers');

Breakfast.get("/",BreakfastController.getAllBreakfast);
Breakfast.post("/add",BreakfastController.addBreakfast);
Breakfast.get("/:id", BreakfastController.getIdByBreakfast);
Breakfast.put("/update/:id", BreakfastController.updateBreakfast);
Breakfast.delete("/delete/:id", BreakfastController.deleteBreakfast);

//export
module.exports = Breakfast;