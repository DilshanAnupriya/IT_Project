import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Dashboard from '../../Components/MDash/MD';
import myLogo from '../../Assets/logo.png';

const ViewAppointment = () => {
    const [appointments, setAppointments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get('http://localhost:3000/appointments/getAppAll');
                setAppointments(response.data);
                setLoading(false);
            } catch (error) {
                setErrorMessage('Failed to fetch appointments. Please try again.');
                setLoading(false);
            }
        };
        fetchAppointments();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/appointments/${id}`);
            setAppointments(appointments.filter((appointment) => appointment._id !== id));
        } catch (error) {
            setErrorMessage('Failed to delete appointment. Please try again.');
        }
    };

    const generateReport = () => {
        const doc = new jsPDF();

        // Add title with styles
        doc.setFontSize(18); // Reduced font size
        doc.setFont("Helvetica", "bold");
        doc.text('User Report', 14, 22);

        // Add a logo with adjusted dimensions
        const logoWidth = 30; // Adjusted width
        const logoHeight = 30; // Adjusted height
        doc.addImage(myLogo, 'PNG', 140, 10, logoWidth, logoHeight);

        // Add a horizontal line with left margin
        const lineLeftMargin = 15; // Left margin for the line
        doc.setLineWidth(0.5); // Reduced line width
        doc.setDrawColor(0, 51, 102); // Dark blue color
        doc.line(lineLeftMargin, 40, 200, 40); // Adjusted X starting position for the line

        // Add table
        autoTable(doc, {
            head: [['Name', 'Email', 'Phone', 'Description', 'Type', 'Date']],
            body: appointments.map(app => [
                app.name, app.gmail, app.phone, app.description, app.appointmenttype, app.date
            ]),
            startY: 45, // Start after the title and line
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
        doc.text("Generated on: " + formattedDate, 14, footerY);

        // Save the PDF
        doc.save("appointments_report.pdf");
        alert("Report generated successfully!");
    };


    const filteredAppointments = appointments.filter(appointment =>
        appointment.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="dashboard-container flex">
            {/* Sidebar */}
            <Dashboard />

            {/* Main Content */}
            <div className="main-content w-4/5 p-8 bg-gray-100 ml-[270px]">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Appointments</h2>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
                    </div>
                ) : errorMessage ? (
                    <p className="text-red-600 mb-4">{errorMessage}</p>
                ) : (
                    <>
                        <div className="flex justify-between items-center mb-6">

                            <Link to="/AddU">
                                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 ml-4">
                                    Add Appointment
                                </button>
                            </Link>


                            <input
                                type="text"
                                placeholder="Search by Name"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="border border-gray-300 rounded-lg px-4 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />



                            <button
                                onClick={generateReport}
                                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 ml-4"
                            >
                                Generate Report
                            </button>
                        </div>

                        <div className="overflow-x-auto shadow-md rounded-lg">
                            <table className="min-w-full bg-white">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Phone</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Description</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Type</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredAppointments.map(appointment => (
                                        <tr key={appointment._id}>
                                            <td className="px-6 py-4 whitespace-normal break-words text-sm text-gray-900">{appointment.name}</td>
                                            <td className="px-6 py-4 whitespace-normal break-words text-sm text-gray-900">{appointment.gmail}</td>
                                            <td className="px-6 py-4 whitespace-normal break-words text-sm text-gray-900">{appointment.phone}</td>
                                            <td className="px-6 py-4 whitespace-normal break-words text-sm text-gray-900">{appointment.description}</td>
                                            <td className="px-6 py-4 whitespace-normal break-words text-sm text-gray-900">{appointment.appointmenttype}</td>
                                            <td className="px-6 py-4 whitespace-normal break-words text-sm text-gray-900">
                                                {new Date(appointment.date).getFullYear()}/{(new Date(appointment.date).getMonth() + 1).toString().padStart(2, '0')}/{new Date(appointment.date).getDate().toString().padStart(2, '0')}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <Link to={`/UpdateA/${appointment._id}`}>
                                                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg mr-2 transition duration-300 ease-in-out transform hover:scale-105">
                                                        Update
                                                    </button>
                                                </Link>
                                                <button
                                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                                                    onClick={() => handleDelete(appointment._id)}
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

export default ViewAppointment;