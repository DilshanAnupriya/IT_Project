const { get } = require('mongoose');
const Requests = require("../../Model/employee/empRequestModel");

//display task
const getAllRequests = async (req, res, next) => {
    let requ;

    //get all Requests
    try {
        requ = await Requests.find();
    } catch (error) {
        console.log(error);
    }

    //not found 
    if(!requ){
        return res.status(404).json({ massage: "unable to display" })
    }

    //display Requests
    return res.status(200).json({ requ });
}


//add Requests
const createRequests = async (req, res, next) => {
    const {name, email, Phone_no, gender, address, edu_qualifications, experience, years_experience, computer_performance, english_level, description} = req.body;

    let requ;

    //create Requests
    try {
        requ = new Requests({ name, email, Phone_no, gender, address, edu_qualifications, experience, years_experience, computer_performance, english_level, description });
        await requ.save(); 
    } catch (error) {
        console.log(error);
    }

    //not found 
    if(!requ){
        return res.status(404).json({ massage: "unable to Create" })
    }

    //create Requests
    return res.status(200).json({ requ });
}


//get by id 
const getIdByRequests = async (req, res, next) => {
    let id = req.params.id;
    let requ;

    //get Requests by id
    try {
        requ = await Requests.findById(id);
    } catch (error) {
        console.log(error);
    }

    //not found 
    if(!requ){
        return res.status(404).json({ massage: "unable to find" })
    }

    //find Requests by id
    return res.status(200).json({ requ });
}


//update Requests
const updateRequests = async (req, res, next) => {
    let id = req.params.id;
    let requ;
    const {name, email, Phone_no, gender, address, edu_qualifications, experience, years_experience, computer_performance, english_level, description} = req.body;

    //update Requests
    try {
        requ = await Requests.findByIdAndUpdate(id, 
            { name: name, email: email, Phone_no: Phone_no, gender: gender, address: address, edu_qualifications: edu_qualifications, experience: experience, years_experience: years_experience, computer_performance: computer_performance, english_level: english_level, description: description }
        );
        requ = await requ.save(); 
    } catch (error) {
        console.log(error);
    }

    //not found 
    if(!requ){
        return res.status(404).json({ massage: "unable to update" })
    }

    //update Requests
    return res.status(200).json({ requ });
}


//delete Requests
const deleteRequests = async (req, res, next) => {
    let id = req.params.id;
    let requ;

    //get Requests by id
    try {
        requ = await Requests.findByIdAndDelete(id);
    } catch (error) {
        console.log(error);
    }

    //not found 
    if(!requ){
        return res.status(404).json({ massage: "unable to find" })
    }

    //find Requests by id
    return res.status(200).json({ requ });
}

//export
exports.getAllRequests = getAllRequests
exports.createRequests = createRequests
exports.getIdByRequests = getIdByRequests
exports.updateRequests = updateRequests
exports.deleteRequests = deleteRequests