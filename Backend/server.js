
//password B03_07

const express = require("express");
const mongoose = require("mongoose");

const app = express();
const cors = require("cors");

//Middleware
app.use("/", (req, res, next) => {
    res.send("It is Working");
})

mongoose.connect("mongodb+srv://Admin:B03_07@cluster0.3giug.mongodb.net/")
    .then(() => console.log("Connected to Mongodb"))
    .then(() => {
        app.listen(3000);
    })
    .catch((err) => console.log((err)));