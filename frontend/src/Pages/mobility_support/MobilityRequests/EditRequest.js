import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function EditRequest() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [request, setRequest] = useState({
        elderId: "",
        requests: ""
    });
    const [error, setError] = useState("");

    // Fetch request details by ID
    useEffect(() => {
        axios.get(`http://localhost:3000/request/get/${id}`)
            .then((res) => {
                if (res.data.success) {
                    setRequest(res.data.request);
                } else {
                    alert("Error fetching request");
                }
            })
            .catch((err) => {
                console.error(err);
                alert("Error fetching request");
            });
    }, [id]);

    // Handle input changes to update form fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRequest({ ...request, [name]: value });
    };

    // Handle update request
    const handleUpdate = () => {
        // Frontend validation for empty fields
        if (!request.elderId || !request.requests) {
            setError("Elder ID and Request fields cannot be empty");
            return;
        }

        // Update the request in the backend
        axios.put(`http://localhost:3000/request/update/${id}`, request)
            .then((res) => {
                if (res.data.success) {
                    navigate("/request"); // Navigate to the list of requests
                } else {
                    alert("Error updating request");
                }
            })
            .catch((err) => {
                console.error(err);
                alert("Error updating request");
            });
    };

    // If request data is not loaded yet, show a loading message
    if (!request) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container" style={{ margin: "50px 0px 0px 50px" }}>
            <h2 style={{ textAlign: 'center', marginTop: '0px' }}>Update Request</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            {/* Elder ID Field */}
            <div className="row mb-3">
                <label className="col-sm-2 col-form-label" style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                    Elder ID
                </label>
                <div className="col-sm-10">
                    <input
                        type="text"
                        className="form-control"
                        name="elderId"
                        value={request.elderId}
                        onChange={handleInputChange}
                        placeholder="Enter Elder ID"
                        style={{ fontSize: '1.1rem' }} // Ensure the input text is consistent
                    />
                </div>
            </div>

            {/* Request Field */}
            <div className="row mb-3">
                <label className="col-sm-2 col-form-label" style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                    Request
                </label>
                <div className="col-sm-10">
                    <input
                        type="text"
                        className="form-control"
                        name="requests"
                        value={request.requests}
                        onChange={handleInputChange}
                        placeholder="Enter Request"
                        style={{ fontSize: '1.1rem' }} // Ensure the input text is consistent
                    />
                </div>
            </div>

            {/* Update Button */}
            <div className="row mb-3">
                <div className="col-sm-10 offset-sm-2">
                    <button className="btn btn-primary" onClick={handleUpdate}>
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
}
