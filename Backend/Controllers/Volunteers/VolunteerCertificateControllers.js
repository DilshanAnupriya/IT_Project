const { get } = require('mongoose');
const Certificate = require("../../Model/Volunteers/VolunteerCertificateModels");

//display task 
const getDetails = async (req, res, next) => {
    let certificate;


    //get all task
    try {
        certificate = await Certificate.find();
    } catch (error) {
        console.log(error);
    }

    if (!certificate) {
        return res.status(404).json({ massage: "unable to display" });
    }
    return res.status(200).json({ certificate });
}

//add task

const CreateCertificate = async (req, res, next) => {
    const { title, v_name, issue_date, time_period } = rq.body

    let certificate;

    try {
        certificate = new Certificate({ title, v_name, issue_date, time_period });
        await certificate.save()
    } catch (error) {
        console.log(error);
    }

    if (!certificate) {
        return res.status(404).json({ massage: "unable to create" });
    }

    return res.status(200).json({ certificate });
}



// get by id

const getById = async (req, res, next) => {
    let id = req.params.id;
    let certificate;

    try {
        certificate = await Certificate.findById(id);
    } catch (error) {
        console.log(error);
    }

    if (!certificate) {
        return res.status(404).json({ massage: "unable to find" });
    }

    return res.status(200).json({ certificate });
}


// update details 
const UpdateDetails = async (req, res, next) => {
    let id = req.params.id;
    let certificate;
    const { title, v_name, issue_date, time_period } = rq.body

    try {
        certificate = await Certificate.findByIdAndUpdate(id, { title: title, v_name: v_name, issue_date: issue_date, time_period: time_period });
    } catch (error) {
        console.log(error);
    }
    if (!certificate) {
        return res.status(404).json({ massage: "unable to update" });
    }

    return res.status(200).json({ certificate });

}

// delete 

const DeleteDetails = async (req, res, next) => {
    let id = req.params.id;
    let certificate;

    try {
        certificate = await Certificate.findByIdAndDelete(id);
    } catch (error) {
        console.log(error);
    }
    if (!certificate) {
        return res.status(404).json({ massage: "unable to delete" });
    }

    return res.status(200).json({ certificate });

}

exports.getDetails = getDetails
exports.CreateCertificate = CreateCertificate
exports.getById = getById
exports.UpdateDetails = UpdateDetails
exports.DeleteDetails = DeleteDetails