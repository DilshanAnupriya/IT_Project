import React, { useEffect, useState } from 'react';
import "../Css/Employee/EmpReqFormDis.css";
import Dash from "../../Components/Dashboard/Dashboard";
import axios from "axios";
import { Link } from "react-router-dom";

const URL = "http://localhost:3000/requests/";

const fetchHandler = async () => {
    const data = await axios.get(URL).then((res) => res.data);
    console.log(data);
    return data;
};

function VolunteerProfileDash() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchHandler().then((data) => setUsers(data.request));
        console.log(users);
    }, []);

    return (
        <div>
            <div className='dashboard'>
                <Dash />
            </div>
            <main className="table" id="customers_table">
                <section className="table__header">
                    <h1>Employee Request Details</h1>
                    <div className="input-group">
                        <input type="search" placeholder="Search Data..." />
                        <img src="" alt="" />
                    </div>
                    
                </section>
                <section className="table__body">
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Last Name</th>
                                <th>Date of Birth</th>
                                <th>Gender</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Address</th>
                                <th>Join Date</th>
                                <th>Skills</th>
                                <th>Duration</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.first_name}</td>
                                    <td>{user.last_name}</td>
                                    <td>{new Date(user.date_of_birth).toLocaleDateString()}</td>
                                    <td>{user.gender}</td>
                                    <td>{user.email}</td>
                                    <td>{user.mobile}</td>
                                    <td>{user.address}</td>
                                    <td>{new Date(user.date).toLocaleDateString()}</td>
                                    <td>{user.skills}</td>
                                    <td>{user.duration}</td>
                                    <td>{user.description}</td>
                                    <td>
                                        <div className='action'>
                                            <Link to="/volunteer_pd_update"><button>up</button></Link>
                                            <button className='del'>del</button>
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

export default VolunteerProfileDash;