const Account = require("../../Model/Account/accountModels");

// Get all accounts
const getAccounts = async (req, res, next) => {
    let accounts;
  
    try {
        accounts = await Account.find();
    } catch (error) {
        console.log(error);
    }

    if (!accounts) {
        return res.status(404).json({ message: "No accounts found" });
    }
    return res.status(200).json({ accounts });
};

// Create a new account
const createAccount = async (req, res, next) => {
    const { bank, accNo, branch, amount } = req.body;

    let account;

    try {
        account = new Account({ bank, accNo, branch, amount });
        await account.save();
    } catch (error) {
        console.log(error);
    }

    if (!account) {
        return res.status(500).json({ message: "Unable to create account" });
    }

    return res.status(201).json({ newAccount: account });
};

// Get account by account number (accNo)
const getAccountByAccNo = async (req, res, next) => {
    const accNo = req.params.accNo;
    let account;

    try {
        account = await Account.findOne({ accNo });
    } catch (error) {
        console.log(error);
    }

    if (!account) {
        return res.status(404).json({ message: "Account not found" });
    }

    return res.status(200).json({ account });
};

// Update an account by account number (accNo)
const updateAccount = async (req, res, next) => {
    const accNo = req.params.accNo;
    const { bank, branch, amount } = req.body;
    let account;

    try {
        account = await Account.findOneAndUpdate(
            { accNo },
            { bank, branch, amount },
            { new: true }
        );
    } catch (error) {
        console.log(error);
    }

    if (!account) {
        return res.status(404).json({ message: "Unable to update account" });
    }

    return res.status(200).json({ account });
};

// Delete an account by account number (accNo)
const deleteAccount = async (req, res, next) => {
    const accNo = req.params.accNo;
    let account;

    try {
        account = await Account.findOneAndDelete({ accNo });
    } catch (error) {
        console.log(error);
    }

    if (!account) {
        return res.status(404).json({ message: "Unable to delete account" });
    }

    return res.status(200).json({ message: "Account deleted successfully" });
};

module.exports = {
    getAccounts,
    createAccount,
    getAccountByAccNo,
    updateAccount,
    deleteAccount
};
