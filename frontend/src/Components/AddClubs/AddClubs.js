import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import styles from "../../Pages/Css/Acconutcss/acc.module.css";

function AddClubPopup({ reloadClubs, closePopup, clubData }) {
  const base_url = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

  // Form validation schema for clubs
  const formSchema = z.object({
    name: z.string().min(1, "Club Name is required"),
    club_types: z.string().min(1, "Club Type is required"),
    event: z.string().min(1, "Event is required"),
    donations: z.string().min(1, "donations is required").refine(
      (value) => !isNaN(parseFloat(value)), // Ensure it's a valid number
      { message: "donations must be a valid number" }
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
      name: "",
      club_types: "",
      event: "",
      donations: "",
    },
  });

  // UseEffect to prefill form if editing an existing club
  useEffect(() => {
    if (clubData) {
      setValue("name", clubData.name);
      setValue("club_types", clubData.club_types);
      setValue("event", clubData.event);
      setValue("donations", clubData.donations.toString());
    }
  }, [clubData, setValue]);

  // Submit handler
  const onSubmit = async (data) => {
    const { name, club_types, event, donations } = data;

    const clubPayload = {
      name,
      club_types,
      event,
      donations: parseFloat(donations),
    };

    if (clubData) {
      await updateClub(clubPayload); // If editing, update the club
    } else {
      await addClub(clubPayload); // If adding, add a new club
    }
  };

  // API call for adding a club
  const addClub = async (newClubData) => {
    try {
      const res = await axios.post(`${base_url}/club/add`, newClubData);
      if (res.status === 201) {
        reset();
        closePopup(); // Close the popup after adding
        reloadClubs(); // Reload the clubs data
      } else {
        throw new Error("Failed to add club");
      }
    } catch (error) {
      console.error("Error adding club:", error);
      alert("Failed to add club. Please try again.");
    }
  };

  // API call for updating an existing club
  const updateClub = async (updatedClubData) => {
    try {
      const res = await axios.put(
        `${base_url}/club/update/${clubData.name}`, // API endpoint to update the club
        updatedClubData
      );
      if (res.status === 200) {
        reset();
        closePopup(); // Close the popup after updating
        reloadClubs(); // Reload the clubs data
      } else {
        throw new Error("Failed to update club");
      }
    } catch (error) {
      console.error("Error updating club:", error);
      alert("Failed to update club. Please try again.");
    }
  };

  return (
    <div className={styles.popupContainer}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* Club Name Field */}
        <Form.Group className="mb-3">
          <Form.Control
            {...register("name")}
            type="text"
            placeholder="Enter Club Name"
            disabled={!!clubData} // Disable editing the club name during an update
          />
          {errors.name && (
            <span className={styles.errorValidation}>{errors.name.message}</span>
          )}
        </Form.Group>

        {/* Club Type Field */}
        <Form.Group className="mb-3">
          <Form.Control
            {...register("club_types")}
            type="text"
            placeholder="Enter Club Type"
          />
          {errors.club_types && (
            <span className={styles.errorValidation}>{errors.club_types.message}</span>
          )}
        </Form.Group>

        {/* Event Field */}
        <Form.Group className="mb-3">
          <Form.Control
            {...register("event")}
            type="text"
            placeholder="Enter Event"
          />
          {errors.event && (
            <span className={styles.errorValidation}>{errors.event.message}</span>
          )}
        </Form.Group>

        {/* donations Field */}
        <Form.Group className="mb-3">
          <Form.Control
            {...register("donations")}
            type="text"
            placeholder="Enter donations Amount"
          />
          {errors.donations && (
            <span className={styles.errorValidation}>{errors.donations.message}</span>
          )}
        </Form.Group>

        {/* Submit and Cancel buttons */}
        <Button type="submit" variant="primary" disabled={isSubmitting} className={styles.addBtn}>
          {isSubmitting ? (clubData ? "Updating..." : "Adding...") : (clubData ? "Update" : "Add")}
        </Button>
        <Button variant="secondary" onClick={closePopup} className={styles.cancelBtn}>
          Close
        </Button>
      </Form>
    </div>
  );
}

export default AddClubPopup;
