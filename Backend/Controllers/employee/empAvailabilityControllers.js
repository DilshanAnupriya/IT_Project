const { get } = require('mongoose');
const Availability = require("../../Model/employee/empAvailabilityModel");

//display task
const getAllAvailability = async (req, res, next) => {
    let avl;

    //get all Availability
    try {
        avl = await Availability.find();
    } catch (error) {
        console.log(error);
    }

    //not found 
    if(!avl){
        return res.status(404).json({ massage: "unable to display" })
    }

    //display Availability
    return res.status(200).json({ avl });
}


//add Availability
const createAvailability = async (req, res, next) => {
    const { emp_name, schedule_date, schedule_start_time, schedule_end_time } = req.body;

    let avl;

    //create Availability
    try {
        avl = new Availability({ emp_name, schedule_date, schedule_start_time, schedule_end_time });
        await avl.save();
    } catch (error) {
        console.log(error);
    }

    //not found 
    if(!avl){
        return res.status(404).json({ massage: "unable to Create" })
    }

    //create Availability
    return res.status(200).json({ avl });
}


//get by id 
const getIdByAvailability = async (req, res, next) => {
    let id = req.params.id;
    let avl;

    //get Availability by id
    try {
        avl = await Availability.findById(id);
    } catch (error) {
        console.log(error);
    }

    //not found 
    if(!avl){
        return res.status(404).json({ massage: "unable to find" })
    }

    //find Availability by id
    return res.status(200).json({ avl });
}


//update Availability
const updateAvailability = async (req, res, next) => {
    let id = req.params.id;
    let avl;
    const { emp_name, schedule_date, schedule_start_time, schedule_end_time } = req.body;

    //update Availability
    try {
        avl = await Availability.findByIdAndUpdate(id, 
            { emp_name: emp_name, schedule_date: schedule_date, schedule_start_time: schedule_start_time, schedule_end_time: schedule_end_time }
        );
        avl = await avl.save(); 
    } catch (error) {
        console.log(error);
    }

    //not found 
    if(!avl){
        return res.status(404).json({ massage: "unable to update" })
    }

    //update Availability
    return res.status(200).json({ avl });
}


//delete Availability 
const deleteAvailability = async (req, res, next) => {
    let id = req.params.id;
    let avl;

    //get Availability by id
    try {
        avl = await Availability.findByIdAndDelete(id);
    } catch (error) {
        console.log(error);
    }

    //not found 
    if(!avl){
        return res.status(404).json({ massage: "unable to find" })
    }

    //find Availability by id
    return res.status(200).json({ avl });
}

//export
exports.getAllAvailability = getAllAvailability
exports.createAvailability = createAvailability
exports.getIdByAvailability = getIdByAvailability
exports.updateAvailability = updateAvailability
exports.deleteAvailability = deleteAvailability