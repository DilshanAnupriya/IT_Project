const express = require("express");
const expenditure = express.Router();

// Import controller
const expController = require('../../Controllers/Account/expenditurecontrol');

// Define routes
expenditure.get("/", expController.getExpenditureDetails); // Fetch all expenditures
expenditure.post("/add", expController.createExpenditure); // Create a new expenditure
expenditure.get("/:id", expController.getExpenditureById); // Fetch expenditure by ID
expenditure.put("/update/:id", expController.updateExpenditureDetails); // Update expenditure by ID
expenditure.delete("/delete/:id", expController.deleteExpenditureDetails); // Delete expenditure by ID

module.exports = expenditure;
