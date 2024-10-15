const express = require("express");
const Fund = express.Router();



//insert controller
const Funds = require('../../Controllers/Account/fundController');



Fund.get("/", Funds.getDetails);
Fund.post("/add", Funds.CreateFund);
Fund.get("/:id", Funds.getById);
Fund.put("/update/:id", Funds.UpdateDetails);
Fund.delete("/delete/:id", Funds.DeleteDetails);

module.exports = Fund;