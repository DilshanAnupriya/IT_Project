const express = require("express");
const club = express.Router();

// Import the club controller
const Clubs = require('../../Controllers/Account/clubcontrol'); // Adjust the path as necessary

// Routes for club operations
club.get("/", Clubs.getClubs);                    // Get all clubs
club.post("/add", Clubs.createClub);              // Create a new club
club.get("/:name", Clubs.getClubByName);          // Get club by name
club.put("/update/:name", Clubs.updateClub);      // Update a club by name
club.delete("/delete/:name", Clubs.deleteClub);   // Delete a club by name

module.exports = club;
