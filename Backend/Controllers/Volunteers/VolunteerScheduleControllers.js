const { get } = require("express");
const Schedule = require("../../Model/Volunteers/VolunteerScheduleModels");


//display

const DisplaySchedule = async (req, res, next) => {
    let schedule;

    try {
        schedule = await Schedule.find();
    } catch (error) {
        console.log(error);
    }

    if (!schedule) {
        return res.status(404).json({ massage: "unable to find" });
    }
    return res.status(200).json({ schedule });
};


//create

const CreateSchedule = async (req, res, next) => {
    let id = req.params.id
    const { event_name, S_time, E_time } = req.body;
    let schedule;

    try {
        schedule = new Schedule({ event_name, S_time, E_time });
        await schedule.save();
    } catch (error) {
        console.log(error);
    }

    if (!schedule) {
        return res.status(404).json({ massage: "unable to create" });
    }
    return res.status(200).json({ schedule });
};

//get by id
const GetId = async (req, res, next) => {
    let id = req.params.id;
    let schedule;

    try {
        schedule = await Schedule.findById(id);
    } catch (error) {
        console.log(error);
    }
    if (!schedule) {
        return res.status(404).json({ massage: "unable to find" });
    }
    return res.status(200).json({ schedule });
};


//update 
const UpdateSchedule = async (req, res, next) => {
    let id = req.params.id;
    const { event_name, S_time, E_time } = req.body;
    let schedule;

    try {
        schedule = await Schedule.findByIdAndUpdate(id, { event_name: event_name, S_time: S_time, E_time: E_time });
        await schedule.save();
    } catch (error) {
        console.log(error);
    }
    if (!schedule) {
        return res.status(404).json({ massage: "unable to update" });
    }
    return res.status(200).json({ schedule });
};

//delete
const DeleteSchedule = async (req, res, next) => {
    let id = req.params.id;
    let schedule;

    try {
        schedule = await Schedule.findByIdAndDelete(id);
    } catch (error) {
        console.log(error);
    }
    if (!schedule) {
        return res.status(404).json({ massage: "unable to delete" });
    }
    return res.status(200).json({ schedule });
};

exports.CreateSchedule = CreateSchedule
exports.DisplaySchedule = DisplaySchedule
exports.GetId = GetId
exports.UpdateSchedule = UpdateSchedule
exports.DeleteSchedule = DeleteSchedule