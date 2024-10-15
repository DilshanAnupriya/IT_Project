import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import styles from "../../../Pages/Naveen/Accounts/acc.module.css";

function AddExpenditurePopup({ reloadExpenditures, closePopup, expenditureData }) {
  const base_url = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

  // Form validation schema for expenditures
  const formSchema = z.object({
    expenditure_type: z.string().min(1, "Expenditure Type is required"),
    amount: z.string().min(1, "Amount is required").refine(
      (value) => !isNaN(parseFloat(value)), // Ensure it's a valid number
      { message: "Amount must be a valid number" }
    ),
    status: z.enum(["Allocate", "Not Allocate"], {
      required_error: "Status is required",
    }),
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
      expenditure_type: "",
      amount: "",
      status: "Allocate",
    },
  });

  // UseEffect to prefill form if editing an existing expenditure
  useEffect(() => {
    if (expenditureData) {
      setValue("expenditure_type", expenditureData.expenditure_type);
      setValue("amount", expenditureData.amount.toString());
      setValue("status", expenditureData.status);
    }
  }, [expenditureData, setValue]);

  // Submit handler
  const onSubmit = async (data) => {
    const { expenditure_type, amount, status } = data;

    const expenditurePayload = {
      expenditure_type,
      amount: parseFloat(amount),
      status,
    };

    console.log("Form submitted with data:", expenditurePayload);

    if (expenditureData) {
      await updateExpenditure(expenditurePayload);
    } else {
      await addExpenditure(expenditurePayload);
    }
  };

  // API call for adding an expenditure
  const addExpenditure = async (newExpenditureData) => {
    try {
      const res = await axios.post(`${base_url}/expenditure/add`, newExpenditureData);
      console.log("Add response:", res);
      if (res.status === 201) {
        reset();
        closePopup();
        reloadExpenditures();
      } else {
        throw new Error("Failed to add expenditure");
      }
    } catch (error) {
      console.error("Error adding expenditure:", error.response ? error.response.data : error.message);
      alert("Failed to add expenditure. Please try again.");
    }
  };

  // API call for updating an existing expenditure
  const updateExpenditure = async (updatedExpenditureData) => {
    try {
      const res = await axios.put(
        `${base_url}/expenditure/update/${expenditureData.id}`,
        updatedExpenditureData
      );
      console.log("Update response:", res);
      if (res.status === 200) {
        reset();
        closePopup();
        reloadExpenditures();
      } else {
        throw new Error("Failed to update expenditure");
      }
    } catch (error) {
      console.error("Error updating expenditure:", error.response ? error.response.data : error.message);
      alert("Failed to update expenditure. Please try again.");
    }
  };

  return (
    <div className={styles.popupContainer}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* Expenditure Type Field */}
        <Form.Group className="mb-3">
          <Form.Control
            {...register("expenditure_type")}
            type="text"
            placeholder="Enter Expenditure Type"
          />
          {errors.expenditure_type && (
            <span className={styles.errorValidation}>{errors.expenditure_type.message}</span>
          )}
        </Form.Group>

        {/* Amount Field */}
        <Form.Group className="mb-3">
          <Form.Control
            {...register("amount")}
            type="text"
            placeholder="Enter Amount"
          />
          {errors.amount && (
            <span className={styles.errorValidation}>{errors.amount.message}</span>
          )}
        </Form.Group>

        {/* Status Field - Styled Dropdown with Label */}
        <Form.Group className="mb-3">
          <Form.Label>Status </Form.Label>
          <Form.Select {...register("status")} defaultValue="Allocate" className={`${styles.dropdown} mt-2`}>
            <option value="Allocate">Allocate</option>
            <option value="Not Allocate">Not Allocate</option>
          </Form.Select>
          {errors.status && (
            <span className={styles.errorValidation}>{errors.status.message}</span>
          )}
        </Form.Group>

        {/* Submit and Cancel buttons */}
        <Button type="submit" variant="primary" disabled={isSubmitting} className={styles.addBtn}>
          {isSubmitting ? (expenditureData ? "Updating..." : "Adding...") : (expenditureData ? "Update" : "Add")}
        </Button>
        <Button variant="secondary" onClick={closePopup} className={styles.cancelBtn}>
          Close
        </Button>
      </Form>
    </div>
  );
}

export default AddExpenditurePopup;
