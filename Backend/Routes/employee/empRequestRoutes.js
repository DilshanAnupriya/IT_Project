const express = require("express");
const request = express.Router();

//insert controller
const empRequestController = require('../../Controllers/employee/empRequestControllers');

//employee Request
request.get("/", empRequestController.getAllRequests);
request.post("/create", empRequestController.createRequests);
request.get("/:id", empRequestController.getIdByRequests);
request.put("/update/:id", empRequestController.updateRequests);
request.delete("/delete/:id", empRequestController.deleteRequests);

//export
module.exports = request;