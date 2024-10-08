import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function RemoveRequest() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [request, setRequest] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/request/get/${id}`).then((res) => {
            if (res.data.success) {
                setRequest(res.data.request);
            } else {
                alert("Error fetching request");
            }
        }).catch(err => {
            console.error(err);
            alert("Error fetching request");
        });
    }, [id]);
  
    const handleDelete = () => {
        axios.delete(`http://localhost:3000/request/delete/${id}`).then((res) => {
            if (res.data.success) {
                navigate("/rall"); // Replace with your route to the list of requests
            } else {
                alert("Error deleting request");
            }
        }).catch(err => {
            console.error(err);
            alert("Error deleting request");
        });
    };
  
    if (!request) {
        return <div>Loading...</div>; // Show a loading message while fetching data
    }

    return (
        <div className="container" style={{ margin: "50px 0px 0px 50px" }}>
            <h2>Request Details</h2>
            <div className="row mb-3">
                <label className="col-sm-2 col-form-label" style={{ fontSize: '1rem', fontWeight: 'bold' }}>Elder Id</label>
                <div className="col-sm-10">
                    <p className="form-control-plaintext" style={{ fontSize: '1rem' }}>{request.elderId}</p>
                </div>
            </div>
  
            <div className="row mb-3">
                <label className="col-sm-2 col-form-label" style={{ fontSize: '1rem', fontWeight: 'bold' }}>Request</label>
                <div className="col-sm-10">
                    <p className="form-control-plaintext" style={{ fontSize: '1rem' }}>{request.requests}</p>
                </div>
            </div>
  
            <div className="row mb-3">
                <div className="col-sm-10 offset-sm-2">
                    <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
    );
}
