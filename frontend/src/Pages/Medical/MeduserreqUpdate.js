import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import MedicalSidebar from '../../Components/Medicaldashboard/MedicalSidebar'; // Adjust the import path as necessary
import "../../Pages/Css/Medical/Medusercss.css";  // Make sure this path is correct

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
        console.log(`Fetching data for id: ${id}`); // Debug log
        const response = await axios.get(`http://localhost:3000/medreport/${id}`);
        console.log('Fetched data:', response.data); // Debug log
        setInputs(response.data);
      } catch (error) {
        console.error('Error fetching report:', error);
      }
    };

    fetchReport();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Prevent numbers in Elder_firstname and Elder_lastname
    if ((name === "Elder_firstname" || name === "Elder_lastname") && /\d/.test(value)) {
      return;
    }

    // Prevent letters in Age
    if (name === "Age" && /\D/.test(value)) {
      return;
    }

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
        if (!value) {
          errorMsg = "First name is required";
        } else if (/\d/.test(value)) {
          errorMsg = "First name should not contain numbers";
        }
        break;
      case "Elder_lastname":
        if (!value) {
          errorMsg = "Last name is required";
        } else if (/\d/.test(value)) {
          errorMsg = "Last name should not contain numbers";
        }
        break;
      case "Age":
        if (!value || value === "0") {
          errorMsg = "Age should not be 0";
        }
        break;
      case "Gender":
        if (!value) {
          errorMsg = "Gender is required";
        }
        break;
      case "Current_need":
        if (!value) {
          errorMsg = "Current need is required";
        } else if (value.length > 100) {
          errorMsg = "Current need should not exceed 100 characters";
        }
        break;
      case "Summary":
        if (!value) {
          errorMsg = "Summary is required";
        } else if (value.length > 250) {
          errorMsg = "Summary should not exceed 250 characters";
        }
        break;
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
    <div className='all'>
      <MedicalSidebar />
      <div className='container7'>
        <div className="header-box">
          <h2>Update Elder Care Request</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='fields7'>
            <div className='input-field7'>
              <label>Elder First Name</label>
              <input 
                type='text' 
                onChange={handleChange} 
                placeholder='Enter Elder First Name' 
                value={input.Elder_firstname} 
                name='Elder_firstname' 
                required 
              />
              {errors.Elder_firstname && <span className="error">{errors.Elder_firstname}</span>}
            </div>

            <div className='input-field7'>
              <label>Elder Last Name</label>
              <input 
                type='text' 
                onChange={handleChange} 
                placeholder='Enter Elder Last Name' 
                value={input.Elder_lastname} 
                name='Elder_lastname' 
                required 
              />
              {errors.Elder_lastname && <span className="error">{errors.Elder_lastname}</span>}
            </div>

            <div className='input-field7'>
              <label>Age</label>
              <input 
                type='number' 
                onChange={handleChange} 
                placeholder='Enter Age' 
                value={input.Age} 
                name='Age' 
                required 
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
              />
              {errors.Age && <span className="error">{errors.Age}</span>}
            </div>

            <div className='input-field7'>
              <label>Gender</label>
              <select name="Gender" onChange={handleChange} value={input.Gender}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.Gender && <span className="error">{errors.Gender}</span>}
            </div>

            <div className='input-field7'>
              <label>Current Need</label>
              <input 
                type='text' 
                onChange={handleChange} 
                placeholder='Enter Current Need' 
                value={input.Current_need} 
                name='Current_need' 
                required 
              />
              <span className="char-count">{input.Current_need ? input.Current_need.length : 0}/100</span>
              {errors.Current_need && <span className="error">{errors.Current_need}</span>}
            </div>

            <div className='input-field7'>
              <label>Summary</label>
              <input 
                type='text' 
                onChange={handleChange} 
                placeholder='Enter Summary' 
                value={input.Summary} 
                name='Summary' 
                required 
              />
              <span className="char-count">{input.Summary ? input.Summary.length : 0}/250</span>
              {errors.Summary && <span className="error">{errors.Summary}</span>}
            </div>
          </div>

          <div className="button-container">
            <button className='subButton'>Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MeduserreqUpdate;