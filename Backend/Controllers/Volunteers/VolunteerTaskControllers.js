const { get } = require('mongoose');
const Task = require("../../Model/Volunteers/VolunteerTaskModels");

//display task

const getAllTask = async (req, res, next) => {
    let task;

    //get all task
    try {
        task = await Task.find();
    } catch (error) {
        console.log(error);
    }

    //not found
    if (!task) {
        return res.status(404).json({ massage: "unable to find" })
    }

    //display task

    return res.status(200).json({ task });
};
//add task
const CreateTask = async (req, res, next) => {
    const { task_name, description, location, duration, special_instruction, assign_to } = req.body;

    let task;

    try {
        task = new Task({ task_name, description, location, duration, special_instruction, assign_to });
        await task.save();
    } catch (error) {
        console.log(error);
    }

    if (!task) {
        return res.status(404).json({ massage: "unable to create" });
    }
    return res.status(200).json({ task });
};

//get by id
const getByIId = async (req, res, next) => {
    let id = req.params.id;
    let task;

    try {
        task = await Task.findById(id);
    } catch (error) {
        console.log(error);
    }

    if (!task) {
        return res.status(404).json({ massage: "unable to find" });
    }
    return res.status(200).json({ task });
};

//update task
const UpdateTask = async (req, res, next) => {
    let id = req.params.id;
    let task;
    const { task_name, description, location, duration, special_instruction, assign_to } = req.body;

    try {
        task = await Task.findByIdAndUpdate(id,
            { task_name: task_name, description: description, location: location, duration: duration, special_instruction: special_instruction, assign_to: assign_to }
        );
        task = await task.save();
    } catch (error) {
        console.log(error);
    }

    if (!task) {
        return res.status(404).json({ massage: "unable to update" });
    }
    return res.status(200).json({ task });
};

//delete task
const DeleteTask = async (req, res, next) => {
    let id = req.params.id;
    let task;

    try {
        task = await Task.findByIdAndDelete(id);
    } catch (error) {
        console.log(error);
    }

    if (!task) {
        return res.status(404).json({ massage: "unable to delete" });
    }
    return res.status(200).json({ task });
};

//export
exports.getAllTask = getAllTask
exports.CreateTask = CreateTask
exports.getByIId = getByIId
exports.UpdateTask = UpdateTask
exports.DeleteTask = DeleteTask