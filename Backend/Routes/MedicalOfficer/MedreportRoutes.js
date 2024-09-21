const express = require("express");
const MReport = express.Router();


//Insert Reports Controller
const MedReportController = require('../../Controllers/MedicalOfficer/MedreportControllers');

MReport.get("/",MedReportController.getAllMedReports);
MReport.post("/add",MedReportController.addMedReports);
MReport.get("/:id", MedReportController.getIdByMedReports);
MReport.put("/update/:id", MedReportController.updateMedicalReports);
MReport.delete("/delete/:id", MedReportController.deleteMedReports);

//export
module.exports = MReport;