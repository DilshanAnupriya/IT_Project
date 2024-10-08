import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditEquipments = () => {
    const { id } = useParams(); // Get the equipment ID from the URL parameters
    const navigate = useNavigate(); // For navigation after edit
    const [name, setName] = useState('');
    const [discription, setDiscription] = useState('');
    const [category, setCategory] = useState('');
    const [condition, setCondition] = useState('');
    const [modelNumber, setModelNumber] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchEquipment = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/e/get/${id}`);
                if (response.data.success) {
                    const equipment = response.data.Equipment; 
                    if (equipment) {
                        setName(equipment.name || '');
                        setDiscription(equipment.discription || '');
                        setCategory(equipment.category || '');
                        setCondition(equipment.condition || '');
                        setModelNumber(equipment.model_number || '');
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
    
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        try {
            const response = await axios.put(`http://localhost:3000/e/update/${id}`, {
                name,
                discription,
                category,
                condition,
                model_number: modelNumber,
            });
            if (response.data.success) {
                setSuccessMessage("Equipment updated successfully!");
                // Navigate back to the equipment details page after 2 seconds
                setTimeout(() => navigate(`/equipments`), 200); // Redirect after 2 seconds
            } else {
                setError(response.data.message || "Failed to update equipment.");
            }
        } catch (err) {
            setError("An error occurred while updating equipment.");
            console.error(err);
        }
    };
    
    return (
        <div style={styles.container}>
            <h1>Edit Equipment</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error if exists */}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>} {/* Display success message */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea 
                        value={discription} 
                        onChange={(e) => setDiscription(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Category:</label>
                    <input 
                        type="text" 
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Condition:</label>
                    <input 
                        type="text" 
                        value={condition} 
                        onChange={(e) => setCondition(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Model Number:</label>
                    <input 
                        type="text" 
                        value={modelNumber} 
                        onChange={(e) => setModelNumber(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Update Equipment</button>
            </form>
        </div>
    );
};

// Styles for centering the form
const styles = {
  container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh', // Full height of the viewport
  },
  form: {
      display: 'flex',
      flexDirection: 'column',
      width: '300px', // Set a fixed width for the form
  },
};

export default EditEquipments;
