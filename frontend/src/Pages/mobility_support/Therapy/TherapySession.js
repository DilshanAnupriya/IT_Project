import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function TherapySession() {
    const [shedules, setshedules] = useState([]);
    const [filteredShedules, setFilteredShedules] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const navigate = useNavigate();

    const handleAddButtonClick = () => {
        navigate("/add"); // Navigate to AddShedule page
    };

    const fetchShedules = async () => {
        try {
            const response = await axios.get('http://localhost:3000/shedule');
            setshedules(response.data);
            setFilteredShedules(response.data);
        } catch (error) {
            console.error("Error fetching shedules:", error);
        }
    };

    useEffect(() => {
        fetchShedules();
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        const filtered = shedules.filter((shedule) => {
            const phoneNumber = String(shedule.phone_number || '');
            return (
                (shedule.elderId && shedule.elderId.toLowerCase().includes(value)) || 
                (shedule.name && shedule.name.toLowerCase().includes(value)) ||
                phoneNumber.includes(value) || 
                (shedule.date && new Date(shedule.date).toLocaleDateString().toLowerCase().includes(value)) || 
                (shedule.preffered_time && shedule.preffered_time.toLowerCase().includes(value))
            );
        });
        setFilteredShedules(filtered);
    };

    const handleEdit = (id) => {
        navigate(`/EditShedule/${id}`);
    };
    
    const handleDelete = (id) => {
        navigate(`/deletee/${id}`); // Navigate to the delete page with the ID
    };

    const handleView = (id) => {
        navigate(`/ViewOne/${id}`);
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(22);
        //doc.text('Therapy Sessions Report', 14, 22);
        const tableColumns = [
            { header: 'ElderId', dataKey: 'elderId' },
            { header: 'Name', dataKey: 'name' },
            { header: 'Age', dataKey: 'age' },
            { header: 'Phone Number', dataKey: 'phone_number' },
            { header: 'Email', dataKey: 'email' },
            { header: 'Date', dataKey: 'date' },
            { header: 'Time', dataKey: 'preffered_time' },
            { header: 'NIC', dataKey: 'NIC' },
            { header: 'Current Status', dataKey: 'current_status' },
            { header: 'Physical Condition', dataKey: 'current_physical_condition' },
            { header: 'Previous Therapy', dataKey: 'previous_therapy' },
            { header: 'Therapy Goal', dataKey: 'therapy_goal' },
            { header: 'Frequency', dataKey: 'frequency' },
            { header: 'Location', dataKey: 'location' }
        ];
    
        const tableData = filteredShedules.map((shedule) => ({
            elderId: shedule.elderId || '',
            name: shedule.name || '',
            age: shedule.age || '',
            phone_number: shedule.phone_number || '',
            email: shedule.email || '',
            date: new Date(shedule.date).toLocaleDateString() || '',
            preffered_time: shedule.preffered_time || '',
            NIC: shedule.NIC || '',
            current_status: shedule.current_status || '',
            current_physical_condition: shedule.current_physical_condition || '',
            previous_therapy: shedule.previous_therapy || '',
            therapy_goal: shedule.therapy_goal || '',
            frequency: shedule.frequency || '',
            location: shedule.location || ''
        }));
        doc.autoTable({
            columns: tableColumns,
            body: tableData,
            startY: 30,
            theme: 'grid',
            styles: { fontSize: 8, cellPadding: 1 },
            headStyles: { fontSize: 6, fillColor: [0, 0, 0], textColor: [255, 255, 255] },
            margin: { top: 25 },
            pageBreak: 'auto', // Automatically break the page when content overflows
            didDrawPage: (data) => {
                //header
                const pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
                const headerText = 'Therapy Sessions Report';
                const textWidth = doc.getTextWidth(headerText);
                const xOffset = (pageWidth - textWidth) / 2; // Calculate the horizontal center position

               doc.setFontSize(22);
               doc.text(headerText, xOffset, 22); // Set the X position to center the text


                // Footer (optional, add page number)
                const pageCount = doc.internal.getNumberOfPages();
                doc.setFontSize(10);
                doc.text(`Page ${data.pageNumber} of ${pageCount}`, data.settings.margin.left, doc.internal.pageSize.height - 10);
            }
        });
        doc.save('therapy_sessions_report.pdf');
    };

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            height: '100vh',
            paddingTop: '20px',
            backgroundColor: '#9BA4BF',
        },
        title: {
            marginBottom: '20px'
        },
        buttonContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px'
        },
        button: {
            width: '200px',
            backgroundColor: '#6B75FE',
            color: 'white',
            border: 'none',
            padding: '10px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
        },
        searchForm: {
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '1.5rem'
        },
        searchInputContainer: {
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
        },
        searchInput: {
            width: searchTerm.length > 0 ? '250px' : '150px', // Dynamic width
            padding: '0.5rem 2rem 0.5rem 1rem',
            borderRadius: '20px',
            border: '1px solid #ccc',
            outline: 'none',
            transition: 'width 0.3s ease-in-out',
            boxShadow: isFocused ? '0 0 5px #6B75FE' : 'none',
        },
        searchButton: {
            position: 'absolute',
            right: '10px',
            backgroundColor: '#6B75FE',
            border: 'none',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'background-color 0.3s',
        },
        tableContainer: {
            display: 'flex',
            justifyContent: 'center',  // Center the table
            width: '100%',  // Ensure the table fits within the viewport
            padding: '30px',  // Optional padding
            overflow: 'hidden',  // Prevent any overflow
        },
        table: {
            margin: '0 auto',
            borderCollapse: 'collapse',
            width: '90%',  // Adjust width as necessary
            border: '1px solid #ddd', // Add outer border
        },
        th: {
            padding: '10px',
            backgroundColor: '#f4f4f4',
            border: '1px solid #ddd', // Add border to header cells
            fontSize: '15px',  // Smaller font size for headers
        },
        td: {
            padding: '5px',
            border: '1px solid #ddd',
            textAlign: 'center',
            whiteSpace: 'normal',  // Allows content to wrap onto multiple lines
            wordBreak: 'break-word',  // Forces long words to break if needed
            maxWidth: '150px',  // Optional: Sets a maximum width for table cells
            fontSize: '15px',  // Smaller font size
        }
       
    };

    return (
        <div style={styles.container}>
            <h1 style={{ textAlign: 'center', margin: '20px 0' }}>Therapy Sessions</h1>

            <div style={styles.searchForm}>
                <div style={styles.searchInputContainer}>
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={handleSearch}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        style={styles.searchInput} // Apply updated styles
                    />
                    <button type="submit" style={styles.searchButton}>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>
            </div>

            <button className="btn btn-primary" onClick={handleAddButtonClick}>
                Add Schedule
            </button>

            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>ElderId</th>
                        <th style={styles.th}>Name</th>
                        <th style={styles.th}>Age</th>
                        <th style={styles.th}>Phone Number</th>
                        <th style={styles.th}>Email</th>
                        <th style={styles.th}>Date</th>
                        <th style={styles.th}>Time</th>
                        <th style={styles.th}>NIC</th>
                        <th style={styles.th}>Current Status</th>
                        <th style={styles.th}>Physical Condition</th>
                        <th style={styles.th}>Previous Therapy</th>
                        <th style={styles.th}>Therapy Goal</th>
                        <th style={styles.th}>Frequency</th>
                        <th style={styles.th}>Location</th>
                        <th style={styles.th}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredShedules.map((shedule) => (
                        <tr key={shedule._id}>
                            <td style={styles.td}>{shedule.elderId}</td>
                            <td style={styles.td}>{shedule.name}</td>
                            <td style={styles.td}>{shedule.age}</td>
                            <td style={styles.td}>{shedule.phone_number}</td>
                            <td style={styles.td}>{shedule.email}</td>
                            <td style={styles.td}>{new Date(shedule.date).toLocaleDateString()}</td>
                            <td style={styles.td}>{shedule.preffered_time}</td>
                            <td style={styles.td}>{shedule.NIC}</td>
                            <td style={styles.td}>{shedule.current_status}</td>
                            <td style={styles.td}>{shedule.current_physical_condition}</td>
                            <td style={styles.td}>{shedule.previous_therapy}</td>
                            <td style={styles.td}>{shedule.therapy_goal}</td>
                            <td style={styles.td}>{shedule.frequency}</td>
                            <td style={styles.td}>{shedule.location}</td>
                            <td style={styles.td}>
                                <button onClick={() => handleEdit(shedule._id)}>Edit</button>
                                <button onClick={() => handleDelete(shedule._id)}>Delete</button>
                                <button onClick={() => handleView(shedule._id)}>View</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={generatePDF} style={styles.button}>Download PDF</button>
        </div>
    );
}
