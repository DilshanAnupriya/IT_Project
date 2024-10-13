import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Breakfast = () => {
  const [breakfastData, setBreakfastData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBreakfastData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/Breakfast');
        setBreakfastData(response.data.bfast);
      } catch (error) {
        console.error('Error fetching breakfast data:', error);
      }
    };

    fetchBreakfastData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/Breakfast/delete/${id}`);
      setBreakfastData(breakfastData.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting breakfast item:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Breakfast Items</h1>
      <button
        className="mb-4 bg-blue-500 text-white py-2 px-4 rounded"
        onClick={() => navigate('/breakfast/add')}
      >
        Add Breakfast
      </button>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {breakfastData.map((item) => (
            <tr key={item._id}>
              <td className="py-2 px-4 border-b">{item.Nutrition_title}</td>
              <td className="py-2 px-4 border-b">{item.Nutrition_description}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-yellow-500 text-white py-1 px-2 rounded mr-2"
                  onClick={() => navigate(`http://localhost:3000/Breakfast/edit/${item._id}`)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white py-1 px-2 rounded"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Breakfast;