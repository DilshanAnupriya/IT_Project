import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddEquipments(){

    const[name,setName] = useState (""); 
    const [discription, setDiscription ] = useState ("");
    const [category ,setCategory] = useState ("");
    const [condition ,setCondition] = useState ("");
    const [model_number,setModel_number] = useState ("");

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const sendDate = (e) => {
        e.preventDefault();

    const newEquipments = {
        name, 
        discription,
        category ,
        condition ,
        model_number
    };

    console.log("Sending data:", newEquipments); // Log data being sent

    axios.post("http://localhost:3000/e/add", newEquipments)
    .then(() => {
        alert("Equipment Added");
        navigate('/equipments'); // Navigate to another page after successful submission
    })
    .catch((err) => {
        console.error("Error details:", err.response?.data || err.message); // Log error details
        alert("Error adding equipment: " + (err.response?.data?.message || err.message));
    });
};

    return(
        <div className="container">
        <form onSubmit={sendDate}>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <h2>Add Equipments</h2>
            </div>
            <div className="form-group">
                <label htmlFor="model_number">Equipment Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter Equipment name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

            </div>
            <div className="form-group">
                <label htmlFor="discription">Equipment Discription</label>
                <input
                    type="text"
                    className="form-control"
                    id="discription"
                    placeholder="Enter Discription"
                    value={discription}
                    onChange={(e) => setDiscription(e.target.value)}
                />

            </div>
            <div className="form-group">
                <label htmlFor="category">Equipment Category</label>
                <input
                    type="text"
                    className="form-control"
                    id="category"
                    placeholder="Enter Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />

            </div>
            <div className="form-group">
                <label htmlFor="condition">Equipment Condition</label>
                <input
                    type="text"
                    className="form-control"
                    id="condition"
                    placeholder="Enter Condition"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                />

            </div>

            <div className="form-group">
                    <label htmlFor="model_number">Model Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="model_number"
                        placeholder="Equipment Model Number"
                        value={model_number}
                        onChange={(e) => setModel_number(e.target.value)}
                    />
                </div>
                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )

}