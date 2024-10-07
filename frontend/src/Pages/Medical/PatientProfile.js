import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import MedicalSidebar from '../../Components/Medicaldashboard/MedicalSidebar'; // Adjust the import path as necessary

const PatientProfile = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatient();
  }, []);

  const fetchPatient = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/patient/${id}`);
      setPatient(response.data);
    } catch (error) {
      console.error('Error fetching patient:', error);
    }
  };

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <MedicalSidebar />
      <div className="container mx-auto mt-10 ml-72">
        <h2 className="text-3xl font-bold mb-6">Patient Profile</h2>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Personal Information</h3>
            <p className="text-gray-700"><strong>Name:</strong> {patient.Elder_name}</p>
            <p className="text-gray-700"><strong>Date of Admit:</strong> {new Date(patient.datein).toLocaleDateString()}</p>
            <p className="text-gray-700"><strong>Diseases:</strong> {patient.diagnosis}</p>
            <p className="text-gray-700"><strong>Room No:</strong> {patient.roomnum}</p>
            <p className="text-gray-700"><strong>Age:</strong> {patient.age}</p>
            <p className="text-gray-700"><strong>Prescription:</strong> {patient.Prescription}</p>
          </div>
          <button
            onClick={() => navigate('/nutrition')}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-700 mt-4"
          >
            Nutrition
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;