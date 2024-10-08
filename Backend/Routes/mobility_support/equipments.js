const express = require('express');
const router = express.Router();
let equipment = require('../../Model/mobility_support/equipment');
//const validateShedule = require('../../Validation/SheduleValidation'); // Import the validation middlewaare
//C:\Users\hirus\OneDrive\Documents\GitHub\IT_Project_mobility_support\Backend\Validation\SheduleValidation.js
 
// Add new equipments
// URL: http://localhost:3000/e/add
router.post('/add', (req, res) => {
    const {
        name, 
        discription,
        category ,
        condition ,
        model_number,
    } = req.body;


    const newequipment = new equipment({
        name, 
        discription,
        category ,
        condition ,
        model_number,
    });

    newequipment.save()
        .then(() => res.json({ success: true, message: "Equipment added successfully" }))
        .catch((err) => res.status(500).json({ success: false, message: err.message }));
});

// Read all equipments
// URL: http://localhost:3000/e/
router.get('/', (req, res) => {
    equipment.find()
        .then((equipments) => res.json(equipments))
        .catch((err) => res.status(500).json({ success: false, message: err.message }));
});



// Update equipment
// URL: http://localhost:3000/e/update/:id
router.put('/update/:id', async (req, res) => {
    let userId = req.params.id;
    const { name,discription,category,condition,model_number}= req.body; 

    const updatedRequest = {
        name, 
        discription,
        category ,
        condition ,
        model_number,
    };

    try {
        await equipment.findByIdAndUpdate(userId, updatedRequest);
        res.status(200).json({ success: true, message: "Request updated successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Error updating request", error: err.message });
    }
});



// Delete equipments
// URL: http://localhost:3000/e/delete/:id
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deleteequipments = await equipment.findByIdAndDelete(id);
        if (!deleteequipments) {
            return res.status(404).json({ success: false, message: "Equipment not found" });
        }
        res.json({ success: true, message: "Equipment deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Fetch one schedule by ID
// URL: http://localhost:3000/e/get/:id
// Ensure the Equipment model is imported correctly
//const Equipment = require('../models/Equipment'); // Adjust the path as needed

router.get('/get/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const Equipment = await equipment.findById(id);
        if (!Equipment) {
            return res.status(404).json({ success: false, message: "Equipment not found" });
        }
        res.json({ success: true, Equipment });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});


module.exports = router;

