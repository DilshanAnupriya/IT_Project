import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import MedicalSidebar from '../../Components/Medicaldashboard/MedicalSidebar';



const BreakfastUpdate = () => {
  const [formData, setFormData] = useState({
    Nutrition_title: '',
    Nutrition_description: '',
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchBreakfastData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/Breakfast/${id}`);
        setFormData(response.data.bfast);
      } catch (error) {
        console.error('Error fetching breakfast data:', error);
      }
    };

    fetchBreakfastData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/Breakfast/update/${id}`, formData);
      navigate('/breakfast');
    } catch (error) {
      console.error('Error updating breakfast:', error);
    }
  };

  return (
    <div className="flex">
      <MedicalSidebar />
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Update Breakfast</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
          <input 
            type="text"
            name="Nutrition_title"
            value={formData.Nutrition_title}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
          <textarea
            name="Nutrition_description"
            value={formData.Nutrition_description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button 
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Breakfast
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default BreakfastUpdate;