import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateRecruitment = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_no: '',
    gender: 'Male',
    address: '',
    edu_qualifications: 'High School',
    computerLiteracy: 'Yes',
    experience: 'No',
    yearsOfQualification: '0-2',
    englishSkills: 'Good',
    reference: ''
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchRecruitmentData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/requests/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching recruitment data:', error);
      }
    };

    fetchRecruitmentData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.put(`http://localhost:3000/requests/update/${id}`, formData);
      console.log('Update response:', response.data); // Add this line to debug
      navigate('/empForm');
    } catch (error) {
      console.error('Error updating recruitment:', error);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Update Recruitment</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className='fields37'>
          <div className='input-field37'>
            <label>Name (First and Last)</label>
            <input 
              type='text' 
              onChange={handleChange} 
              placeholder='Enter Your Full Name' 
              value={formData.name} 
              name='name' 
              required 
            />
          </div>
          <div className='input-field37'>
            <label>Email Address</label>
            <input 
              type='email' 
              onChange={handleChange} 
              placeholder='Enter Your Email' 
              value={formData.email} 
              name='email' 
              required 
            />
          </div>
          <div className='input-field37'>
            <label>Phone Number</label>
            <input 
              type='tel' 
              onChange={handleChange} 
              placeholder='Enter Your Phone Number' 
              value={formData.phone_no} 
              name='phone_no' 
              required 
            />
          </div>
          <div className='input-field37'>
            <label>Gender</label>
            <select name="gender" onChange={handleChange} value={formData.gender}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className='input-field37'>
            <label>Address</label>
            <input 
              type='text' 
              onChange={handleChange} 
              placeholder='Enter Your Address' 
              value={formData.address} 
              name='address' 
              required 
            />
          </div>
          <div className='input-field37'>
            <label>Education Qualification</label>
            <select name="edu_qualifications" onChange={handleChange} value={formData.edu_qualifications}>
              <option value="High School">High School</option>
              <option value="Diploma">Diploma</option>
              <option value="Undergraduate">Undergraduate</option>
              <option value="Postgraduate">Postgraduate</option>
            </select>
          </div>
          <div className='input-field37'>
            <label>Computer Literacy</label>
            <select name="computerLiteracy" onChange={handleChange} value={formData.computerLiteracy}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className='input-field37'>
            <label>Do you have experience in a similar role?</label>
            <select name="experience" onChange={handleChange} value={formData.experience}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className='input-field37'>
            <label>Years of Qualification</label>
            <select name="yearsOfQualification" onChange={handleChange} value={formData.yearsOfQualification}>
              <option value="0-2">0-2 Years</option>
              <option value="3-5">3-5 Years</option>
              <option value="5+">5+ Years</option>
            </select>
          </div>
          <div className='input-field37'>
            <label>English Speaking Skills</label>
            <select name="englishSkills" onChange={handleChange} value={formData.englishSkills}>
              <option value="Good">Good</option>
              <option value="Fluent">Fluent</option>
              <option value="Basic">Basic</option>
            </select>
          </div>
          <div className='input-field37'>
            <label>Reference</label>
            <input 
              type='text' 
              onChange={handleChange} 
              placeholder='Enter Reference Name' 
              value={formData.reference} 
              name='reference' 
              required 
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Update Recruitment
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateRecruitment;