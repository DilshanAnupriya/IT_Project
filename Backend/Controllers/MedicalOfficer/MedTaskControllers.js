const { get } = require('mongoose');
const MTasksd = require("../../Model/MedicalOfficer/MedTaskModel");

//data display
const getAllMedTasks = async (req, res, next) => {

    let mtask;
    //Get all Tasks

    try{
        mtask = await MTasksd.find ();
    } catch(err) {
        console.log(err);
    }
    //could not found
    if(!mtask){
        return res.status(404).json({message: "Task not found "});
    }
    //Display all Tasks
    return res.status(200).json({mtask});
}

//data insert
const addMedTasks = async( req, res, next) =>{

    const {Pat_number,Elder_pname,Treatments,Taskdate,Status} =req.body;

    let mtask;

    try{
        mtask = new MTasksd({Pat_number,Elder_pname,Treatments,Taskdate,Status});
        await mtask.save();
    }catch(err){
        console.log(err);
    }
    //not found 
    if(!mtask){
        return res.status(404).json({ massage: "unable to find" })
    }

    //find task by id
    return res.status(200).json({ mtask });


}

//get by id 
const getIdByMedTask = async (req, res, next) => {
    let id = req.params.id;
    let mtask;

    //get task by id
    try {
        mtask = await MTasksd.findById(id);
    } catch (err) {
        console.log(err);
    }

    //not found 
    if(!mtask){
        return res.status(404).json({ massage: "unable to find" })
    }

    //find task by id
    return res.status(200).json({ mtask });
}
//update Medical Tasks
const updateMedicalTasks = async (req, res, next) => {
    let id = req.params.id;
    let mtask;
    const {Pat_number,Elder_pname,Treatments,Taskdate,Status} = req.body;

    //update tasks
    try {
        mtask = await MTasksd.findByIdAndUpdate(id, 
            { Pat_number : Pat_number,Elder_pname :Elder_pname,Treatments :Treatments,Taskdate :Taskdate,Status :Status}
        );
        mtask = await mtask.save(); //tasks
    } catch (error) {
        console.log(error);
    }

    //not found 
    if(!mtask){
        return res.status(404).json({ massage: "unable to update" })
    }

    //update tasks
    return res.status(200).json({ mtask });
}
//delete tasks 
const deleteMedTasks = async (req, res, next) => {
    let id = req.params.id;
    let mtask;

    //get profile by id
    try {
        mtask = await MTasksd.findByIdAndDelete(id);
    } catch (error) {
        console.log(error);
    }

    //not found 
    if(!mtask){
        return res.status(404).json({ massage: "unable to find" })
    }

    //find profile by id
    return res.status(200).json({ mtask });
}

exports.getAllMedTasks = getAllMedTasks
exports.addMedTasks = addMedTasks
exports.getIdByMedTask = getIdByMedTask
exports.updateMedicalTasks = updateMedicalTasks
exports.deleteMedTasks = deleteMedTasks