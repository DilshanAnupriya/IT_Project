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



    const [searchQuery, setSearchQuery] = useState("");
    const [noResults, setNoResults] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHandler().then((data) => {
            setUsers(data.Volunteers);
            setLoading(false);  // Ensure tasks are fetched
        });
    }, []);
    const handleSearch = () => {
        if (!searchQuery.trim()) {
            // If search is empty, reset to show all tasks
            fetchHandler().then((data) => setUsers(data.Volunteers));
            setNoResults(false);
            return;
        }
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

    // Function to generate report
    const generateReport = () => {
        const doc = new jsPDF();

        // Add title with styles
        doc.setFontSize(18);
        doc.setFont("Helvetica", "bold");
        doc.text("Volunteer Report", 14, 22);

        // Add a horizontal line with left margin
        const lineLeftMargin = 15;
        doc.setLineWidth(0.5);
        doc.setDrawColor(0, 51, 102);
        doc.line(lineLeftMargin, 40, 200, 40);

        // Add table
        autoTable(doc, {
            head: [["Full Name", "Email", "Mobile", "Date of Birth", "Gender", "Join Date", "Skills", "Duration", "Type of Work"]],
            body: users.map((user) => [
                `${user.first_name} ${user.last_name}`,
                user.email,
                user.mobile,
                new Date(user.date_of_birth).toLocaleDateString(),
                user.gender,
                new Date(user.date).toLocaleDateString(),
                user.skills,
                user.duration,
                user.type_of_work,
            ]),
            startY: 45, // Start after the title and line
        });

        // Add footer with correct date
        const footerY = doc.autoTable.previous.finalY + 20;
        doc.setFontSize(10);
        doc.setFont("Helvetica", "normal");
        const formattedDate = new Date().toLocaleDateString();
        doc.text("Generated on: " + formattedDate, 14, footerY);

        // Save the PDF
        doc.save("volunteer_report.pdf");
        alert("Report generated successfully!");
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
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    handleSearch();  // Trigger search on Enter key press
                                }
                            }}
                        />
                        <button className="search-btn"></button>
                    </div>
                    <div className="dt202">
                        <button className="dt205" onClick={handleSearch}> <ImSearch /></button>
                        <button className="dt201" onClick={generateReport}> <FaDownload /></button>



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