const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Ensure you require cors

const app = express(); 

const reviewRoute = require('./Routes/reviews.route.js');
const complaintRoute = require('./Routes/complaints.route.js');


app.use(cors());
app.use(express.json()); 

app.use('/api/review', reviewRoute);
app.use('/api/complaint', complaintRoute);

mongoose.connect("mongodb+srv://root:root@test.fesduce.mongodb.net/?retryWrites=true&w=majority&appName=test")
    .then(() => console.log("Connected to MongoDB"))
    .then(() => {
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    })
    .catch((err) => console.log(err));
