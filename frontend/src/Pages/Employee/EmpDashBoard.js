import React, { useEffect, useState } from 'react';
import Dashboard from '../../Components/EmployeeDash/EmployeeDashboard';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import myLogo from '../../Assets/Employee/logo.png';


const URL = "http://localhost:3000/employees/";

const fetchHandler = async () => {
    const data = await axios.get(URL).then((res) => res.data);
    return data;
};

const deleteHandler = async (id) => {
    await axios.delete(`http://localhost:3000/employees/delete/${id}`);
};

function EmpDashBoard() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // State to track search input
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchHandler().then((data) => setUsers(data.emp));
    }, []);

    const handleDelete = (id, first_name) => {
        const deleteUser = window.confirm(`Are you sure you want to delete the employee ${first_name}?`);
        
        if (deleteUser) {
            deleteHandler(id).then(() => {
                setUsers(users.filter((user) => user._id !== id));
            }).catch(() => {
                setErrorMessage(`Failed to delete employee ${first_name}. Please try again.`);
            });
        }
    };

    // Count job roles (Care Givers, Doctors, Nurses, Nutritionists)
    const careGiversCount = users.filter(user => user.job_role.toLowerCase() === 'care giver').length;
    const doctorsCount = users.filter(user => user.job_role.toLowerCase() === 'doctor').length;
    const nursesCount = users.filter(user => user.job_role.toLowerCase() === 'nurse').length;
    const nutritionistsCount = users.filter(user => user.job_role.toLowerCase() === 'nutritionist').length;

    // Filter users based on search term (by first or last name)
    const filteredUsers = users.filter((user) =>
        (user.first_name && user.first_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (user.last_name && user.last_name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Generate PDF report
    const generatePDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.setFont("Helvetica", "bold");
        doc.text("Employee Report", 14, 16);


        // Add a logo with adjusted dimensions
        const logoWidth = 10; // Adjusted width
        const logoHeight = 10; // Adjusted height
        const logoX = 186; // Adjusted x-coordinate to move the logo to the right
        const logoY = 10; // y-coordinate remains the same
        doc.addImage(myLogo, 'PNG', logoX, logoY, logoWidth, logoHeight);

        doc.autoTable({
            startY: 20,
            head: [['First Name', 'Last Name', 'Job Role', 'NIC', 'Email', 'Qualifications', 'Join Date']],
            body: filteredUsers.map(user => [
                user.first_name,
                user.last_name,
                user.job_role,
                user.nic,
                user.email,
                user.qualifications,
                new Date(user.joined_date).toLocaleDateString()
            ]),
        });

        const signatureY = doc.autoTable.previous.finalY + 10; // Position below the table
        const signatureLeftMargin = 15; // Left margin for the signature text
        doc.setFontSize(8); // 
        doc.text("______________________", signatureLeftMargin, signatureY); // Signature line with margin
        doc.text("Staff Cordinator", signatureLeftMargin, signatureY + 10); // Title below the signature line with margin

        // Add footer with correct date
        const footerY = signatureY + 20; // Position footer below signature area
        doc.setFontSize(8);
        doc.setFont("Helvetica", "normal");
        const formattedDate = new Date().toLocaleDateString(); // Correctly formatted date
        doc.text("Generated on: " + formattedDate, 14, footerY);
        doc.save("employee_report.pdf");
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <Dashboard className="w-1/4" />

            {/* Main Content */}
            <div className="container mx-auto mt-10 ml-56">
                <h2 className="text-3xl font-bold mb-6 ml-16">Employee Dashboard</h2>
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <section className="grid grid-cols-2 md:grid-cols-4 mb-8 ml-32">
                        <div className="bg-blue-500 text-white p-2 rounded-lg text-center w-24 h-24 flex flex-col justify-center items-center">
                            <h2 className="text-sm font-bold">Care Givers</h2>
                            <p>{careGiversCount}</p>
                        </div>
                        <div className="bg-blue-500 text-white p-2 rounded-lg text-center w-24 h-24 flex flex-col justify-center items-center">
                            <h2 className="text-sm font-bold">Doctors</h2>
                            <p>{doctorsCount}</p>
                        </div>
                        <div className="bg-blue-500 text-white p-2 rounded-lg text-center w-24 h-24 flex flex-col justify-center items-center">
                            <h2 className="text-sm font-bold">Nurses</h2>
                            <p>{nursesCount}</p>
                        </div>
                        <div className="bg-blue-500 text-white p-2 rounded-lg text-center w-24 h-24 flex flex-col justify-center items-center">
                            <h2 className="text-sm font-bold">Nutritionists</h2>
                            <p>{nutritionistsCount}</p>
                        </div>
                    </section>

                    <section className="mb-4">
                        <div className="relative mb-4 ml-8">
                            {/* Search Bar */}
                            <input
                                type="search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)} // Update search term state
                                className="w-full p-2 pl-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Search by Name..."
                            />
                            <span className="absolute left-2 top-2 text-gray-400">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M8 4a4 4 0 100 8 4 4 0 000-8zm8 14l-4-4m0 0l-4 4m4-4V6"
                                    />
                                </svg>
                            </span>
                        </div>
                    </section>

                    <div className="mb-4 ml-8 flex justify-between">
                        {/* Generate Report Button */}
                        <button
                            className="px-2 py-1 text-xs text-white bg-green-500 rounded hover:bg-green-600 mr-2"
                            onClick={generatePDF}
                        >
                            Generate Report
                        </button>
                        <Link to="/EmpDashForm">
                            <button className='px-2 py-1 text-xs text-white bg-blue-500 rounded hover:bg-blue-600'>Add Employee</button>
                        </Link>
                    </div>

                    {/* Scrollable Table */}
                    <section className="overflow-x-auto overflow-y-auto max-h-[500px] ml-8">
                        <table className="min-w-full bg-white border border-gray-300 text-sm ">
                            <thead className="bg-gray-50">
                                <tr>
                                    {[
                                        "First Name",
                                        "Last Name",
                                        "Job Role",
                                        "NIC",
                                        "Email",
                                        "Qualifications",
                                        "Join Date",
                                        "Actions",
                                    ].map((header) => (
                                        <th
                                            key={header}
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user) => (
                                    <tr key={user._id} className="odd:bg-white even:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                                            {user.first_name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                                            {user.last_name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                                            {user.job_role}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                                            {user.nic}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                                            {user.qualifications}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                                            {new Date(user.joined_date).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                                            <div className="flex space-x-2">
                                                <Link to={`/UpdateEmployee/${user._id}`}>
                                                    <button className="px-2 py-1 text-xs text-white bg-blue-500 rounded hover:bg-blue-600">
                                                        Edit
                                                    </button>
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(user._id, user.first_name)}
                                                    className="px-2 py-1 text-xs text-white bg-red-500 rounded hover:bg-red-600">
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                    
                    {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
                </div>
            </div>
        </div>
    );
}

export default EmpDashBoard;