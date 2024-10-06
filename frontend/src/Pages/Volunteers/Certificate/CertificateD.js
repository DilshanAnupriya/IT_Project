import React, { useEffect, useRef, useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaDownload } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { useReactToPrint } from "react-to-print"
import { ImSearch } from "react-icons/im";
import axios from "axios";
import { Link } from "react-router-dom";
import Dash from "../../../Components/new_Dashboard/New_Dashboard"
import "../../Css/Volunteers/Certificate/CertificateD.css"

const URL = "http://localhost:3000/certificate/";

const fetchHandler = async () => {
    const data = await axios.get(URL).then((res) => res.data);
    console.log(data);
    return data;
}


function CertificateD() {

    const [certificate, setCertificate] = useState([]);
    const [setErrorMessage] = useState('');

    const [searchQuery, setSearchQuery] = useState("");
    const [noResults, setNoResults] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHandler().then((data) => setCertificate(data.certificate));
        console.log(certificate);
    }, []);

    useEffect(() => {
        fetchHandler().then((data) => {
            setCertificate(data.certificate);
            setLoading(false);  // Ensure tasks are fetched
        });
    }, []);
    const handleSearch = () => {
        if (!searchQuery.trim()) {
            // If search is empty, reset to show all tasks
            fetchHandler().then((data) => setCertificate(data.certificate));
            setNoResults(false);
            return;
        }
        fetchHandler().then((data) => {
            const filteredUsers = data.certificate.filter((certificate) => {
                const Name = certificate.v_name.toLowerCase();
                const Title = certificate.title.toLowerCase();
                const Date = certificate.issue_date.toLowerCase();


                // Check if searchQuery is part of any of the relevant fields
                return (
                    Name.includes(searchQuery.toLowerCase()) ||
                    Title.includes(searchQuery.toLowerCase()) ||
                    Date.includes(searchQuery.toLowerCase())

                );
            });

            setCertificate(filteredUsers);
            setNoResults(filteredUsers.length === 0);
        });
    };

    // Delete   by ID
    const deleteCertificate = async (id) => {
        const deleteCertificate = window.confirm(`Are you sure you want to delete the Certificate with ID ${id}? This action cannot be undone.`);
        if (deleteCertificate) {
            try {
                await axios.delete(`http://localhost:3000/certificate/delete/${id}`);
                setCertificate(certificate.filter((certificate) => certificate._id !== id));
            } catch (error) {
                setErrorMessage('Failed to delete Certificate. Please try again.');
            }
        }
    };



    const ComponentsRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => ComponentsRef.current,
        onBeforeGetContent: () => {
            // Set the document title before printing
            document.title = "Certificate Details";
            return Promise.resolve();
        },

    });

    return (
        <div>
            <Dash />
            <div className='dt'>
                <div className="dt200">
                    {/* Search Input */}
                    <div className="search-bar">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search Certificate..."
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
                        <button className="dt201" onClick={handlePrint}> <FaDownload /></button>



                        <Link to="/CertificateCreate"><button className="dt203">  <IoMdAddCircle />  </button></Link>
                    </div>

                </div>


                <div ref={ComponentsRef}>
                    <h1 className="title001"> Issued Certificate</h1>

                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right  ">
                            <thead className="dt1 text-xs text-gray-700 uppercase   ">
                                <tr className="dt3">
                                    <th scope="col" className="p-6 ">

                                    </th>
                                    <th scope="col" className=" px-0 py-3 ">
                                        Name
                                    </th>


                                    <th scope="col" className="px-6 py-3 ">
                                        Title
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Issue Date
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Time Period
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>


                                </tr>
                            </thead>
                            <tbody>
                                {certificate.map((certificate) => (

                                    <tr key={certificate._id} className="border-b">
                                        <td className="w-4 p-4">

                                        </td>
                                        <th scope="row" className="flex items-center px-6 py-9 font-medium text-gray-900 whitespace-nowrap dark:text-black">

                                            <div class="ps">
                                                <div class="text-base font-semibold">{certificate.v_name}</div>

                                            </div>
                                        </th>
                                        <td className="px-6 py-4 ">
                                            <div className=""> {certificate.title}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                {new Date(certificate.issue_date).toLocaleDateString()}

                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {certificate.time_period}
                                        </td>



                                        <td className="px-6 py-4">
                                            <div className='act'>
                                                <Link to={`/CertificateU/${certificate._id}`}>   <button className="update02">
                                                    <div className="up_icon">
                                                        <FaEdit />
                                                    </div>
                                                </button></Link>
                                                <button className="delete02" onClick={() => deleteCertificate(certificate._id)}>
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
        </div>


    )
}

export default CertificateD