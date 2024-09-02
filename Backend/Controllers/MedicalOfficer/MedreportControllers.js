const { get } = require('mongoose');
const MReport = require("../../Model/MedicalOfficer/MedreportModel");

//data display
const getAllMedReports = async (req, res, next) => {

    let mrep;
    //Get All Reports

    try{
        mrep = await MReport.find ();
    } catch(err) {
        console.log(err);
    }
    //could not found
    if(!mrep){
        return res.status(404).json({message: "Report not found "});
    }
    //Display all reports
    return res.status(200).json({mrep});
}

//data insert
const addMedReports = async( req, res, next) =>{

    const {Elder_firstname,Elder_lastname,Age,Gender,Current_need,Summary} =req.body;

    let mrep;

    try{
        mrep = new MReport({Elder_firstname,Elder_lastname,Age,Gender,Current_need,Summary});
        await mrep.save();
    }catch(err){
        console.log(err);
    }
    //not found 
    if(!mrep){
        return res.status(404).json({ massage: "unable to find" })
    }

    //find report by id
    return res.status(200).json({ mrep });


}

//get report by id 
const getIdByMedReports = async (req, res, next) => {
    let id = req.params.id;
    let mrep;

    //get report by id
    try {
        mrep = await MReport.findById(id);
    } catch (err) {
        console.log(err);
    }

    //not found 
    if(!mrep){
        return res.status(404).json({ massage: "unable to find" })
    }

    //find report by id
    return res.status(200).json({ mrep });
}
//update Medical Reports
const updateMedicalReports = async (req, res, next) => {
    let id = req.params.id;
    let mrep;
    const {Elder_firstname,Elder_lastname,Age,Gender,Current_need,Summary} = req.body;

    //update reports
    try {
        mrep = await MReport.findByIdAndUpdate(id, 
            {Elder_firstname : Elder_firstname ,Elder_lastname :Elder_lastname ,Age :Age ,Gender:Gender ,Current_need :Current_need ,Summary :Summary }
        );
        mrep = await mrep.save(); //reports
    } catch (error) {
        console.log(error);
    }

    //not found 
    if(!mrep){
        return res.status(404).json({ massage: "unable to update" })
    }

    //update reports
    return res.status(200).json({ mrep });
}
//delete reports 
const deleteMedReports = async (req, res, next) => {
    let id = req.params.id;
    let mrep;

    //get report by id
    try {
        mrep = await MReport.findByIdAndDelete(id);
    } catch (error) {
        console.log(error);
    }

    //not found 
    if(!mrep){
        return res.status(404).json({ massage: "unable to find" })
    }

    //find report by id
    return res.status(200).json({ mrep });
}

exports.getAllMedReports = getAllMedReports
exports.addMedReports = addMedReports
exports.getIdByMedReports = getIdByMedReports
exports.updateMedicalReports = updateMedicalReports
exports.deleteMedReports = deleteMedReports