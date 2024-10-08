import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ViewShedule() {
  const { id } = useParams();
  const [shedule, setShedule] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3000/shedule/get/${id}`).then((res) => {
      if (res.data.success) {
        setShedule(res.data.shedule);
      }
    });
  }, [id]);

  const renderDetail = (label, value) => (
    <div className="detail-row mb-3">
      <span className="detail-label">{label}</span>
      <span className="detail-value">{value || '-'}</span>
    </div>
  );

  return (
    <div className="container" style={{ paddingTop: "20px" }}>
      <div className="w-75">
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
        {renderDetail("Date", new Date(shedule.date).toLocaleDateString())} {/* Format the date for better readability */}
        {renderDetail("Preferred Time", shedule.preffered_time)}
        {renderDetail("Frequency", shedule.frequency)}
        {renderDetail("Location", shedule.location)}
      </div>

      {/* Inline CSS Styles */}
      <style jsx>{`
        .detail-row {
          display: flex; /* Use flexbox for alignment */
          align-items: center; /* Center items vertically */
          margin-bottom: 10px; /* Space between rows */
        }

        .detail-label {
          font-size: 1.2rem; /* Adjust size as needed */
          font-weight: bold; /* Make labels bold */
          color: #333; /* Dark color for better visibility */
          width: 200px; /* Fixed width for consistent alignment */
        }

        .detail-value {
          font-size: 1.2rem; /* Same size as labels */
          color: #555; /* Slightly lighter color for values */
          line-height: 1.5; /* Ensure spacing for readability */
          padding-left: 10px; /* Add some space between label and value */
          flex-grow: 1; /* Allow value to take up remaining space */
        }
      `}</style>
    </div>
  );
}
