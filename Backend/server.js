// server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import the routes
const volunteerRoutes = require("./Routes/Volunteers/VolunteerRoutes");
const volunteerTaskRoutes = require("./Routes/Volunteers/VolunteerTaskRouts");
const appointmentRoutes = require("./Routes/Appointment/AppointmentRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Define the routes
app.use("/users", volunteerRoutes);         // Volunteer routes
app.use("/task", volunteerTaskRoutes);      // Volunteer task routes
app.use("/appointments", appointmentRoutes); // Appointment routes (corrected path here)

// Connect to MongoDB
mongoose.connect("mongodb+srv://Admin:B03_07@cluster0.3giug.mongodb.net/")
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });
