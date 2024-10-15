import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import styles from "../../../Pages/Naveen/Accounts/acc.module.css";

function AddFundsPopup({ reloadFunds, closePopup, fundData }) {
  const base_url = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

  // Form validation schema for funds
  const formSchema = z.object({
    fund_name: z.string().min(1, "Fund Name is required"),
    fund_amount: z.string().min(1, "Fund Amount is required").refine(
      (value) => !isNaN(parseFloat(value)), // Ensure it's a valid number
      { message: "Fund Amount must be a valid number" }
    ),
    fund_date: z.string().min(1, "Fund Date is required"),
    description: z.string().min(1, "Description is required"),
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
      fund_name: "",
      fund_amount: "",
      fund_date: "",
      description: "",
    },
  });

  // UseEffect to prefill form if editing an existing fund
  useEffect(() => {
    if (fundData) {
      setValue("fund_name", fundData.fund_name);
      setValue("fund_amount", fundData.fund_amount.toString());
      setValue("fund_date", new Date(fundData.fund_date).toISOString().split('T')[0]);
      setValue("description", fundData.description);
    }
  }, [fundData, setValue]);

  // Submit handler
  const onSubmit = async (data) => {
    const { fund_name, fund_amount, fund_date, description } = data;

    const fundPayload = {
      fund_name,
      fund_amount: parseFloat(fund_amount),
      fund_date,
      description,
    };

    if (fundData) {
      await updateFund(fundPayload); // If editing, update the fund
    } else {
      await addFund(fundPayload); // If adding, add a new fund
    }
  };

  // API call for adding a fund
  const addFund = async (newFundData) => {
    try {
      const res = await axios.post(`${base_url}/funds/add`, newFundData);
      if (res.status === 201) {
        reset();
        closePopup(); // Close the popup after adding
        reloadFunds(); // Reload the funds data
      } else {
        throw new Error("Failed to add fund");
      }
    } catch (error) {
      console.error("Error adding fund:", error);
      alert("Failed to add fund. Please try again.");
    }
  };

  // API call for updating an existing fund
  const updateFund = async (updatedFundData) => {
    try {
      const res = await axios.put(
        `${base_url}/funds/update/${fundData._id}`, // API endpoint to update the fund
        updatedFundData
      );
      if (res.status === 200) {
        reset();
        closePopup(); // Close the popup after updating
        reloadFunds(); // Reload the funds data
      } else {
        throw new Error("Failed to update fund");
      }
    } catch (error) {
      console.error("Error updating fund:", error);
      alert("Failed to update fund. Please try again.");
    }
  };

  return (
    <div className={styles.popupContainer}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* Fund Name Field */}
        <Form.Group className="mb-3">
          <Form.Control
            {...register("fund_name")}
            type="text"
            placeholder="Enter Fund Name"
            disabled={!!fundData} // Disable editing the fund name during an update
          />
          {errors.fund_name && (
            <span className={styles.errorValidation}>{errors.fund_name.message}</span>
          )}
        </Form.Group>

        {/* Fund Amount Field */}
        <Form.Group className="mb-3">
          <Form.Control
            {...register("fund_amount")}
            type="text"
            placeholder="Enter Fund Amount"
          />
          {errors.fund_amount && (
            <span className={styles.errorValidation}>{errors.fund_amount.message}</span>
          )}
        </Form.Group>

        {/* Fund Date Field */}
        <Form.Group className="mb-3">
          <Form.Control
            {...register("fund_date")}
            type="date"
            placeholder="Enter Fund Date"
          />
          {errors.fund_date && (
            <span className={styles.errorValidation}>{errors.fund_date.message}</span>
          )}
        </Form.Group>

        {/* Description Field */}
        <Form.Group className="mb-3">
          <Form.Control
            {...register("description")}
            type="text"
            placeholder="Enter Description"
          />
          {errors.description && (
            <span className={styles.errorValidation}>{errors.description.message}</span>
          )}
        </Form.Group>

        {/* Submit and Cancel buttons */}
        <Button type="submit" variant="primary" disabled={isSubmitting} className={styles.addBtn}>
          {isSubmitting ? (fundData ? "Updating..." : "Adding...") : (fundData ? "Update" : "Add")}
        </Button>
        <Button variant="secondary" onClick={closePopup} className={styles.cancelBtn}>
          Close
        </Button>
      </Form>
    </div>
  );
}

export default AddFundsPopup;
