
//password B03_07

const express = require("express");
const mongoose = require("mongoose");
const router = require("./Routes/Volunteers/VolunteerRoutes");
const task = require("./Routes/Volunteers/VolunteerTaskRouts");


 //emp profile
const profile = require("./Routes/employee/employeeProfileRoutes");


const app = express();
const cors = require("cors");


//Middleware
app.use(express.json());
app.use(cors());
app.use("/users", router);
app.use("/task", task);


//emp profile
app.use("/employees", profile);

mongoose.connect("mongodb+srv://Admin:B03_07@cluster0.3giug.mongodb.net/")
    .then(() => console.log("Connected to Mongodb"))
    .then(() => {
        app.listen(3000);
    })
    .catch((err) => console.log((err)));