import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import MedicalSidebar from '../../Components/Medicaldashboard/MedicalSidebar'; // Adjust the import path as necessary

const PatientUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Elder_name: '',
    diagnosis: '',
    datein: '',
    roomnum: '',
    age: '',
    Prescription: '',
  });

  const [errors, setErrors] = useState({});
  const [charCount, setCharCount] = useState(0);
  const [prescriptionWordCount, setPrescriptionWordCount] = useState(0);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        console.log(`Fetching data for patient id: ${id}`); // Debug log
        const response = await axios.get(`http://localhost:3000/patient/${id}`);
        console.log('Fetched patient data:', response.data); // Debug log
        setFormData(response.data.pat); // Ensure the response structure matches
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    fetchPatientData();
  }, [id]);

  const validateElderName = (name) => {
    const regex = /^[A-Z][a-zA-Z\s]*$/;
    return regex.test(name);
  };

  const validateDiagnosis = (text) => {
    return text.length <= 200;
  };

  const validatePrescription = (text) => {
    return text.length <= 500;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate fields
    if (name === 'Elder_name') {
      if (!validateElderName(value)) {
        setErrors((prev) => ({ ...prev, Elder_name: 'Elder name must start with a capital letter and contain no numbers.' }));
      } else {
        setErrors((prev) => ({ ...prev, Elder_name: '' }));
      }
    }

    if (name === 'diagnosis') {
      setCharCount(value.length);
      if (!validateDiagnosis(value)) {
        setErrors((prev) => ({ ...prev, diagnosis: 'Diagnosis must be within 200 characters.' }));
      } else {
        setErrors((prev) => ({ ...prev, diagnosis: '' }));
      }
    }

    if (name === 'roomnum') {
      if (value === '0') {
        setErrors((prev) => ({ ...prev, roomnum: 'Room number cannot be 0.' }));
      } else {
        setErrors((prev) => ({ ...prev, roomnum: '' }));
      }
    }

    if (name === 'age') {
      if (value < 0) {
        setErrors((prev) => ({ ...prev, age: 'Age cannot be negative.' }));
      } else {
        setErrors((prev) => ({ ...prev, age: '' }));
      }
    }

    if (name === 'Prescription') {
      const wordCount = value.length;
      setPrescriptionWordCount(wordCount);
      if (!validatePrescription(value)) {
        setErrors((prev) => ({ ...prev, Prescription: 'Prescription must be within 500 characters.' }));
      } else {
        setErrors((prev) => ({ ...prev, Prescription: '' }));
      }
    }
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    const today = new Date().toISOString().split('T')[0];
    if (value < today) {
      setErrors((prev) => ({ ...prev, datein: 'Date of admit cannot be in the past.' }));
    } else {
      setErrors((prev) => ({ ...prev, datein: '' }));
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateElderName(formData.Elder_name)) {
      setErrors((prev) => ({ ...prev, Elder_name: 'Elder name must start with a capital letter and contain no numbers.' }));
      return;
    }
    if (!validateDiagnosis(formData.diagnosis)) {
      setErrors((prev) => ({ ...prev, diagnosis: 'Diagnosis must be within 200 characters.' }));
      return;
    }
    if (formData.roomnum === '0') {
      setErrors((prev) => ({ ...prev, roomnum: 'Room number cannot be 0.' }));
      return;
    }
    if (formData.age < 0) {
      setErrors((prev) => ({ ...prev, age: 'Age cannot be negative.' }));
      return;
    }
    if (!validatePrescription(formData.Prescription)) {
      setErrors((prev) => ({ ...prev, Prescription: 'Prescription must be within 500 characters.' }));
      return;
    }
    if (errors.datein) {
      return;
    }
    try {
      await axios.put(`http://localhost:3000/patient/update/${id}`, formData);
      navigate('/patientList');
    } catch (error) {
      console.error('Error updating patient:', error);
    }
  };

  const handleKeyPress = (e) => {
    const charCode = e.charCode;
    if (charCode >= 48 && charCode <= 57) {
      e.preventDefault();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text');
    if (/\d/.test(paste)) {
      e.preventDefault();
    }
  };

  const handleAgeKeyDown = (e) => {
    if (e.key === '-' && (formData.age === '' || formData.age <= 0)) {
      e.preventDefault();
    }
    if (e.key === 'e' || e.key === 'E') {
      e.preventDefault();
    }
  };

  return (
    <div className="flex">
      <MedicalSidebar />
      <div className="container mx-auto mt-10 ml-72">
        <h2 className="text-2xl font-bold mb-6">Update Patient</h2>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {/* Elder Name Field */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Elder Name:</label>
            <input 
              type="text"
              name="Elder_name"
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              onPaste={handlePaste}
              value={formData.Elder_name}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            {errors.Elder_name && <p className="text-red-500 text-xs italic">{errors.Elder_name}</p>}
          </div>

          {/* Diagnosis Field */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Diagnosis:</label>
            <input 
              type="text"
              name="diagnosis"
              onChange={handleChange}
              value={formData.diagnosis}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            {errors.diagnosis && <p className="text-red-500 text-xs italic">{errors.diagnosis}</p>}
            <p className="text-gray-600 text-xs italic">{charCount}/200 characters</p>
          </div>

          {/* Date of Admit Field */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Date of Admit:</label>
            <input 
              type="date"
              name="datein"
              onChange={handleDateChange}
              value={formData.datein}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            {errors.datein && <p className="text-red-500 text-xs italic">{errors.datein}</p>}
          </div>

          {/* Room No Field */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Room No:</label>
            <input 
              type="number"
              name="roomnum"
              onChange={handleChange}
              value={formData.roomnum}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            {errors.roomnum && <p className="text-red-500 text-xs italic">{errors.roomnum}</p>}
          </div>

          {/* Age Field */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Age:</label>
            <input 
              type="number"
              name="age"
              onChange={handleChange}
              onKeyDown={handleAgeKeyDown}
              value={formData.age}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            {errors.age && <p className="text-red-500 text-xs italic">{errors.age}</p>}
          </div>

          {/* Prescription Field */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Prescription:</label>
            <textarea 
              name="Prescription"
              onChange={handleChange}
              value={formData.Prescription}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            {errors.Prescription && <p className="text-red-500 text-xs italic">{errors.Prescription}</p>}
            <p className="text-gray-600 text-xs italic">{prescriptionWordCount}/500 characters</p>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <button 
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update Patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientUpdate;