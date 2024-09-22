const express = require("express");
const fund = express.Router();



//insert controller
const Funds = require('../../Controllers/Account/fundController');



fund.get("/", Funds.getDetails);
fund.post("/add", Funds.CreateFund);
fund.get("/:id", Funds.getById);
fund.put("/update/:id", Funds.UpdateDetails);
fund.delete("/delete/:id", Funds.DeleteDetails);

module.exports = fund;