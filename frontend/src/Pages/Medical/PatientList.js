import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import MedicalSidebar from '../../Components/Medicaldashboard/MedicalSidebar'; // Adjust the import path as necessary

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

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
      setErrorMessage('Failed to fetch patient data. Please try again.');
    }
  };

  const deletePatient = async (id) => {
    const deleteConfirmation = window.confirm(`Are you sure you want to delete the patient with ID ${id}? This action cannot be undone.`);
    if (deleteConfirmation) {
      try {
        const response = await axios.delete(`http://localhost:3000/patient/delete/${id}`);
        console.log('Delete response:', response);
        fetchPatients(); // Refresh the list after deletion
      } catch (error) {
        console.error('Error deleting patient:', error.response ? error.response.data : error.message);
        setErrorMessage('Failed to delete patient. Please try again.');
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-patient/${id}`);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Patient List Details', 14, 16);
    doc.autoTable({
      startY: 20,
      head: [['Elder No', 'Name', 'Date Of Admit', 'Diseases', 'Room No', 'Age', 'Prescription']],
      body: filteredPatients.map((patient, index) => [
        index + 1,
        patient.Elder_name,
        new Date(patient.datein).toLocaleDateString(),
        patient.diagnosis,
        patient.roomnum,
        patient.age,
        patient.Prescription
      ]),
    });
    doc.save('patient_list_details.pdf');
  };

  return (
    <div className="flex">
      <MedicalSidebar />
      <div className="container mx-auto mt-10 ml-72"> {/* Adjust margin-left as necessary */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Admit Patient List</h2>
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border rounded px-4 py-2"
          />
        </div>

        {/* Display error message if there is one */}
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

        <button onClick={generatePDF} className="report-btn mb-4">📄 Generate Report</button>

        <div className="overflow-y-auto max-h-96"> {/* Add scrollable container */}
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
              <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Elder No</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Date Of Admit</th>
                <th className="py-3 px-6 text-left">Diseases</th>
                <th className="py-3 px-6 text-left">Room No</th>
                <th className="py-3 px-6 text-left">Age</th>
                <th className="py-3 px-6 text-left">Prescription</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {filteredPatients.map((patient, index) => (
                <tr key={patient._id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{index + 1}</td>
                  <td className="py-3 px-6 text-left">{patient.Elder_name}</td>
                  <td className="py-3 px-6 text-left">{new Date(patient.datein).toLocaleDateString()}</td>
                  <td className="py-3 px-6 text-left">{patient.diagnosis}</td>
                  <td className="py-3 px-6 text-left">{patient.roomnum}</td>
                  <td className="py-3 px-6 text-left">{patient.age}</td> {/* Age column */}
                  <td className="py-3 px-6 text-left">{patient.Prescription}</td> {/* Prescription column */}
                  <td className="py-3 px-6 flex space-x-2">
                    <button 
                      onClick={() => handleEdit(patient._id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => deletePatient(patient._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <button
            onClick={() => navigate('/addPatient')}
            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-700"
          >
            Add Patient
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientList;