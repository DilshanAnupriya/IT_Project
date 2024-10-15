const Account = require("../../Model/Account/accountModels");

// Get all accounts
const getAccounts = async (req, res, next) => {
    try {
        const accounts = await Account.find();
        if (!accounts.length) {
            return res.status(404).json({ message: "No accounts found" });
        }
        return res.status(200).json({ accounts });
    } catch (error) {
        console.error("Error fetching accounts:", error);
        return res.status(500).json({ message: "Server error while fetching accounts" });
    }
};

// Create a new account
const createAccount = async (req, res, next) => {
    const { bank, accNo, branch, amount } = req.body;

    try {
        const existingAccount = await Account.findOne({ accNo });
        if (existingAccount) {
            return res.status(400).json({ message: "Account number already exists" });
        }

        const account = new Account({ bank, accNo, branch, amount });
        await account.save();
        return res.status(201).json({ newAccount: account });
    } catch (error) {
        console.error("Error creating account:", error);
        return res.status(500).json({ message: "Unable to create account" });
    }
};

// Get account by account number (accNo)
const getAccountByAccNo = async (req, res, next) => {
    const accNo = req.params.accNo;

    try {
        const account = await Account.findOne({ accNo });
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }
        return res.status(200).json({ account });
    } catch (error) {
        console.error("Error fetching account:", error);
        return res.status(500).json({ message: "Server error while fetching account" });
    }
};

// Update an account by account number (accNo)
const updateAccount = async (req, res, next) => {
    const accNo = req.params.accNo;
    const { bank, branch, amount } = req.body;

    try {
        const account = await Account.findOneAndUpdate(
            { accNo },
            { bank, branch, amount },
            { new: true, runValidators: true }
        );
        if (!account) {
            return res.status(404).json({ message: "Unable to update account" });
        }
        return res.status(200).json({ account });
    } catch (error) {
        console.error("Error updating account:", error);
        return res.status(500).json({ message: "Server error while updating account" });
    }
};

// Delete an account by account number (accNo)
const deleteAccount = async (req, res, next) => {
    const accNo = req.params.accNo;

    try {
        const account = await Account.findOneAndDelete({ accNo });
        if (!account) {
            return res.status(404).json({ message: "Unable to delete account" });
        }
        return res.status(200).json({ message: "Account deleted successfully" });
    } catch (error) {
        console.error("Error deleting account:", error);
        return res.status(500).json({ message: "Server error while deleting account" });
    }
};

module.exports = {
    getAccounts,
    createAccount,
    getAccountByAccNo,
    updateAccount,
    deleteAccount
};
