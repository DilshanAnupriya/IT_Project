import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Lunch = () => {
  const [lunchData, setLunchData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLunchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/Lunch'); 
        setLunchData(response.data.lunc);
      } catch (error) {
        console.error('Error fetching lunch data:', error);
      }
    };

    fetchLunchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/Lunch/delete/${id}`);
      setLunchData(lunchData.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting lunch item:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lunch Items</h1>
      <button
        className="mb-4 bg-blue-500 text-white py-2 px-4 rounded"
        onClick={() => navigate('/lunch/add')}
      >
        Add Lunch
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
          {lunchData.map((item) => (
            <tr key={item._id}>
              <td className="py-2 px-4 border-b">{item.LNutrition_title}</td>
              <td className="py-2 px-4 border-b">{item.LNutrition_description}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-yellow-500 text-white py-1 px-2 rounded mr-2"
                  onClick={() => navigate(`/lunch/edit/${item._id}`)}
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

export default Lunch;