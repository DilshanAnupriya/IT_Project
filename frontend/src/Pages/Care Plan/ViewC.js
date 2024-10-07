///view careplan////

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Dashboard from '../../Components/MDash/MD'
import Logo from '../../Assets/logo.png'

const ViewCareplans = () => {
    const [careplans, setCareplans] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    // Fetch care plans from the backend
    useEffect(() => {
        const fetchCareplans = async () => {
            try {
                const response = await axios.get('http://localhost:3000/careplan');
                setCareplans(response.data);
                setLoading(false);
            } catch (error) {
                setErrorMessage('Failed to fetch care plans. Please try again.');
                setLoading(false);
            }
        };
        fetchCareplans();
    }, []);

    // Delete care plan by ID
    const deleteCareplan = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/careplan/${id}`);
            setCareplans(careplans.filter((careplan) => careplan._id !== id));
        } catch (error) {
            setErrorMessage('Failed to delete care plan. Please try again.');
        }
    };

    const generateReport = () => {
        const doc = new jsPDF();

        // Add title with styles
        doc.setFontSize(18); // Title font size
        doc.setFont("Helvetica", "bold");
        doc.text('Care Plans Report', 14, 22); // Title position

        // Add a logo with adjusted dimensions
        const logoWidth = 30; // Adjusted width
        const logoHeight = 30; // Adjusted height
        doc.addImage(Logo, 'PNG', 140, 10, logoWidth, logoHeight); // Logo position

        // Add a horizontal line with left margin
        const lineLeftMargin = 15; // Left margin for the line
        doc.setLineWidth(0.5); // Reduced line width
        doc.setDrawColor(0, 51, 102); // Dark blue color
        doc.line(lineLeftMargin, 40, 200, 40); // Horizontal line position

        // Add table
        autoTable(doc, {
            head: [['Elder Name', 'Personal Care', 'Medication', 'Meals', 'Companions', 'Description']],
            body: careplans.map(careplan => [
                careplan.elderName,
                careplan.personalCare,
                careplan.medication,
                careplan.meals,
                careplan.companions,
                careplan.description
            ]),
            startY: 45, // Start position after title and line
        });

        // Add signature area with left margin
        const signatureY = doc.autoTable.previous.finalY + 10; // Position below the table
        const signatureLeftMargin = 15; // Left margin for the signature text
        doc.setFontSize(12); // Reduced font size for "Care Coordinator"
        doc.text("________________________", signatureLeftMargin, signatureY); // Signature line with margin
        doc.text("Care Coordinator", signatureLeftMargin, signatureY + 10); // Title below the signature line with margin

        // Add footer with correct date
        const footerY = signatureY + 20; // Position footer below signature area
        doc.setFontSize(10);
        doc.setFont("Helvetica", "normal");
        const formattedDate = new Date().toLocaleDateString(); // Correctly formatted date
        doc.text("Generated on: " + formattedDate, 14, footerY); // Footer position

        // Save the PDF
        doc.save("careplans_report.pdf"); // Save file
        alert("Report generated successfully!"); // Alert message
    };
    // Filter care plans based on search term
    const filteredCareplans = careplans.filter(careplan =>
        careplan.elderName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="dashboard-container flex">
            {/* Sidebar */}
            <Dashboard />

            {/* Main Content */}
            <div className="main-content w-4/5 p-8 bg-gray-100 ml-[270px] ">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Care Plans</h2>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
                    </div>
                ) : errorMessage ? (
                    <p className="text-red-600 mb-4">{errorMessage}</p>
                ) : (
                    <>
                        <div className="flex justify-between items-center mb-6">
                            <Link to="/AddC">
                                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                                    Add Care Plan
                                </button>
                            </Link>

                            <input
                                type="text"
                                placeholder="Search by Elder Name"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="border border-gray-300 rounded-lg px-4 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            <button
                                onClick={generateReport}
                                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                            >
                                Generate Report
                            </button>
                        </div>

                        <div className="overflow-x-auto shadow-md rounded-lg">
                            <table className="min-w-full bg-white">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Elder Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Personal Care</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Medication</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Meals</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Companions</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Description</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredCareplans.map((careplan) => (
                                        <tr key={careplan._id}>
                                            <td className="px-6 py-4 whitespace-normal break-words text-sm text-gray-900">{careplan.elderName}</td>
                                            <td className="px-6 py-4 whitespace-normal break-words text-sm text-gray-900">{careplan.personalCare}</td>
                                            <td className="px-6 py-4 whitespace-normal break-words text-sm text-gray-900">{careplan.medication}</td>
                                            <td className="px-6 py-4 whitespace-normal break-words text-sm text-gray-900">{careplan.meals}</td>
                                            <td className="px-6 py-4 whitespace-normal break-words text-sm text-gray-900">{careplan.companions}</td>
                                            <td className="px-6 py-4 whitespace-normal break-words text-sm text-gray-900">{careplan.description}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <Link to={`/UpC/${careplan._id}`}>
                                                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg mr-2 transition duration-300 ease-in-out transform hover:scale-105">
                                                        Update
                                                    </button>
                                                </Link>
                                                <button
                                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                                                    onClick={() => deleteCareplan(careplan._id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ViewCareplans;