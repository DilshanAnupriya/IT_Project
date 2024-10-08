import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function ViewShedule() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [shedule, setShedule] = useState({});
  
  useEffect(() => {
    axios.get(`http://localhost:3000/shedule/get/${id}`)
      .then((res) => {
        if (res.data.success) {
          setShedule(res.data.shedule);
        } else {
          alert("Error fetching schedule");
        }
      })
      .catch(err => {
        console.error(err);
        alert("Error fetching schedule");
      });
  }, [id]);

  const handleDelete = () => {
    axios.delete(`http://localhost:3000/shedule/delete/${id}`)
      .then((res) => {
        if (res.data.success) {
          navigate("/Therapy"); // Navigate to the list of schedules
        } else {
          alert("Error deleting schedule");
        }
      })
      .catch(err => {
        console.error(err);
        alert("Error deleting schedule");
      });
  };

  const renderDetail = (label, value) => (
    <div className="row mb-3 detail-row">
      <label className="col-sm-4 col-form-label">{label}</label>
      <div className="col-sm-8">
        <p className="form-control-plaintext">{value || '-'}</p>
      </div>
    </div>
  );

  return (
    <div className="container" style={{ margin: "50px 0px 0px 50px" }}>
      {renderDetail("Elder Id", shedule.elderId)}
      {renderDetail("Name", shedule.name)}
      {renderDetail("Age", shedule.age)}
      {renderDetail("Phone Number", shedule.phone_number)}
      {renderDetail("Email", shedule.email)}
      {renderDetail("NIC", shedule.NIC)}
      {renderDetail("Current Status", shedule.current_status)}
      {renderDetail("Current Physical Condition", shedule.current_physical_condition)}
      {renderDetail("Previous Therapy", shedule.previous_therapy)}
      {renderDetail("Therapy Goal", shedule.therapy_goal)}
      {renderDetail("Date", shedule.date)}
      {renderDetail("Preferred Time", shedule.preffered_time)}
      {renderDetail("Frequency", shedule.frequency)}
      {renderDetail("Location", shedule.location)}

      <div className="row mb-3">
        <div className="col-sm-10 offset-sm-2">
          <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>

      {/* Inline CSS for styling */}
      <style jsx>{`
        .detail-row {
          display: flex; /* Use flexbox for alignment */
          align-items: center; /* Center items vertically */
        }
        
        .col-form-label {
          font-size: 1rem;
          font-weight: bold;
          width: 200px; /* Adjust this width to ensure proper alignment */
        }

        .form-control-plaintext {
          font-size: 1rem;
        }
      `}</style>
    </div>
  );
}


