import React, { useEffect, useState } from 'react';
import EmployeeDash from "../../Components/EmployeeDash/EmployeeDash";
import Dashboard from '../../Components/EmployeeDash/EmployeeDashboard';
import axios from "axios";
import { Link } from "react-router-dom";
import Searchpng from "../../Assets/Employee/search.png";
import jsPDF from "jspdf";
import "jspdf-autotable";

const URL = "http://localhost:3000/employees/";

const fetchHandler = async () => {
    const data = await axios.get(URL).then((res) => res.data);
    console.log(data);
    return data;
};

function EmpDashBoard() {
    const [users, setUsers] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState(""); // For search functionality

    useEffect(() => {
        fetchHandler().then((data) => setUsers(data.emp));
    }, []);

    const deleteEmployee = async (id, first_name) => {
        const deleteUser = window.confirm(`Are you sure you want to delete the employee ${first_name}?`);
        
        if (deleteUser) {
            try {
                await axios.delete(`http://localhost:3000/employees/delete/${id}`);
                setUsers(users.filter((user) => user._id !== id));
            } catch (error) {
                setErrorMessage(`Failed to delete employee ${first_name}. Please try again.`);
            }
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
        doc.text("Employee Report", 14, 16);
        doc.autoTable({
            head: [['First Name', 'Last Name', 'Job Role', 'NIC', 'Email', 'Qualifications', 'Bank Details', 'Join Date']],
            body: filteredUsers.map(user => [
                user.first_name,
                user.last_name,
                user.job_role,
                user.nic,
                user.email,
                user.qualifications,
                user.bank_details,
                new Date(user.joined_date).toLocaleDateString()
            ]),
        });
        doc.save("employee_report.pdf");
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <Dashboard />
            <div className="flex-1 p-4">
                <div>
                    <section className="flex gap-8 justify-center mb-8">
                        <div className="bg-blue-500 text-white p-4 rounded-lg text-center">
                            <h2 className="text-xl font-bold">Care Givers</h2>
                            <p>Number of Care givers: {careGiversCount}</p>
                        </div>
                        <div className="bg-blue-500 text-white p-4 rounded-lg text-center">
                            <h2 className="text-xl font-bold">Doctors</h2>
                            <p>Number of Doctors: {doctorsCount}</p>
                        </div>
                        <div className="bg-blue-500 text-white p-4 rounded-lg text-center">
                            <h2 className="text-xl font-bold">Nurses</h2>
                            <p>Number of Nurses: {nursesCount}</p>
                        </div>
                        <div className="bg-blue-500 text-white p-4 rounded-lg text-center">
                            <h2 className="text-xl font-bold">Nutritionists</h2>
                            <p>Number of Nutritionists: {nutritionistsCount}</p>
                        </div>
                    </section>

                    <div className="flex flex-col md:flex-row justify-between items-center mb-4 ml-96">
                        <div className="relative mb-4 md:mb-0">
                            <input
                                type="search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)} // Update search term state
                                placeholder="Search by Name..."
                                className="border rounded-lg p-2"
                            />
                            <img src={Searchpng} alt="Search" className="absolute right-2 top-2 w-4 h-4" />
                        </div>
                        <div className="flex gap-4">
                            <button
                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                onClick={generatePDF}>
                                Generate Report
                            </button>
                            <Link to="/EmpDashForm">
                                <button className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'>Add Employee</button>
                            </Link>
                        </div>
                    </div>

                    <div className="overflow-x-auto ml-96">
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border-b">First Name</th>
                                    <th className="px-4 py-2 border-b">Last Name</th>
                                    <th className="px-4 py-2 border-b">Job Role</th>
                                    <th className="px-4 py-2 border-b">NIC</th>
                                    <th className="px-4 py-2 border-b">Email</th>
                                    <th className="px-4 py-2 border-b">Qualifications</th>
                                    <th className="px-4 py-2 border-b">Bank Details</th>
                                    <th className="px-4 py-2 border-b">Join Date</th>
                                    <th className="px-4 py-2 border-b">Other</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user) => (
                                    <tr key={user._id} className="hover:bg-gray-100">
                                        <td className="px-4 py-2 border-b">{user.first_name}</td>
                                        <td className="px-4 py-2 border-b">{user.last_name}</td>
                                        <td className="px-4 py-2 border-b">{user.job_role}</td>
                                        <td className="px-4 py-2 border-b">{user.nic}</td>
                                        <td className="px-4 py-2 border-b">{user.email}</td>
                                        <td className="px-4 py-2 border-b">{user.qualifications}</td>
                                        <td className="px-4 py-2 border-b">{user.bank_details}</td>
                                        <td className="px-4 py-2 border-b">{new Date(user.joined_date).toLocaleDateString()}</td>
                                        <td className="px-4 py-2 border-b">
                                            <div className='flex gap-2'>
                                                <Link to={`/UpdateEmployee/${user._id}`}>
                                                    <button className='px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600'>Edit</button>
                                                </Link>
                                                <button className='px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600' onClick={() => deleteEmployee(user._id, user.first_name)}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
                </div>
            </div>
        </div>
    );
}

export default EmpDashBoard;