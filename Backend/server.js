
//password B03_07

const express = require("express");
const mongoose = require("mongoose");
const router = require("./Routes/Volunteers/VolunteerRoutes");
const task = require("./Routes/Volunteers/VolunteerTaskRouts");
const certificate = require("./Routes/Volunteers/VolunteerCertificateRoutes");
const schedule = require("./Routes/Volunteers/VolunteerScheduleRoutes");

//emp profile
const profile = require("./Routes/employee/employeeProfileRoutes");
const Availability = require("./Routes/employee/empAvailabilityRoutes");

//Med patient
const patient = require("./Routes/MedicalOfficer/PatientRoutes");


const app = express();
const cors = require("cors");


//Middleware
app.use(express.json());
app.use(cors());
app.use("/users", router);
app.use("/task", task);
app.use("/certificate", certificate);
app.use("/schedule", schedule);


//emp profile
app.use("/employees", profile);
app.use("/Availability", Availability);




//medpatient 
app.use("/patient", patient)

mongoose.connect("mongodb+srv://Admin:B03_07@cluster0.3giug.mongodb.net/")
    .then(() => console.log("Connected to Mongodb"))
    .then(() => {
        app.listen(3000);
    })
    .catch((err) => console.log((err)));