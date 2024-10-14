import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import MedicalSidebar from '../../Components/Medicaldashboard/MedicalSidebar'; // Adjust the import path as necessary
import myLogo from '../../Assets/Medical/logo.png';


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
    

    doc.setFontSize(18); // Reduced font size
        doc.setFont("Helvetica", "bold");

        doc.text('Patient List Details', 14, 16);

                // Add a logo with adjusted dimensions
                const logoWidth = 10; // Adjusted width
                const logoHeight = 10; // Adjusted height
                const logoX = 186; // Adjusted x-coordinate to move the logo to the right
                const logoY = 10; // y-coordinate remains the same
                doc.addImage(myLogo, 'PNG', logoX, logoY, logoWidth, logoHeight);
        
    doc.autoTable({
      startY: 25,
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
    // Add signature area with left margin
    const signatureY = doc.autoTable.previous.finalY + 10; // Position below the table
    const signatureLeftMargin = 15; // Left margin for the signature text
    doc.setFontSize(8); // 
    doc.text("______________________", signatureLeftMargin, signatureY); // Signature line with margin
    doc.text("Medical Officer", signatureLeftMargin, signatureY + 10); // Title below the signature line with margin

    // Add footer with correct date
    const footerY = signatureY + 20; // Position footer below signature area
    doc.setFontSize(8);
    doc.setFont("Helvetica", "normal");
    const formattedDate = new Date().toLocaleDateString(); // Correctly formatted date
    doc.text("Generated on: " + formattedDate, 14, footerY);
    doc.save('patient_list_details.pdf');
  };

  return (
    <div className="flex">
      <MedicalSidebar />
      <div className="container mx-auto mt-10 ml-72 p-6 bg-gray-50 rounded-lg shadow-lg"> {/* Adjust margin-left as necessary */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Admit Patient List</h2>
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Display error message if there is one */}
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

        <button onClick={generatePDF} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mb-4">📄 Generate Report</button>

        <div className="overflow-y-auto max-h-96"> {/* Add scrollable container */}
          <table className="min-w-full bg-white border rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
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
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => deletePatient(patient._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
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
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            Add Patient
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientList;