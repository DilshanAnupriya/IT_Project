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
          <h2 className="text-2xl font-bold">Nutrition List</h2>
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border rounded px-4 py-2"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto max-h-96">
          {filteredPatients.map((patient) => (
            <div key={patient._id} className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-lg font-semibold">{patient.Elder_name}</p>
              <p className="text-gray-700">Age: {patient.age}</p>
              <p className="text-gray-700">Date of Admit: {new Date(patient.datein).toLocaleDateString()}</p>
              <button 
                onClick={() => navigate(`/nutrition/${patient._id}`)} // Placeholder for future linking
                className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-700 mt-4"
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