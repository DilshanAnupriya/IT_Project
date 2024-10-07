import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Dashboard from '../../Components/Dashboard/Dashboard';
import myLogo from '../../Assets/myLogo.png'; // Adjust the path based on your folder structure


const UserView = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/User/all');
                setUsers(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch users.');
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/User/${id}`);
            setUsers(users.filter(user => user._id !== id));
        } catch (err) {
            setError('Failed to delete user.');
        }
    };

    const handleUpdate = (id) => {
        navigate(`/updateuser/${id}`);
    };

    const handleAddUser = () => {
        navigate('/adduser');
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const generateReport = () => {
        const doc = new jsPDF();
        
        // Add title with styles
        doc.setFontSize(24);
        doc.setFont("Helvetica", "bold");
        doc.text('User Report', 14, 22);
        
        // Add a logo with adjusted dimensions
        const logoWidth = 30; // Adjusted width
        const logoHeight = 30; // Adjusted height
        doc.addImage(myLogo, 'PNG', 140, 10, logoWidth, logoHeight);
        
        // Add a horizontal line
        doc.setLineWidth(1);
        doc.setDrawColor(0, 51, 102); // Dark blue color
        doc.line(14, 40, 200, 40);
        
        // Define table styles and include dob and gender columns
        autoTable(doc, {
            head: [['Full Name', 'Email', 'Phone', 'Date of Birth', 'Gender']],
            body: users.map(user => [
                user.fullName, 
                user.gmail, 
                user.phoneNo, 
                user.dob,  // Include Date of Birth
                user.gender // Include Gender
            ]),
            startY: 50, // Start the table below the line
            headStyles: {
                fillColor: [0, 51, 102], // Dark blue for header
                textColor: [255, 255, 255], // White text color
                fontSize: 12,
                halign: 'center',
            },
            bodyStyles: {
                fillColor: [240, 240, 240], // Light gray for body
                textColor: [0, 0, 0], // Black text color
                fontSize: 10,
            },
            alternateRowStyles: {
                fillColor: [255, 255, 255], // White for alternate rows
            },
            margin: { top: 60 },
            theme: 'striped', // Optional striped theme
        });
        
        // Add footer
        doc.setFontSize(10);
        doc.setFont("Helvetica", "normal");
        doc.text("Generated on: " + new Date().toLocaleDateString(), 14, doc.autoTable.previous.finalY + 10);
        
        // Save the PDF
        doc.save('user_report.pdf');
        alert('Report generated successfully!');
    };
    
    const filteredUsers = users.filter(user =>
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.gmail.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="dashboard-container flex">
            {/* Sidebar */}
            <Dashboard />

            {/* Main Content */}
            <div className="main-content w-4/5 p-8 bg-gray-100">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">User List</h2>
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
                    </div>
                ) : error ? (
                    <p className="text-red-600 mb-4">{error}</p>
                ) : (
                    <>
                        <div className="flex justify-between items-center mb-6">
                        <button
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 ml-4"
                                onClick={handleAddUser}
                            >
                                Add User
                            </button>
                            <input
                                type="text"
                                placeholder="Search by name or email..."
                                value={searchTerm}
                                onChange={handleSearch}
                                className="border border-gray-300 rounded-lg px-4 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 ml-4"
                                onClick={generateReport}
                            >
                                Generate Report
                            </button>
                            
                        </div>

                        <div className="overflow-x-auto shadow-md rounded-lg">
                            <table className="min-w-full bg-white">
                                <thead className="bg-gray-100">
                                    <tr>
                                        
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Full Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Phone</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date of Birth</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Gender</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>


                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredUsers.map(user => (
                                        <tr key={user._id}>
                                        
                                            <td className="px-6 py-4 text-sm text-gray-900">{user.fullName}</td>
                                            <td className="px-6 py-4 text-sm text-gray-900">{user.gmail}</td>
                                            <td className="px-6 py-4 text-sm text-gray-900">{user.phoneNo}</td>
                                            <td className="px-6 py-4 text-sm text-gray-900">{user.dob}</td> {/* Add Date of Birth */}
                                            <td className="px-6 py-4 text-sm text-gray-900">{user.gender}</td> {/* Add Gender */}
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button
                                                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg mr-2 transition duration-300 ease-in-out transform hover:scale-105"
                                                    onClick={() => handleUpdate(user._id)}
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                                                    onClick={() => handleDelete(user._id)}
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

export default UserView;
