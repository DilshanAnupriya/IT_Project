const express = require('express');
const router = express.Router();
let Requests = require('../../Model/mobility_support/request');
const validateRequest = require('../../Validation/RequestValidation');
 
// Add request
// URL: http://localhost:3000/request/add
router.post('/add', (req, res) => {
    const { elderId, requests } = req.body;

    // Validate the request data
    const validationErrors = validateRequest({ elderId, requests });

    if (validationErrors.length > 0) {
        // If validation errors exist, return a 400 response with the errors
        return res.status(400).json({
            success: false,
            message: "Validation errors",
            errors: validationErrors
        });
    }

    // If validation passed, proceed with saving the request
    const newRequest = new Requests({
        elderId,
        requests,
    });

    newRequest.save()
        .then(() => res.json({ success: true, message: "Request added successfully" }))
        .catch((err) => res.status(500).json({ success: false, message: err.message }));
});

// Read all requests
// URL: http://localhost:3000/request/
router.get('/', (req, res) => {
    Requests.find()
        .then((requests) => res.json(requests))
        .catch((err) => res.status(500).json({ success: false, message: err.message }));
});

// Update request
// URL: http://localhost:3000/request/update/:id
router.put('/update/:id', async (req, res) => {
    let userId = req.params.id;
    const { elderId, requests } = req.body;

    // Validate the request data
    const validationErrors = validateRequest({ elderId, requests });

    if (validationErrors.length > 0) {
        return res.status(400).json({
            success: false,
            message: "Validation errors",
            errors: validationErrors
        });
    }

    const updatedRequest = {
        elderId,
        requests,
    };

    try {
        await Requests.findByIdAndUpdate(userId, updatedRequest);
        res.status(200).json({ success: true, message: "Request updated successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Error updating request", error: err.message });
    }
});

// Delete request
// URL: http://localhost:3000/request/delete/:id
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedRequest = await Requests.findByIdAndDelete(id);
        if (!deletedRequest) {
            return res.status(404).json({ success: false, message: "Request not found" });
        }
        res.json({ success: true, message: "Request deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Fetch one request by ID
// URL: http://localhost:3000/request/get/:id
router.get('/get/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const request = await Requests.findById(id);
        if (!request) {
            return res.status(404).json({ success: false, message: "Request not found" });
        }
        res.json({ success: true, request });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
