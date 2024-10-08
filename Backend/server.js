// server.js

const express = require("express");
const mongoose = require("mongoose");


// Import the routes
const volunteerRoutes = require("./Routes/Volunteers/VolunteerRoutes");
const volunteerTaskRoutes = require("./Routes/Volunteers/VolunteerTaskRouts");
const appointmentRoutes = require("./Routes/Appointment/AppointmentRoutes");

const router = require("./Routes/Volunteers/VolunteerRoutes");
const task = require("./Routes/Volunteers/VolunteerTaskRouts");
const certificate = require("./Routes/Volunteers/VolunteerCertificateRoutes");
const schedule = require("./Routes/Volunteers/VolunteerScheduleRoutes");


//emp profile
const profile = require("./Routes/employee/employeeProfileRoutes");
const Availability = require("./Routes/employee/empAvailabilityRoutes");
const Requests = require("./Routes/employee/empRequestRoutes");

//Med patient
const patient = require("./Routes/MedicalOfficer/PatientRoutes");
const medtask = require("./Routes/MedicalOfficer/MedTaskRoutes");
const medreport = require("./Routes/MedicalOfficer/MedreportRoutes");
const Breakfast = require("./Routes/MedicalOfficer/BreakfastRoute");
const Lunch = require("./Routes/MedicalOfficer/LunchRoute");
const Dinner = require("./Routes/MedicalOfficer/DinnerRoute");





const app = express();
//careplan
const care = require("./Routes/careplan/careRoutes");

const user = require("./Routes/user/userRoutes");
const cors = require("cors");




//account
const fun = require("./Routes/Account/fundRoutes");
const sal = require("./Routes/Account/salaryRoutes");
const account = require("./Routes/Account/accountRoute")




// Middleware
app.use(express.json());
app.use(cors());


app.use("/users", router);
app.use("/task", task);
app.use("/certificate", certificate);
app.use("/schedule", schedule);


//emp profile
app.use("/employees", profile);
app.use("/Availability", Availability);
app.use("/requests", Requests);




//medpatient 
app.use("/patient", patient);
app.use("/medtask", medtask);
app.use("/medreport", medreport);

app.use("/Breakfast", Breakfast);
app.use("/Lunch", Lunch);
app.use("/Dinner", Dinner);

//Accounts
app.use("/account", account);


//careplan
app.use("/careplan", care);
app.use("/appointments", appointmentRoutes); // Appointment routes (corrected path here)
app.use("/User", user);
//accounts
app.use("/funds", fun);
app.use("/salary", sal);



// Define the routes

// Volunteer task routes

// Connect to MongoDB
mongoose.connect("mongodb+srv://Admin:B03_07@cluster0.3giug.mongodb.net/")
    .then(() => console.log("Connected to Mongodb"))
    .then(() => {
        app.listen(3000);
    })
    .catch((err) => console.log((err)));


