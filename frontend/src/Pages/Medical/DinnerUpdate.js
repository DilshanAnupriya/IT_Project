import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DinnerUpdate = () => {
  const [formData, setFormData] = useState({
    DNutrition_title: '',
    DNutrition_description: '',
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchDinnerData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/Dinner/${id}`);
        setFormData(response.data.dinn);
      } catch (error) {
        console.error('Error fetching dinner data:', error);
      }
    };

    fetchDinnerData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/Dinner/update/${id}`, formData);
      navigate('/dinner');
    } catch (error) {
      console.error('Error updating dinner:', error);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Update Dinner</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
          <input 
            type="text"
            name="DNutrition_title"
            value={formData.DNutrition_title}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
          <textarea
            name="DNutrition_description"
            value={formData.DNutrition_description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button 
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Dinner
          </button>
        </div>
      </form>
    </div>
  );
};

export default DinnerUpdate;