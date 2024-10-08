import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Removee = () => {
    const { id } = useParams(); // Get the equipment ID from the URL parameters
    const navigate = useNavigate(); // For navigation after delete
    const [equipment, setEquipment] = useState(null); // Store the equipment details
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Fetch equipment details on component mount
    useEffect(() => {
        const fetchEquipment = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/e/get/${id}`);
                if (response.data.success) {
                    const equipmentData = response.data.Equipment; 
                    if (equipmentData) {
                        setEquipment(equipmentData);
                    } else {
                        setError("Equipment not found.");
                    }
                } else {
                    setError(response.data.message || "Failed to fetch equipment.");
                }
            } catch (err) {
                setError("An error occurred while fetching equipment.");
                console.error(err);
            }
        };

        fetchEquipment();
    }, [id]);

    // Handle the delete operation
    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:3000/e/delete/${id}`);
            if (response.data.success) {
                setSuccessMessage("Equipment deleted successfully!");
                // Navigate back to the equipment list page after 2 seconds
                setTimeout(() => navigate('/equipments'), 200); // Redirect to equipment list
            } else {
                setError(response.data.message || "Failed to delete equipment.");
            }
        } catch (err) {
            setError("An error occurred while deleting equipment.");
            console.error(err);
        }
    };

    return (
        <div style={styles.container}>
            <h1>Delete Equipment</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error if exists */}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>} {/* Display success message */}
            
            {equipment ? (
                <div style={styles.detailsContainer}>
                    <p><strong>Name:</strong> {equipment.name}</p>
                    <p><strong>Description:</strong> {equipment.description}</p>
                    <p><strong>Category:</strong> {equipment.category}</p>
                    <p><strong>Condition:</strong> {equipment.condition}</p>
                    <p><strong>Model Number:</strong> {equipment.model_number}</p>

                    <button style={styles.deleteButton} onClick={handleDelete}>
                        Delete Equipment
                    </button>
                </div>
            ) : (
                <p>Loading equipment details...</p>
            )}
        </div>
    );
};

// Styles for centering the content and layout
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh', // Full height of the viewport
    },
    detailsContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '400px', // Set a fixed width for the details
        gap: '10px', // Add some gap between details
        border: '1px solid #ccc',
        padding: '20px',
        borderRadius: '8px',
    },
    deleteButton: {
        padding: '10px 15px',
        backgroundColor: '#FF6347', // Red button for delete
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        marginTop: '20px',
    },
};

export default Removee;
