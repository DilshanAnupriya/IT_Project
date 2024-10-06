//password B03_07
//assign dependacy for variables
const express = require("express");     // get installed dependancy
const mongoose = require("mongoose");    // get installed dependncy
const bodyparser = require("body-parser");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

const router = require("./Routes/Volunteers/VolunteerRoutes");
const task = require("./Routes/Volunteers/VolunteerTaskRouts");
const certificate = require("./Routes/Volunteers/VolunteerCertificateRoutes");
const schedule = require("./Routes/Volunteers/VolunteerScheduleRoutes");
//const shedule = require("./Routes/mobility_support/shedules.js");
const shedule  = require ("./Routes/mobility_support/shedules");
//const validateShedule = require("./Validation/SheduleValidation");
const equipment = require ("./Routes/mobility_support/equipments");
const Requests = require ("./Routes/mobility_support/requests");

//Model\mobility_support\Shedule.js
//Routes\mobility_support\shedules.js
//Middleware
//app.use(express.json());
app.use(cors());
app.use(bodyparser.json());
app.use("/users", router);
app.use("/task", task);
app.use("/certificate", certificate);
app.use("/shedule",shedule );
app.use("/e",equipment);
app.use("/request",Requests);

//http://localhost:3000/shedule
//app.use("/validateShedule",validateShedule);

mongoose.connect("mongodb+srv://Admin:B03_07@cluster0.3giug.mongodb.net/")
    .then(() => console.log("Connected to Mongodb"))
    .then(() => {
        app.listen(3000);
    })
    .catch((err) => console.log((err)));