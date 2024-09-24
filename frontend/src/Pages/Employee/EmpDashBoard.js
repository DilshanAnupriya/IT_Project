import React, { useEffect, useState } from 'react';
import "../Css/Employee/EmpDashboard.css";
import Dash from "../../Components/Dashboard/Dashboard";
import axios from "axios";
import { Link } from "react-router-dom";
import Searchpng from "../../Assets/Employee/search.png";

const URL = "http://localhost:3000/employees/";

const fetchHandler = async () => {
    const data = await axios.get(URL).then((res) => res.data);
    console.log(data);
    return data;
};

function EmpDashBoard() {
    const [users, setUsers] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchHandler().then((data) => setUsers(data.emp));
        console.log(users);
    }, []);

    // Function to delete an employee by ID
    const deleteEmployee = async (id) => {
        const deleteUser = window.confirm(`Are you sure you want to delete the employee with ID ${id}? This action cannot be undone.`);
        if (deleteUser) {
            try {
                await axios.delete(`http://localhost:3000/employees/delete/${id}`);
                setUsers(users.filter((user) => user._id !== id));
            } catch (error) {
                setErrorMessage('Failed to delete employee. Please try again.');
            }
        }
    };

    // Count job roles (Care Givers, Doctors, Nurses, Nutritionists)
    const careGiversCount = users.filter(user => user.job_role.toLowerCase() === 'care giver').length;
    const doctorsCount = users.filter(user => user.job_role.toLowerCase() === 'doctor').length;
    const nursesCount = users.filter(user => user.job_role.toLowerCase() === 'nurse').length;
    const nutritionistsCount = users.filter(user => user.job_role.toLowerCase() === 'nutritionist').length;

    return (
        <div>
            <div className='dashboard70'>
                <Dash />
            </div>

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

            <main className="table36" id="customers_table">
                <section className="table__header36">
                    <h1>Employee Details</h1>
                    <div className="input-group36">
                        <input type="search" placeholder="Search Data..." />
                        <img src={Searchpng} alt="Search" />
                    </div>
                    
                    <button className='add36'>Add Employee</button>
                </section>
                
                <section className="table__body36">
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
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
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
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
                                            <Link to="/#"><button className='edit36'>Edit   ✏</button></Link>
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
    );
}

export default EmpDashBoard;
