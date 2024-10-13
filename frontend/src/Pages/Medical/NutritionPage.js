import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import breakfastImage from '../../Assets/Medical/Breakfast.jpg'; // Adjust the path as necessary
import lunchImage from '../../Assets/Medical/Lunch.jpg'; // Adjust the path as necessary
import dinnerImage from '../../Assets/Medical/Dinner.jpg'; // Adjust the path as necessary
import MedicalSidebar from '../../Components/Medicaldashboard/MedicalSidebar';

const NutritionPage = () => {
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [mealData, setMealData] = useState(null);
  const navigate = useNavigate();

  // Function to fetch data from respective endpoints
  const fetchMealData = async (mealType) => {
    try {
      const response = await axios.get(`http://localhost:3000/nutrition/${mealType}`);
      setMealData(response.data[mealType]);
      setSelectedMeal(mealType);
    } catch (error) {
      console.error(`Error fetching ${mealType}:`, error);
    }
  };

  return (
    <div className="flex">
      <MedicalSidebar />
      <div className="container mx-auto mt-10 ml-72"> </div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full flex justify-start p-6">
        </div>
        
        <h2 className="text-2xl font-bold mb-6">Select Meal Type</h2>
        
        <div className="flex justify-evenly mb-8 space-x-6">
          {/* Breakfast Button */}
          <div
            className="w-40 h-40 bg-cover bg-center rounded-full cursor-pointer"
            style={{ backgroundImage: `url(${breakfastImage})` }}
            onClick={() => navigate('/breakfast')}
          >
            <p className="text-center mt-32 text-white font-bold">Breakfast</p>
          </div>

          {/* Lunch Button */}
          <div
            className="w-40 h-40 bg-cover bg-center rounded-full cursor-pointer"
            style={{ backgroundImage: `url(${lunchImage})` }}
            onClick={() => navigate('/lunch')}
          >
            <p className="text-center mt-32 text-white font-bold">Lunch</p>
          </div>

          {/* Dinner Button */}
          <div
            className="w-40 h-40 bg-cover bg-center rounded-full cursor-pointer"
            style={{ backgroundImage: `url(${dinnerImage})` }}
            onClick={() => navigate('/dinner')}
          >
            <p className="text-center mt-32 text-white font-bold">Dinner</p>
          </div>
        </div>

        {/* Display Selected Meal Data */}
        {selectedMeal && mealData && (
          <div className="w-2/3 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              {selectedMeal.charAt(0).toUpperCase() + selectedMeal.slice(1)} Details
            </h2>
            {mealData.map((item) => (
              <div key={item._id} className="mb-4">
                <h3 className="font-bold">{item.Nutrition_title}</h3>
                <p>{item.Nutrition_description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NutritionPage;