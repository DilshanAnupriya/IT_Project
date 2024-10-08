import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function MobilityEquipments() {
    const navigate = useNavigate(); // Initialize useNavigate
    const [equipment, setEquipment] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // State for the search term

    useEffect(() => {
        const getEquipment = async () => {
            try {
                const response = await fetch("http://localhost:3000/e");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setEquipment(data);
            } catch (err) {
                console.error("Error fetching equipment:", err.message);
            }
        };
        getEquipment();
    }, []);

    const handleAddEquipmntButtonClick = () => {
        navigate("/addequipmnts"); // Navigate to Add Equipment page
    };

    const handleEdit = (id) => {
        navigate(`/eedit/${id}`); // Navigates to the edit page with the equipment ID
    };

    const handleDelete = (id) => {
        navigate(`/remequip/${id}`); // Navigates to the delete page with the equipment ID
    };

    // Handle search input change
    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
    };

    // Filter equipment based on the search term
    const filteredEquipment = equipment.filter((item) => 
        item.name.toLowerCase().includes(searchTerm) ||
        item.discription.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm) ||
        item.condition.toLowerCase().includes(searchTerm) ||
        item.model_number.toLowerCase().includes(searchTerm)
    );

    // Inline styles for the component
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start', // Align items at the top
            height: '100vh',
            paddingTop: '20px' // Optional: add some space from the top edge
        },
        title: {
            marginBottom: '20px'
        },
        buttonContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px', // Space between buttons
            marginBottom: '30px' // Space between buttons and table
        },
        button: {
            width: '200px' // Set a fixed width for buttons
        },
        tableContainer: {
            width: '80%', // Adjust width of the table container
            marginTop: '20px',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
        },
        tableHeader: {
            backgroundColor: '#f5f5f5',
            textAlign: 'left',
        },
        tableCell: {
            padding: '8px',
            border: '1px solid #ddd',
        },
        searchContainer: {
            marginBottom: '20px',
        },
        searchInput: {
            width: '200px', // Set width for the search input
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Mobility Equipments</h1>

            <div style={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Search equipment..."
                    value={searchTerm}
                    onChange={handleSearch}
                    style={styles.searchInput}
                />
            </div>

            <div style={styles.buttonContainer}>
                <button
                    style={styles.button}
                    className="btn btn-primary"
                    onClick={handleAddEquipmntButtonClick}
                >
                    Add new Equipment
                </button>
            </div>

            <div style={styles.tableContainer}>
                <h2>All Equipments</h2>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.tableCell}>Name</th>
                            <th style={styles.tableCell}>Description</th>
                            <th style={styles.tableCell}>Category</th>
                            <th style={styles.tableCell}>Condition</th>
                            <th style={styles.tableCell}>Model Number</th>
                            <th style={styles.tableCell}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEquipment.map((Equipment) => (
                            <tr key={Equipment._id}>
                                <td style={styles.tableCell}>{Equipment.name}</td>
                                <td style={styles.tableCell}>{Equipment.discription}</td>
                                <td style={styles.tableCell}>{Equipment.category}</td>
                                <td style={styles.tableCell}>{Equipment.condition}</td>
                                <td style={styles.tableCell}>{Equipment.model_number}</td>
                                <td style={styles.tableCell}>
                                    <button onClick={() => handleEdit(Equipment._id)}>Edit</button>
                                    <button onClick={() => handleDelete(Equipment._id)}>Remove</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
