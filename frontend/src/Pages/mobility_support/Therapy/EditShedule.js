import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { validateElderId, validatePhoneNumber, validateNIC, validateDate, validateTime } from './../Validation/SheduleValidation';
import './../../mobility_support/Styles.css';

export default function EditShedule() {
  const { id } = useParams();
  const navigate = useNavigate();

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
  const [date, setDate] = useState("");
  const [preffered_time, setPreffered_time] = useState("");
  const [frequency, setFrequency] = useState("");
  const [location, setLocation] = useState("");

  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3000/shedule/get/${id}`).then((res) => {
      if (res.data.success) {
        const shedule = res.data.shedule;
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
        setDate(shedule.date);
        setPreffered_time(shedule.preffered_time);
        setFrequency(shedule.frequency);
        setLocation(shedule.location);
      }
    });
  }, [id]);

  const validateForm = () => {
    const newErrors = {};
    newErrors.elderId = validateElderId(elderId);
    newErrors.phone_number = validatePhoneNumber(phone_number);
    newErrors.NIC = validateNIC(NIC);
    newErrors.date = validateDate(date);
    newErrors.preffered_time = validateTime(preffered_time);

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== null);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

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
      date,
      preffered_time,
      frequency,
      location,
    };

    axios.put(`http://localhost:3000/shedule/update/${id}`, updatedShedule)
      .then(() => {
        alert("Schedule Updated");
        navigate("/Therapy");
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="container" style={{ margin: "50px 0px 0px 50px", backgroundColor: "#9BA4BF", padding: "20px", borderRadius: "8px" }}>
      <h2 className="text-center mb-4" style={{ color: "#fff" }}>Edit Schedule</h2>
      <form onSubmit={onSubmit}>
        {[
          { label: "Elder Id", value: elderId, setter: setElderId, error: errors.elderId },
          { label: "Name", value: name, setter: setName },
          { label: "Age", value: age, setter: setAge },
          { label: "Phone Number", value: phone_number, setter: setPhone_number, error: errors.phone_number },
          { label: "Email", value: email, setter: setEmail },
          { label: "NIC", value: NIC, setter: setNIC, error: errors.NIC },
          { label: "Current Status", value: current_status, setter: setCurrent_status },
          { label: "Current Physical Condition", value: current_physical_condition, setter: setCurrent_physical_condition },
          { label: "Previous Therapy", value: previous_therapy, setter: setPrevious_therapy },
          { label: "Therapy Goal", value: therapy_goal, setter: setTherapy_goal },
          { label: "Date", value: date, setter: setDate, type: "date", error: errors.date },
          { label: "Preferred Time", value: preffered_time, setter: setPreffered_time, type: "time", error: errors.preffered_time },
          { label: "Frequency", value: frequency, setter: setFrequency },
          { label: "Location", value: location, setter: setLocation },
        ].map(({ label, value, setter, type = "text", error }) => (
          <div className="row mb-3" key={label}>
            <label className="col-sm-2 col-form-label" style={{ minWidth: "150px" }}>{label}</label>
            <div className="col-sm-10">
              <input
                type={type}
                className="form-control"
                value={value}
                onChange={(e) => setter(e.target.value)}
              />
              {error && <small className="text-danger">{error}</small>}
            </div>
          </div>
        ))}
        <button type="submit" className="btn" style={{ backgroundColor: "#6B75FE", color: "#fff" }}>
          Update Schedule
        </button>
      </form>
    </div>
  );
}
