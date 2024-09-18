const Appointment = require("../../Model/Appointment/AppointmentModels");

const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const addAppointment = async (req, res) => {
    const appointment = new Appointment({
        name: req.body.name,
        gmail: req.body.gmail,
        phone: req.body.phone,
        description: req.body.description,
        appointmenttype: req.body.appointmenttype
    });

    try {
        const newAppointment = await appointment.save();
        res.status(201).json(newAppointment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const getById = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        res.json(appointment);
    } catch (err) {
        res.status(404).json({ message: "Appointment not found" });
    }
}

const update = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (req.body.name) {
            appointment.name = req.body.name;
        }
        if (req.body.gmail) {
            appointment.gmail = req.body.gmail;
        }
        if (req.body.phone) {
            appointment.phone = req.body.phone;
        }
        if (req.body.description) {
            appointment.description = req.body.description;
        }
        if (req.body.appointmenttype) {
            appointment.appointmenttype = req.body.appointmenttype;
        }
        const updatedAppt = await appointment.save();
        res.json(updatedAppt);
    } catch (err) {
        res.status(404).json({ message: "Appointment not found" });
    }
}

const deleteAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        await appointment.remove();
        res.json({ message: "Appointment deleted" });
    } catch (err) {
        res.status(404).json({ message: "Appointment not found" });
    }
}

module.exports = {
    getAllAppointments,
    addAppointment,
    getById,
    update,
    deleteAppointment
}
