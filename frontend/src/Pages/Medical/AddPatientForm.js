import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddPatientForm = () => {
  const [formData, setFormData] = useState({
    Elder_name: '',
    diagnosis: '',
    datein: '',
    roomnum: '',
    age: '',
    Prescription: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/patient/add", formData); // include formData in the request
      navigate('/patientList'); // Redirect after adding patient
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Add New Patient</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {/* Elder Name Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Elder Name:</label>
          <input 
            type="text"
            name="Elder_name"
            onChange={handleChange}
            value={formData.Elder_name}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        {/* Diagnosis Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Diagnosis:</label>
          <input 
            type="text"
            name="diagnosis"
            onChange={handleChange}
            value={formData.diagnosis}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        {/* Date of Admit Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Date of Admit:</label>
          <input 
            type="date"
            name="datein"
            onChange={handleChange}
            value={formData.datein}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        {/* Room No Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Room No:</label>
          <input 
            type="number"
            name="roomnum"
            onChange={handleChange}
            value={formData.roomnum}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        {/* Age Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Age:</label>
          <input 
            type="number"
            name="age"
            onChange={handleChange}
            value={formData.age}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        {/* Prescription Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Prescription:</label>
          <input 
            type="text"
            name="Prescription"
            onChange={handleChange}
            value={formData.Prescription}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between">
          <button 
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Patient
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPatientForm;
