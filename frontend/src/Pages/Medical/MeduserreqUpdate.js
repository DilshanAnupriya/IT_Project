import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import MedicalSidebar from '../../Components/Medicaldashboard/MedicalSidebar'; // Adjust the import path as necessary

const MeduserreqUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [input, setInputs] = useState({
    Elder_firstname: "",
    Elder_lastname: "",
    Age: "",
    Gender: "Male",  // default value
    Current_need: "",
    Summary: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/medreport/${id}`);
        setInputs(response.data);
      } catch (error) {
        console.error('Error fetching report:', error);
      }
    };

    fetchReport();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errorMsg = "";

    switch (name) {
      case "Elder_firstname":
      case "Elder_lastname":
      case "Age":
      case "Gender":
      case "Current_need":
      case "Summary":
      default:
        break;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMsg,
    }));
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = {};

    if (!input.Elder_firstname) {
      valid = false;
      newErrors.Elder_firstname = "First name is required";
    }
    if (!input.Elder_lastname) {
      valid = false;
      newErrors.Elder_lastname = "Last name is required";
    }
    if (!input.Age || input.Age === "0") {
      valid = false;
      newErrors.Age = "Age is required and should be greater than 0";
    }
    if (!input.Gender) {
      valid = false;
      newErrors.Gender = "Gender is required";
    }
    if (!input.Current_need) {
      valid = false;
      newErrors.Current_need = "Current need is required";
    }
    if (!input.Summary) {
      valid = false;
      newErrors.Summary = "Summary is required";
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      sendRequest();
    }
  };

  const sendRequest = async () => {
    await axios.put(`http://localhost:3000/medreport/update/${id}`, {
      Elder_firstname: String(input.Elder_firstname),
      Elder_lastname: String(input.Elder_lastname),
      Age: Number(input.Age),
      Gender: String(input.Gender),
      Current_need: String(input.Current_need),
      Summary: String(input.Summary),
    }).then(res => res.data)
      .then(() => navigate('/meduserreqDisplay'));
  };

  return (
    <div className="flex">
      <MedicalSidebar />
      <div className="container mx-auto mt-10 ml-72">
        <h2 className="text-2xl font-bold mb-4">Update Elder Care Request</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Elder First Name</label>
            <input
              type="text"
              name="Elder_firstname"
              value={input.Elder_firstname}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            {errors.Elder_firstname && <span className="text-red-500 text-xs">{errors.Elder_firstname}</span>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Elder Last Name</label>
            <input
              type="text"
              name="Elder_lastname"
              value={input.Elder_lastname}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            {errors.Elder_lastname && <span className="text-red-500 text-xs">{errors.Elder_lastname}</span>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Age</label>
            <input
              type="number"
              name="Age"
              value={input.Age}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            {errors.Age && <span className="text-red-500 text-xs">{errors.Age}</span>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
            <select
              name="Gender"
              value={input.Gender}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {errors.Gender && <span className="text-red-500 text-xs">{errors.Gender}</span>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Current Need</label>
            <input
              type="text"
              name="Current_need"
              value={input.Current_need}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            {errors.Current_need && <span className="text-red-500 text-xs">{errors.Current_need}</span>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Summary</label>
            <input
              type="text"
              name="Summary"
              value={input.Summary}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            {errors.Summary && <span className="text-red-500 text-xs">{errors.Summary}</span>}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MeduserreqUpdate;