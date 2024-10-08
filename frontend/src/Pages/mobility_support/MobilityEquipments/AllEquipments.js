import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AllEquipments() {
    const [equipment, setEquipment] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getEquipment = async () => {
            try {
                const response = await fetch("http://localhost:3000/e");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                console.log(data);
                setEquipment(data);
            } catch (err) {
                console.error("Error fetching equipment:", err.message);
            }
        };
        getEquipment();
    }, []);
    
    
    // Function to handle edit button click
    const handleEdit = (id) => {
        navigate(`/eedit/${id}`); // Navigates to the edit page with the equipment ID
    };

    // Function to handle delete button click
    const handleDelete = (id) => {
        navigate(`/remequip/${id}`); // Navigates to the delete page with the equipment ID
    };
    

    // Function to handle delete button click
    /*const handleDelete = (id) => {
        navigate(`/edelete/${id}`);
    };*/

    return (
        <div>
            <h1>All Equipments</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Condition</th>
                        <th>Model Number</th>
                        <th>Actions</th> {/* New column for Edit/Delete buttons */}
                    </tr>
                </thead>
                <tbody>
                    {equipment.map((Equipment) => (
                        <tr key={Equipment._id}>
                            <td>{Equipment.name}</td>
                            <td>{Equipment.discription}</td>
                            <td>{Equipment.category}</td>
                            <td>{Equipment.condition}</td>
                            <td>{Equipment.model_number}</td>
                    
                            <td>

                                    <button onClick={() => handleEdit(Equipment._id)}>Edit</button>
                                    <button onClick={() => handleDelete(Equipment._id)}>Remove</button>
                                </td>
                            
                        </tr>  
                    ))}
                </tbody>
            </table>
        </div>
    );

}

