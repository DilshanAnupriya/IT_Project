import React, { useEffect, useState } from 'react';
import "../Css/Employee/EmpDashboard.css";
import Dash from "../../Components/Dashboard/Dashboard";
import axios from "axios";
import { Link } from "react-router-dom";
import Searchpng from "../../Assets/Employee/search.png"

const URL = "http://localhost:3000/employees/";

const fetchHandler = async () => {
    const data = await axios.get(URL).then((res) => res.data);
    console.log(data);
    return data;
};

function EmpDashBoard() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchHandler().then((data) => setUsers(data.emp));
        console.log(users);
    }, []);

    return (
        <div>
            <div className='dashboard70'>
                <Dash />
            </div>
            
            <section className="count-panel">
    <div className="count-box">
        <h2>Care Givers</h2>
        <p>Number of Care givers: 16</p>
    </div>
    <div className="count-box">
        <h2>Doctors</h2>
        <p>Number of Doctors: 9</p>
    </div>
    <div className="count-box">
        <h2>Nurses</h2>
        <p>Number of Nurses: 12</p>
    </div>
    <div className="count-box">
        <h2>Other</h2>
        <p>Number of Other Staff: 7</p>
    </div>
</section>

            <main className="table36" id="customers_table">
                <section className="table__header36">
                    <h1>Employee Details</h1>
                    <div className="input-group36">
                        <input type="search" placeholder="Search Data..." />
                        <img src={Searchpng} alt="" />
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
                                            <Link to="/#"><button className='edit36'>Edit</button></Link>
                                            <button className='del36'>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
}

export default EmpDashBoard;