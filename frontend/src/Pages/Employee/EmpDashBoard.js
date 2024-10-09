import React, { useEffect, useState } from 'react';
import "../Css/Employee/EmpDashboard.css";
import EmployeeDash from "../../Components/EmployeeDash/EmployeeDash";
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
        <div className="flex h-screen">
                <EmployeeDash />
                <div className="flex-1 p-4">
                 <div>
                    <section className="count-panel">
                        <div className="count-box">
                            <h2>Care Givers</h2>
                            <p>Number of Care givers: {careGiversCount}</p>
                        </div>
                        <div className="count-box">
                            <h2>Doctors</h2>
                            <p>Number of Doctors: {doctorsCount}</p>
                        </div>
                        <div className="count-box">
                            <h2>Nurses</h2>
                            <p>Number of Nurses: {nursesCount}</p>
                        </div>
                        <div className="count-box">
                            <h2>Nutritionists</h2>
                            <p>Number of Nutritionists: {nutritionistsCount}</p>
                        </div>
                        
                    </section>

                    <div className="input-group36" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                   
                </div>

                    <main className="table36" id="customers_table">
                        <section className="table__header36">
                            <h1>Employee Details</h1>
                            <div className="input-group36">
                                {/* Search Bar */}
                                <input
                                    type="search"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)} // Update search term state
                                    placeholder="Search by Name..."
                                />
                                <img src={Searchpng} alt="Search" />
                            </div>
                             {/* Generate Report Button */}
                            <button
                                className="px-2 py-1 text-xs text-white bg-green-500 rounded hover:bg-green-600"
                                onClick={generatePDF}
                                style={{ marginLeft: 'auto' }}>
                                Generate Report
                            </button>
                            <Link to="/EmpDashForm">
                                <button className='add36'>Add Employee</button>
                            </Link>
                             
                        </section>

                        <section className="table__body36">
                            <table>
                                <thead>
                                    <tr>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Job Role</th>
                                        <th>NIC</th>
                                        <th>Email</th>
                                        <th>Qualifications</th>
                                        <th>Bank Details</th>
                                        <th>Join Date</th>
                                        <th>Other</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map((user) => (
                                        <tr key={user._id}>
                                            <td>{user.first_name}</td>
                                            <td>{user.last_name}</td>
                                            <td>{user.job_role}</td>
                                            <td>{user.nic}</td>
                                            <td>{user.email}</td>
                                            <td>{user.qualifications}</td>
                                            <td>{user.bank_details}</td>
                                            <td>{new Date(user.joined_date).toLocaleDateString()}</td>
                                            <td>
                                                <div className='action36'>
                                                    <Link to="/UpdateEmployee">
                                                        <button className='edit36'>Edit   ✏</button>
                                                    </Link>
                                                    <button className='del36' onClick={() => deleteEmployee(user._id)}>delete🗑</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            
                        </section>
                        
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </main>
                    
                </div>
            </div>
        </div>
    );
}

export default EmpDashBoard;
