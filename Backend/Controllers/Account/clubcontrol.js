const Club = require("../../Model/Account/clubmodel"); // Adjust the path as necessary

// Get all clubs
const getClubs = async (req, res, next) => {
    try {
        const clubs = await Club.find();
        if (!clubs.length) {
            return res.status(404).json({ message: "No clubs found" });
        }
        return res.status(200).json({ clubs });
    } catch (error) {
        console.error("Error fetching clubs:", error);
        return res.status(500).json({ message: "Server error while fetching clubs" });
    }
};

// Create a new club
const createClub = async (req, res, next) => {
    const { name, club_types, event, donations } = req.body;

    try {
        const club = new Club({ name, club_types, event, donations });
        await club.save();
        return res.status(201).json({ newClub: club });
    } catch (error) {
        console.error("Error creating club:", error);
        return res.status(500).json({ message: "Unable to create club" });
    }
};

// Get club by name
const getClubByName = async (req, res, next) => {
    const name = req.params.name;

    try {
        const club = await Club.findOne({ name });
        if (!club) {
            return res.status(404).json({ message: "Club not found" });
        }
        return res.status(200).json({ club });
    } catch (error) {
        console.error("Error fetching club:", error);
        return res.status(500).json({ message: "Server error while fetching club" });
    }
};

// Update a club by name
const updateClub = async (req, res, next) => {
    const name = req.params.name;
    const { club_types, event, donations } = req.body;

    try {
        const club = await Club.findOneAndUpdate(
            { name },
            { club_types, event, donations },
            { new: true, runValidators: true }
        );
        if (!club) {
            return res.status(404).json({ message: "Unable to update club" });
        }
        return res.status(200).json({ club });
    } catch (error) {
        console.error("Error updating club:", error);
        return res.status(500).json({ message: "Server error while updating club" });
    }
};

// Delete a club by name
const deleteClub = async (req, res, next) => {
    const name = req.params.name;

    try {
        const club = await Club.findOneAndDelete({ name });
        if (!club) {
            return res.status(404).json({ message: "Unable to delete club" });
        }
        return res.status(200).json({ message: "Club deleted successfully" });
    } catch (error) {
        console.error("Error deleting club:", error);
        return res.status(500).json({ message: "Server error while deleting club" });
    }
};

module.exports = {
    getClubs,
    createClub,
    getClubByName,
    updateClub,
    deleteClub
};
