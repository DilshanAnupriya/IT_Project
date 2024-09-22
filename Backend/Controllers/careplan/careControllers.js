const Careplan = require('../../Model/careplan/careModels');

const getAllCareplans = async (req, res) => {
  try {
    const careplans = await Careplan.find();
    res.status(200).json(careplans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const addCareplan = async (req, res) => {
  const careplan = new Careplan({
   elderName: req.body.elderName,
   personalCare: req.body.personalCare,
   medication: req.body.medication,
   meals: req.body.meals,
   companions: req.body.companions,
   description: req.body.description,

  });
  try {
    const newCareplan = await careplan.save();
    res.status(201).json(newCareplan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

const getById = async (req, res) => {
    try {
        const careplan = await Careplan.findById(req.params.id);
        res.status(200).json(careplan);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
    }

 const updateCareplan = async (req, res) => {
    try {
        const updatedCareplan = await Careplan.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedCareplan);
        
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const deleteCareplan = async (req, res) => {
    try {
        await Careplan.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Careplan deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

module.exports = {
    getAllCareplans,
    addCareplan,
    getById,
    updateCareplan,
    deleteCareplan
    } 
    //  3. Create a route file for careplan in the routes folder.