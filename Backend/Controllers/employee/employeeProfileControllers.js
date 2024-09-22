const { get } = require('mongoose');
const Profile = require("../../Model/employee/employeeProfileModel");

//display task
const getAllProfile = async (req, res, next) => {
    let emp;

    //get all Profile
    try {
        emp = await Profile.find();
    } catch (error) {
        console.log(error);
    }

    //not found 
    if(!emp){
        return res.status(404).json({ massage: "unable to display" })
    }

    //display profile
    return res.status(200).json({ emp });
}


//add Profile
const createProfile = async (req, res, next) => {
    const {first_name, last_name, job_role, nic, email, qualifications, bank_details, joined_date} = req.body;

    let emp;

    //create Profile
    try {
        emp = new Profile({ first_name, last_name, job_role, nic, email, qualifications, bank_details, joined_date });
        await emp.save(); //profile or emp
    } catch (error) {
        console.log(error);
    }

    //not found 
    if(!emp){
        return res.status(404).json({ massage: "unable to Create" })
    }

    //create profile
    return res.status(200).json({ emp });
}


//get by id 
const getIdByProfile = async (req, res, next) => {
    let id = req.params.id;
    let emp;

    //get profile by id
    try {
        emp = await Profile.findById(id);
    } catch (error) {
        console.log(error);
    }

    //not found 
    if(!emp){
        return res.status(404).json({ massage: "unable to find" })
    }

    //find profile by id
    return res.status(200).json({ emp });
}


//update Profile
const updateProfile = async (req, res, next) => {
    let id = req.params.id;
    let emp;
    const {first_name, last_name, job_role, nic, email, qualifications, bank_details, joined_date} = req.body;

    //update Profile
    try {
        emp = await Profile.findByIdAndUpdate(id, 
            { first_name: first_name, last_name: last_name, job_role: job_role, nic: nic, email: email, qualifications: qualifications, bank_details: bank_details, joined_date: joined_date }
        );
        emp = await emp.save(); //profile or emp
    } catch (error) {
        console.log(error);
    }

    //not found 
    if(!emp){
        return res.status(404).json({ massage: "unable to update" })
    }

    //update profile
    return res.status(200).json({ emp });
}


//delete profile 
const deleteProfile = async (req, res, next) => {
    let id = req.params.id;
    let emp;

    //get profile by id
    try {
        emp = await Profile.findByIdAndDelete(id);
    } catch (error) {
        console.log(error);
    }

    //not found 
    if(!emp){
        return res.status(404).json({ massage: "unable to find" })
    }

    //find profile by id
    return res.status(200).json({ emp });
}

//export
exports.getAllProfile = getAllProfile
exports.createProfile = createProfile
exports.getIdByProfile = getIdByProfile
exports.updateProfile = updateProfile
exports.deleteProfile = deleteProfile