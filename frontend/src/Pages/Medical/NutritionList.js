import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MedicalSidebar from '../../Components/Medicaldashboard/MedicalSidebar'; // Adjust the import path as necessary


const NutritionList = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients();
  }, []);

  useEffect(() => {
    setFilteredPatients(
      patients.filter(patient =>
        patient.Elder_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, patients]);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:3000/patient');
      setPatients(response.data.Pat);
      setFilteredPatients(response.data.Pat);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  return (
    <div className="flex">
      <MedicalSidebar />
      <div className="container mx-auto mt-10 ml-72">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Nutrition List</h2>
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 overflow-y-auto max-h-96">
          {filteredPatients.map((patient) => (
            <div key={patient._id} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <p className="text-lg font-semibold text-gray-800">{patient.Elder_name}</p>
              <p className="text-gray-600">Age: {patient.age}</p>
              <p className="text-gray-600">Date of Admit: {new Date(patient.datein).toLocaleDateString()}</p>
              <button 
                onClick={() => navigate(`/nutrition/${patient._id}`)} // Placeholder for future linking
                className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-700 mt-4 transition-colors duration-300"
              >
                Nutrition
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NutritionList;