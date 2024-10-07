const Appointment = require("../../Model/Appointment/AppointmentModels");

const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const addAppointment = async (req, res) => {
    const appointment = new Appointment({
        name: req.body.name,
        gmail: req.body.gmail,
        phone: req.body.phone,
        description: req.body.description,
        appointmenttype: req.body.appointmenttype,
        date: req.body.date, // Added date here
    });

    try {
        const newAppointment = await appointment.save();
        res.status(201).json(newAppointment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getById = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        res.json(appointment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        // Update fields only if they are provided
        appointment.name = req.body.name || appointment.name;
        appointment.gmail = req.body.gmail || appointment.gmail;
        appointment.phone = req.body.phone || appointment.phone;
        appointment.description = req.body.description || appointment.description;
        appointment.appointmenttype = req.body.appointmenttype || appointment.appointmenttype;
        appointment.date = req.body.date || appointment.date; // Added date here

        const updatedAppointment = await appointment.save();
        res.json(updatedAppointment);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

const deleteAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        
        await Appointment.deleteOne({ _id: req.params.id });
        
        res.json({ message: "Appointment deleted" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

module.exports = {
    getAllAppointments,
    addAppointment,
    getById,
    updateAppointment,
    deleteAppointment,
};
