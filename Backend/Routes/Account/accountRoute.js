const express = require("express");
const account = express.Router();

// Import the account controller
const Accounts = require('../../Controllers/Account/accountController');

// Routes for account operations
account.get("/", Accounts.getAccounts);            // Get all accounts
account.post("/add", Accounts.createAccount);      // Create a new account
account.get("/:accNo", Accounts.getAccountByAccNo); // Get account by account number
account.put("/update/:accNo", Accounts.updateAccount); // Update an account by account number
account.delete("/delete/:accNo", Accounts.deleteAccount); // Delete an account by account number

module.exports = account;
