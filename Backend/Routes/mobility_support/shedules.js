const express = require('express');
const router = express.Router();
let Shedule = require('../../Model/mobility_support/Shedule');
const validateShedule = require('../../Validation/SheduleValidation'); // Import the validation middlewaare
//C:\Users\hirus\OneDrive\Documents\GitHub\IT_Project_mobility_support\Backend\Validation\SheduleValidation.js

// Add new schedule
// URL: http://localhost:3000/shedule/add
router.post('/add', (req, res) => {
    const {
        elderId,
        name,
        age,
        phone_number,
        email,
        NIC,
        current_status,
        current_physical_condition,
        previous_therapy,
        therapy_goal,
        date,
        preffered_time,
        frequency,
        location,
        therapist_preferencename
    } = req.body;
    
    // Validate the schedule data
   const validation = validateShedule({
        elderId,
        name,
        age,
        phone_number,
        email,
        NIC,
        current_status,
        current_physical_condition,
        previous_therapy,
        therapy_goal,
        date,
        preffered_time,
        frequency,
        location,
        therapist_preferencename
    });
  
    if (!validation.valid) {
        return res.status(400).json({ success: false, message: validation.message });
    }

    const newShedule = new Shedule({
        elderId,
        name,
        age,
        phone_number,
        email,
        NIC,
        current_status,
        current_physical_condition,
        previous_therapy,
        therapy_goal,
        date,
        preffered_time,
        frequency,
        location,
        therapist_preferencename
    });

    newShedule.save()
        .then(() => res.json({ success: true, message: "Schedule added successfully" }))
        .catch((err) => res.status(500).json({ success: false, message: err.message }));

 });

// Read all schedules
// URL: http://localhost:3000/shedule/
router.get('/', (req, res) => {
    Shedule.find()
        .then((schedules) => res.json(schedules))
        .catch((err) => res.status(500).json({ success: false, message: err.message }));
});

// Update schedule
// URL: http://localhost:3000/shedule/update/:id
router.route("/update/:id").put(async (req,res)=>{
    let userId = req.params.id;
    const{elderId,name,age,phone_number,email,NIC,current_status,current_physical_condition,previous_therapy,therapy_goal,date,preffered_time,frequency,location,therapist_preferencename} = req.body;
    

    const updateshedule ={
        elderId,
        name,
        age,
        phone_number,
        email,
        NIC,
        current_status,
        current_physical_condition,
        previous_therapy,
        therapy_goal,
        date,
        preffered_time,
        frequency,
        location,
        therapist_preferencename,

    }  // =(req,body)

  // Validate the schedule data
  /*  const validation = validateShedule(shedule);
    if (!validation.valid) {
        return res.status(400).json({ success: false, message: validation.message });
    }*/ 

   const update = await Shedule.findByIdAndUpdate(userId, updateshedule)
    .then(()=>{
        res.status(200).send({status: "User Update"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Eroor with updating data",error: err.message});
    })  

})


// Delete schedule
// URL: http://localhost:3000/shedule/delete/:id
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedShedule = await Shedule.findByIdAndDelete(id);
        if (!deletedShedule) {
            return res.status(404).json({ success: false, message: "Schedule not found" });
        }
        res.json({ success: true, message: "Schedule deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Fetch one schedule by ID
// URL: http://localhost:3000/shedule/get/:id
router.get('/get/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const shedule = await Shedule.findById(id);
        if (!shedule) {
            return res.status(404).json({ success: false, message: "Schedule not found" });
        }
        res.json({ success: true, shedule });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});


/*
// Backend route to get filtered schedules
app.get("/shedule", async (req, res) => {
    const { search } = req.query;
    let query = {};

    if (search) {
        // Add search criteria to the query (for MongoDB)
        query = {
            $or: [
                { name: { $regex: search, $options: "i" } }, // Case-insensitive search for name
                { elderId: { $regex: search, $options: "i" } }, // Search by ElderId
                { phone_number: { $regex: search, $options: "i" } } // Search by phone number
            ]
        };
    }

    try {
        const shedules = await Shedule.find(query);
        res.json(shedules);
    } catch (err) {
        res.status(500).json({ error: "Error fetching shedules" });
    }
});
*/




module.exports = router;

