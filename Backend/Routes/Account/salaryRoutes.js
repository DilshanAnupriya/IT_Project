const express = require("express");
const salary = express.Router();



//insert controller
const sal = require('../../Controllers/Account/salaryController');



salary.get("/", sal.getDetails);
salary.post("/add", sal.Createsal);
salary.get("/:id", sal.getById);
salary.put("/update/:id", sal.UpdateDetails);
salary.delete("/delete/:id", sal.DeleteDetails);

module.exports = salary;