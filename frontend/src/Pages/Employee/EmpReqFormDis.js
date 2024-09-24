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
        fetchHandler().then((data) => setUsers(data.requ));
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
                                <th>Email</th>
                                <th>Phone no</th>
                                <th>Gender</th>

                                <th>Address</th>
                                <th>Education Qualification</th>
                                <th>Experience</th>
                                <th>Qualification years</th>
                                <th>Computer Literacy</th>
                                <th>English Skill</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone_no}</td>
                                    <td>{user.gender}</td>
                                    
                                    <td>{user.address}</td>
                                    <td>{user.edu_qualifications}</td>
                                    <td>{user.experience}</td>
                                    <td>{user.yearsofQualification}</td>
                                    <td>{user.computerLiteracy}</td>
                                    <td>{user.englishSkills}</td>
                                    <td>
                                        <div className='action'>
                                            <Link to="/#"><button className='edit36'>Edit</button></Link>
                                            <button className='del36'>del</button>
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