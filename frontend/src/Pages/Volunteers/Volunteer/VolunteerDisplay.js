import "../../Css/Volunteers/VolunteerDisplay.css"
import Dash from "../../../Components/new_Dashboard/New_Dashboard"
import axios from "axios";
import { Link } from "react-router-dom";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import React, { useEffect, useRef, useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaDownload } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { useReactToPrint } from "react-to-print"
import { ImSearch } from "react-icons/im";


const URL = "http://localhost:3000/users/";

const fetchHandler = async () => {
    const data = await axios.get(URL).then((res) => res.data);
    console.log(data);
    return data;
};
function Volunteers_Display() {


    //report generation 01
    const [users, setUsers] = useState([]);
    const [setErrorMessage] = useState('');

    const ComponentsRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => ComponentsRef.current,
        onBeforeGetContent: () => {
            // Set the document title before printing
            document.title = "Volunteers Details";
            return Promise.resolve();
        },

    });

    useEffect(() => {
        fetchHandler().then((data) => setUsers(data.Volunteers));
        console.log(users);
    }, []);

    // Delete   by ID
    const deleteVolunteer = async (id) => {
        const deleteUser = window.confirm(`Are you sure you want to delete the volunteer with ID ${id}? This action cannot be undone.`);
        if (deleteUser) {
            try {
                await axios.delete(`http://localhost:3000/users/delete/${id}`);
                setUsers(users.filter((user) => user._id !== id));
            } catch (error) {
                setErrorMessage('Failed to delete Volunteer. Please try again.');
            }
        }
    };
    //second way to generate report
    const generateReport = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("Volunteer Profile Report", 14, 16); // Title

        autoTable(doc, {
            head: [
                [
                    'First Name', 'Last Name', 'Date of Birth', 'Gender',
                    'Email', 'Mobile', 'Join Date',
                    'Skills', 'Duration', 'Work', 'Experience',
                    'Days', 'Time'
                ]
            ],
            body: users.map(user => [
                user.first_name,
                user.last_name,
                new Date(user.date_of_birth).toLocaleDateString(),
                user.gender,
                user.email,
                user.mobile,
                new Date(user.date).toLocaleDateString(),
                user.skills,
                user.duration,
                user.type_of_work,
                user.experience,
                user.days,
                user.time
            ]),
            startY: 22,
            theme: 'striped', // Better readability with striped theme
            styles: {
                fontSize: 10, // Reducing font size for better fit
                cellPadding: 4
            },
            columnStyles: {
                0: { cellWidth: 20 }, // First Name
                1: { cellWidth: 20 }, // Last Name
                2: { cellWidth: 20 }, // Date of Birth
                3: { cellWidth: 15 }, // Gender
                4: { cellWidth: 35, cellWidth: 'wrap' }, // Email (wrap text)
                5: { cellWidth: 25 }, // Mobile
                7: { cellWidth: 20 }, // Join Date
                8: { cellWidth: 30 }, // Skills
                9: { cellWidth: 15 }, // Duration
                10: { cellWidth: 30 }, // Work Type
                11: { cellWidth: 30 }, // Experience
                12: { cellWidth: 15 }, // Days
                13: { cellWidth: 15 }, // Time
            },
            margin: { top: 20 }, // Leave some space for title
            didDrawPage: (data) => {
                // Page Header (optional)
                doc.setFontSize(12);
                doc.text("Volunteer Report", 14, 10);
            }
        });

        doc.save("volunteer_profile_report.pdf");
        alert("Report generated successfully!");
    };


    const [searchQuery, setSearchQuery] = useState("");
    const [noResults, setNoResults] = useState(false);
    const handleSearch = () => {
        fetchHandler().then((data) => {
            const filteredUsers = data.Volunteers.filter((user) => {
                const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
                const typeOfWork = user.type_of_work.toLowerCase();
                const duration = user.duration.toLowerCase();
                const skills = user.skills.toLowerCase();

                // Check if searchQuery is part of any of the relevant fields
                return (
                    fullName.includes(searchQuery.toLowerCase()) ||
                    typeOfWork.includes(searchQuery.toLowerCase()) ||
                    duration.includes(searchQuery.toLowerCase()) ||
                    skills.includes(searchQuery.toLowerCase())
                );
            });

            setUsers(filteredUsers);
            setNoResults(filteredUsers.length === 0);
        });
    };




    return (
        <div className="content200">
            <div>
                <Dash />
            </div>
            <div className="dt">
                <div className="dt200">
                    {/* Search Input */}
                    <div className="search-bar">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search Volunteers..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button className="search-btn"></button>
                    </div>
                    <div className="dt202">
                        <button className="dt205" onClick={handleSearch}> <ImSearch /></button>
                        <button className="dt201" onClick={handlePrint}> <FaDownload /></button>



                        <Link to="/vol_dash_register"><button className="dt203">  <IoMdAddCircle />  </button></Link>
                    </div>

                </div>


                <div ref={ComponentsRef}>
                    <h1 className="title001"> Volunteer Details</h1>

                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right  ">
                            <thead className="dt1 text-xs text-gray-700 uppercase   ">
                                <tr className="dt3">
                                    <th scope="col" className="p-6 ">

                                    </th>
                                    <th scope="col" className=" px-0 py-3 ">
                                        Full Name
                                    </th>


                                    <th scope="col" className="px-6 py-3 ">
                                        Date of Birth
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Gender
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Mobile
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Join Date
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Skills
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        duration
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        type of work
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Availability
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>


                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (

                                    <tr key={user._id} className="border-b">
                                        <td className="w-4 p-4">

                                        </td>
                                        <th scope="row" className="flex items-center px-6 py-9 font-medium text-gray-900 whitespace-nowrap dark:text-black">

                                            <div class="ps">
                                                <div class="text-base font-semibold">{user.first_name}&nbsp;{user.last_name}</div>
                                                <div class="font-normal text-gray-500">{user.email}</div>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4 ">
                                            <div className=""> {new Date(user.date_of_birth).toLocaleDateString()}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                {user.gender}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.mobile}
                                        </td>
                                        <td className="px-6 py-4">
                                            {new Date(user.date).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.skills}
                                        </td>
                                        <td className="px-5 py-6">
                                            {user.duration}
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.type_of_work}
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.days}<br />
                                            {user.time}
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className='act'>
                                                <Link to={`/volunteer_pd_update/${user._id}`}>   <button className="update02">
                                                    <div className="up_icon">
                                                        <FaEdit />
                                                    </div>
                                                </button></Link>
                                                <button className="delete02" onClick={() => deleteVolunteer(user._id)}>
                                                    <div className="del_icon">
                                                        <MdDelete />
                                                    </div>
                                                </button>
                                            </div>
                                        </td>

                                    </tr>
                                ))}


                            </tbody>
                        </table>
                    </div>
                </div>

            </div>


        </div >
    )
}

export default Volunteers_Display