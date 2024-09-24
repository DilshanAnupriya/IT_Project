const { get } = require('mongoose');
const Volunteer = require("../../Model/Volunteers/VolunteerModels");


//Display details

const getAllVolunteers = async (req, res, next) => {
    let Volunteers;

    //get all users
    try {
        Volunteers = await Volunteer.find(); //**
    } catch (error) {
        console.log(error);
    }
    //not found
    if (!Volunteers) {
        return res.status(404).json({ massage: "Volunteers not found" })
    }

    //display all users
    return res.status(200).json({ Volunteers });
};

//Data insert

const CreateVolunteers = async (req, res, next) => {


    const { first_name, last_name, date_of_birth, gender, email, duration, skills, type_of_work, experience, days, time, description, date, mobile, emobile, address } = req.body;

    let volunteers;

    try {
        volunteers = new Volunteer({ first_name, last_name, date_of_birth, gender, email, duration, skills, type_of_work, experience, days, time, description, date, mobile, emobile, address });
        await volunteers.save();
    } catch (error) {
        console.log(error)
    }

    //not insert users
    if (!volunteers) {
        return res.status(404).json({ massage: "Unable to add Volunteers" })
    }
    return res.status(200).json({ volunteers });




};


//get by Id
const getByIId = async (req, res) => {
    const id = req.params.id;
    let volunteer;

    try {
        volunteer = await Volunteer.findById(id);
    } catch (error) {
        console.log(error)
    }

    if (!volunteer) {
        return res.status(404).json({ massage: "Volunteer not available" });
    }

    return res.status(200).json({ volunteer });
};


//Update 
const UpdateVolunteer = async (req, res, next) => {
    const id = req.params.id
    const { first_name, last_name, date_of_birth, gender, email, duration, skills, type_of_work, experience, days, time, description, date, mobile, emobile, address } = req.body;
    let volunteers;

    try {
        volunteers = await Volunteer.findByIdAndUpdate(id,
            { first_name: first_name, last_name: last_name, date_of_birth: date_of_birth, gender: gender, email: email, duration: duration, skills: skills, type_of_work: type_of_work, experience: experience, days: days, time: time, description: description, date: date, mobile: mobile, emobile: emobile, address: address });
        volunteers = await volunteers.save();
    } catch (error) {
        console.log(error);
    }

    if (!volunteers) {
        return res.status(404).json({ massage: "unable to update" });
    }
    return res.status(200).json({ volunteers });
};


//delete 
const DeleteVolunteer = async (req, res, next) => {
    const id = req.params.id;
    let volunteer;

    try {
        volunteer = await Volunteer.findByIdAndDelete(id);
    } catch (error) {
        console.log(error);
    }

    if (!volunteer) {
        return res.status(404).json({ massage: "unable to delete" })
    }

    return res.status(200).json({ volunteer });
};

exports.getAllVolunteers = getAllVolunteers;
exports.CreateVolunteers = CreateVolunteers;
exports.getByIId = getByIId;
exports.UpdateVolunteer = UpdateVolunteer;
exports.DeleteVolunteer = DeleteVolunteer;
