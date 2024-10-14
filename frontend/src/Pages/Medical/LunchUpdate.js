import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import MedicalSidebar from '../../Components/Medicaldashboard/MedicalSidebar';


const LunchUpdate = () => {
  const [formData, setFormData] = useState({
    LNutrition_title: '',
    LNutrition_description: '',
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchLunchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/Lunch/${id}`);
        setFormData(response.data.lunc);
      } catch (error) {
        console.error('Error fetching lunch data:', error);
      }
    };

    fetchLunchData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/Lunch/update/${id}`, formData);
      navigate('/lunch');
    } catch (error) {
      console.error('Error updating lunch:', error);
    }
  };

  return (
    <div className="flex">
      <MedicalSidebar />
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Update Lunch</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
          <input 
            type="text"
            name="LNutrition_title"
            value={formData.LNutrition_title}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
          <textarea
            name="LNutrition_description"
            value={formData.LNutrition_description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button 
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Lunch
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default LunchUpdate;