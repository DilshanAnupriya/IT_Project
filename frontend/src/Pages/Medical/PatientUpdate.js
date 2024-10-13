import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const PatientUpdate = () => {
  const [formData, setFormData] = useState({
    Elder_name: '',
    diagnosis: '',
    datein: '',
    roomnum: '',
    age: '',
    Prescription: '',
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/patient/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    fetchPatientData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/patient/update/${id}`, formData);
      navigate('/patientList');
    } catch (error) {
      console.error('Error updating patient:', error);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Update Patient</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {/* Elder Name Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Elder Name:</label>
          <input 
            type="text"
            name="Elder_name"
            value={formData.Elder_name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {/* Diagnosis Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Diagnosis:</label>
          <input 
            type="text"
            name="diagnosis"
            value={formData.diagnosis}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {/* Date In Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Date In:</label>
          <input 
            type="date"
            name="datein"
            value={formData.datein}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {/* Room Number Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Room Number:</label>
          <input 
            type="text"
            name="roomnum"
            value={formData.roomnum}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {/* Age Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Age:</label>
          <input 
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {/* Prescription Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Prescription:</label>
          <input 
            type="text"
            name="Prescription"
            value={formData.Prescription}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button 
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Patient
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientUpdate;