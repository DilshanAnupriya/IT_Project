import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function ManageProfile() {
  const { id } = useParams(); // Get the id from the URL
  const navigate = useNavigate();

  // State for storing schedule details
  const [elderId, setElderId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [email, setEmail] = useState("");
  const [NIC, setNIC] = useState("");
  const [current_status, setCurrent_status] = useState("");
  const [current_physical_condition, setCurrent_physical_condition] = useState("");
  const [previous_therapy, setPrevious_therapy] = useState("");
  const [therapy_goal, setTherapy_goal] = useState("");
  
  const [errors, setErrors] = useState({}); // For handling validation errors if needed

  // Fetch schedule details using the id from the URL
  useEffect(() => {
    axios.get(`http://localhost:3000/shedule/get/${id}`).then((res) => {
      if (res.data.success) {
        const shedule = res.data.shedule;
        // Set the state with fetched schedule details
        setElderId(shedule.elderId);
        setName(shedule.name);
        setAge(shedule.age);
        setPhone_number(shedule.phone_number);
        setEmail(shedule.email);
        setNIC(shedule.NIC);
        setCurrent_status(shedule.current_status);
        setCurrent_physical_condition(shedule.current_physical_condition);
        setPrevious_therapy(shedule.previous_therapy);
        setTherapy_goal(shedule.therapy_goal);
        setCurrent_status(shedule.current_status);
      }
    }).catch((err) => {
      console.error("Error fetching schedule details:", err);
    });
  }, [id]); // Dependency array with id

  // Handle form submission for updating the schedule
  const onSubmit = (e) => {
    e.preventDefault();

    const updatedShedule = {
      elderId,
      name,
      age,
      phone_number,
      email,
      NIC,
      current_status,
      current_physical_condition,
      previous_therapy,
      therapy_goal,
      current_status,
    };

    axios.put(`http://localhost:3000/shedule/update/${id}`, updatedShedule)
      .then(() => {
        alert("Schedule Updated Successfully");
        navigate("/elder"); // Redirect to desired page after update
      })
      .catch((err) => {
        alert("Error updating schedule:", err);
      });
  };

  // Navigate to ViewShedule page
  const handleViewProfile = () => {
    navigate(`/viewOne/${id}`); // Navigate to ViewShedule with the current ID
  };

  return (
    <div className="container" style={{ margin: "0px 0px 0px 50px",
        width: "40%",  // Adjust width to make it smaller
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
     backgroundColor: "#9BA4BF",
      padding: "10px", 
      borderRadius: "10px" }}
      >
      <h2>Manage Elder Profile</h2>
      <form onSubmit={onSubmit}>
        {/* Form fields */}
        <div className="form-group">
          <label>Elder ID</label>
          <input
            type="text"
            className="form-control"
            value={elderId}
            onChange={(e) => setElderId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            className="form-control"
            value={phone_number}
            onChange={(e) => setPhone_number(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>NIC</label>
          <input
            type="text"
            className="form-control"
            value={NIC}
            onChange={(e) => setNIC(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Current Status</label>
          <input
            type="text"
            className="form-control"
            value={current_status}
            onChange={(e) => setCurrent_status(e.target.value)}
            required
          />
        </div>
       
       
        <button type="submit" className="btn btn-primary">Update Profile</button>
        <button type="button" className="btn btn-info ml-3" onClick={handleViewProfile}>
          View Added Shedules
        </button>
      </form>
    </div>
  );
}
