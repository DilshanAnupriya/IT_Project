import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import styles from "../../../Pages/Naveen/Accounts/acc.module.css";

function AddAccountPopup({ reloadAccounts, closePopup, accountData }) {
  const base_url = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

  // Form validation schema
  const formSchema = z.object({
    accountNumber: z.string().min(1, "Account Number is required"),
    bankName: z.string().min(1, "Bank Name is required"),
    branch: z.string().min(1, "Branch is required"),
    openingBalance: z.string().min(1, "Opening Balance is required").refine(
      (value) => !isNaN(parseFloat(value)), // Ensure it's a valid number
      { message: "Opening Balance must be a valid number" }
    ),
  });

  // React Hook Form initialization
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountNumber: "",
      bankName: "",
      branch: "",
      openingBalance: "",
    },
  });

  // UseEffect to prefill form if editing an existing account
  useEffect(() => {
    if (accountData) {
      setValue("accountNumber", accountData.accNo);
      setValue("bankName", accountData.bank);
      setValue("branch", accountData.branch);
      setValue("openingBalance", accountData.amount.toString());
    }
  }, [accountData, setValue]);

  // Submit handler
  const onSubmit = async (data) => {
    const { accountNumber, bankName, branch, openingBalance } = data;

    const accountPayload = {
      bank: bankName,
      accNo: accountNumber,
      branch,
      amount: parseFloat(openingBalance),
    };

    if (accountData) {
      await updateAccount(accountPayload); // If editing, update the account
    } else {
      await addAccount(accountPayload); // If adding, add a new account
    }
  };

  // API call for adding an account
  const addAccount = async (newAccountData) => {
    try {
      const res = await axios.post(`${base_url}/account/add`, newAccountData);
      if (res.status === 201) {
        reset();
        closePopup(); // Close the popup after adding
        reloadAccounts(); // Reload the accounts data
      } else {
        throw new Error("Failed to add account");
      }
    } catch (error) {
      console.error("Error adding account:", error);
      alert("Failed to add account. Please try again.");
    }
  };

  // API call for updating an existing account
  const updateAccount = async (updatedAccountData) => {
    try {
      const res = await axios.put(
        `${base_url}/account/update/${accountData.accNo}`, // API endpoint to update the account
        updatedAccountData
      );
      if (res.status === 200) {
        reset();
        closePopup(); // Close the popup after updating
        reloadAccounts(); // Reload the accounts data
      } else {
        throw new Error("Failed to update account");
      }
    } catch (error) {
      console.error("Error updating account:", error);
      alert("Failed to update account. Please try again.");
    }
  };

  return (
    <div className={styles.popupContainer}>
      {/* Form to add or update an account */}
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* Account Number Field */}
        <Form.Group className="mb-3">
          <Form.Control
            {...register("accountNumber")}
            type="text"
            placeholder="Enter Account Number"
            disabled={!!accountData} // Disable editing the account number during an update
          />
          {errors.accountNumber && (
            <span className={styles.errorValidation}>
              {errors.accountNumber.message}
            </span>
          )}
        </Form.Group>

        {/* Bank Name Field */}
        <Form.Group className="mb-3">
          <Form.Control
            {...register("bankName")}
            type="text"
            placeholder="Enter Bank Name"
          />
          {errors.bankName && (
            <span className={styles.errorValidation}>
              {errors.bankName.message}
            </span>
          )}
        </Form.Group>

        {/* Branch Field */}
        <Form.Group className="mb-3">
          <Form.Control
            {...register("branch")}
            type="text"
            placeholder="Enter Branch"
          />
          {errors.branch && (
            <span className={styles.errorValidation}>
              {errors.branch.message}
            </span>
          )}
        </Form.Group>

        {/* Opening Balance Field */}
        <Form.Group className="mb-3">
          <Form.Control
            {...register("openingBalance")}
            type="text"
            placeholder="Enter Opening Balance"
          />
          {errors.openingBalance && (
            <span className={styles.errorValidation}>
              {errors.openingBalance.message}
            </span>
          )}
        </Form.Group>

        {/* Submit and Cancel buttons */}
        <Button type="submit" variant="primary" disabled={isSubmitting} className={styles.addBtn}>
          {isSubmitting ? (accountData ? "Updating..." : "Adding...") : (accountData ? "Update" : "Add")}
        </Button>
        <Button variant="secondary" onClick={closePopup} className={styles.cancelBtn}>
          Close
        </Button>
      </Form>
    </div>
  );
}

export default AddAccountPopup;
