const express = require("express");
const certificate = express.Router();


//insert model
const V_certificate = require("../../Model/Volunteers/VolunteerCertificateModels")
//insert controller
const V_Certificate = require('../../Controllers/Volunteers/VolunteerCertificateControllers');



certificate.get("/", V_Certificate.getDetails);
certificate.post("/add", V_Certificate.CreateCertificate);
certificate.get("/:id", V_Certificate.getById);
certificate.put("/update/:id", V_Certificate.UpdateDetails);
certificate.delete("/delete/:id", V_Certificate.DeleteDetails);

module.exports = certificate;