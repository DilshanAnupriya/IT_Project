import React, { useState } from 'react';
import axios from 'axios';
import MedicalSidebar from '../../Components/Medicaldashboard/MedicalSidebar';


const LunchForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/Lunch/add', {
        LNutrition_title: title,
        LNutrition_description: description,
      });
      alert('Lunch added successfully');
    } catch (error) {
      console.error('Error adding lunch:', error);
    }
  };

  return (
    <div className="flex">
      <MedicalSidebar />
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Add Lunch</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
          <input 
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button 
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Lunch
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default LunchForm;