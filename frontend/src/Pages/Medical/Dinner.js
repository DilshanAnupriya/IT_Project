import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MedicalSidebar from '../../Components/Medicaldashboard/MedicalSidebar';
import dinnerImage from '../../Assets/Medical/Dinner.jpg'; // Adjust the path as necessary
import backgroundImage from '../../Assets/Medical/b3.jpg'; // Adjust the path as necessary

const Dinner = () => {
  const [dinnerData, setDinnerData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDinnerData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/Dinner');
        setDinnerData(response.data.dinn);
      } catch (error) {
        console.error('Error fetching dinner data:', error);
      }
    };

    fetchDinnerData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/Dinner/delete/${id}`);
      setDinnerData(dinnerData.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting dinner item:', error);
    }
  };

  const toggleDescription = (item) => {
    setSelectedItem(prevItem => (prevItem && prevItem._id === item._id ? null : item));
  };

  return (
    <div className="flex">
      <MedicalSidebar />
      <div
        className="container mx-auto p-52 ml-64 flex"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          width: '100%',
          backgroundPosition: 'center',
        }}
      >
        <div className="flex justify-end mb-8 space-x-12 mr-96">
          {/* Dinner Button */}
          <div
            className="w-60 h-60 bg-cover bg-center rounded-full cursor-pointer"
            style={{ backgroundImage: `url(${dinnerImage})` }}
            onClick={() => navigate('/dinner')}
          >
            <p className="text-center mt-48 text-white font-bold">Dinner</p>
          </div>
        </div>
        <div className="flex-1 ml-8">
          <h1 className="text-2xl font-bold text-white mb-4">Dinner Items</h1>
          <button
            className="mb-4 bg-blue-500 text-white py-2 px-4 rounded"
            onClick={() => navigate('/dinner/add')}
          >
            Add Dinner
          </button>
          <div className="h-96 overflow-y-auto">
            {dinnerData.map((item) => (
              <div key={item._id} className="mb-4">
                <button
                  className="w-full text-left bg-gray-200 py-2 px-4 rounded"
                  onClick={() => toggleDescription(item)}
                >
                  {item.DNutrition_title}
                </button>
                {selectedItem && selectedItem._id === item._id && (
                  <div className="mt-2 bg-white py-2 px-4 rounded shadow-lg">
                    <p className="text-gray-700">{item.DNutrition_description}</p>
                    <div className="mt-2 flex justify-end space-x-2">
                      <button
                        className="bg-yellow-500 text-white py-1 px-2 rounded"
                        onClick={() => navigate(`/dinner/edit/${item._id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white py-1 px-2 rounded"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dinner;