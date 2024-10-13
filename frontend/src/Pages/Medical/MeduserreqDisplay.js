import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MedicalSidebar from '../../Components/Medicaldashboard/MedicalSidebar'; // Adjust the import path as necessary
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const MeduserreqDisplay = () => {
  const [reports, setReports] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:3000/medreport');
        setReports(response.data.mrep);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/medreport/delete/${id}`);
      setReports(reports.filter(report => report._id !== id));
    } catch (error) {
      console.error('Error deleting report:', error);
    }
  };

  const filteredReports = reports.filter(report =>
    report.Elder_firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.Elder_lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.Current_need.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Elder Care Requests', 20, 10);
    doc.autoTable({
      head: [['First Name', 'Last Name', 'Age', 'Gender', 'Current Need', 'Summary']],
      body: filteredReports.map(report => [
        report.Elder_firstname,
        report.Elder_lastname,
        report.Age,
        report.Gender,
        report.Current_need,
        report.Summary
      ]),
    });
    doc.save('elder_care_requests.pdf');
  };

  return (
    <div className="flex">
      <MedicalSidebar />
      <div className="container mx-auto mt-10 ml-72">
        <h1 className="text-2xl font-bold mb-4">Elder Care Requests</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">First Name</th>
              <th className="py-2 px-4 border-b">Last Name</th>
              <th className="py-2 px-4 border-b">Age</th>
              <th className="py-2 px-4 border-b">Gender</th>
              <th className="py-2 px-4 border-b">Current Need</th>
              <th className="py-2 px-4 border-b">Summary</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((report) => (
              <tr key={report._id}>
                <td className="py-2 px-4 border-b">{report.Elder_firstname}</td>
                <td className="py-2 px-4 border-b">{report.Elder_lastname}</td>
                <td className="py-2 px-4 border-b">{report.Age}</td>
                <td className="py-2 px-4 border-b">{report.Gender}</td>
                <td className="py-2 px-4 border-b">{report.Current_need}</td>
                <td className="py-2 px-4 border-b">{report.Summary}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-yellow-500 text-white py-1 px-2 rounded mr-2"
                    onClick={() => navigate(`/meduserreq/edit/${report._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white py-1 px-2 rounded"
                    onClick={() => handleDelete(report._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4">
          <button
            onClick={generatePDF}
            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-700"
          >
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeduserreqDisplay;