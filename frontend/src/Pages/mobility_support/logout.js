import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LogOut() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle when the user selects 'Yes'
  const handleYes = () => {
    // Set an error message instead of logging out
    setError("Error: Unable to log out at this time.");
  };

  // Handle when the user selects 'No'
  const handleNo = () => {
    // Navigate back to the Home page
    navigate("/home");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Do you want to log out?</h1>
      <div style={{ margin: "20px" }}>
        <button 
          onClick={handleYes}
          style={{ marginRight: "20px", padding: "10px", backgroundColor: "#f44336", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}
        >
          Yes
        </button>
        <button 
          onClick={handleNo}
          style={{ padding: "10px", backgroundColor: "#4CAF50", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}
        >
          No
        </button>
      </div>
      {error && (
        <div style={{ color: "red", marginTop: "20px" }}>
          {error}
        </div>
      )}
    </div>
  );
}
