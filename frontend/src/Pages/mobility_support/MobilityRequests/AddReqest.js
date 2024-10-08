import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    validateElderId,
} from './../Validation/RequestValidation' 


export default function AddRequest() {

    const [elderId, setElderId] = useState("");
    const [requests, setRequests] = useState("");

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();


    const validateForm = () => {
        const newErrors = {};

        newErrors.elderId = validateElderId(elderId);

        setErrors(newErrors);

        return Object.values(newErrors).every((error) => error === null);
    };

    const sendDate = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const newRequests = {
            elderId,
            requests
        };

        console.log("Sending data:", newRequests); // Log data being sent

        axios.post("http://localhost:3000/request/add", newRequests)
            .then(() => {
                alert("Request Added");
                navigate('/rall'); // Navigate to another page after successful submission
            })
            .catch((err) => {
                console.error("Error details:", err.response?.data || err.message); // Log error details
                alert("Error adding request: " + (err.response?.data?.message || err.message));
            });
    };


    return (
        <div className="container">
            <form onSubmit={sendDate}>
                <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    <h2>Add Request</h2>
                </div>
                <div className="form-group">
                    <label htmlFor="elderId">Elder Id</label>
                    <input
                        type="text"
                        className="form-control"
                        id="elderId"
                        placeholder="Enter Elder Id"
                        value={elderId}
                        onChange={(e) => setElderId(e.target.value)}
                    />
                    {errors.elderId && <div style={{ color: 'red' }}>{errors.elderId}</div>}
                </div>
                
                <div className="form-group">
                    <label htmlFor="requests">requests</label>
                    <input
                        type="text"
                        className="form-control"
                        id="requests"
                        placeholder="Enter requests"
                        value={requests}
                        onChange={(e) => setRequests(e.target.value)}
                    />
                </div>
                
                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );

}

