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

  const handleMealClick = (mealType) => {
    navigate(`/${mealType}`);
  };

  return (
    <div className="flex">
      <MedicalSidebar />
      <div className="flex flex-col items-center justify-center min-h-screen ml-64" style={{ backgroundColor: '#9BA4BF' }}>
        <h2 className="text-4xl font-bold ml-16 mb-32 mt-8">Select Meal Type</h2>
        
        <div className="flex justify-end mb-8 space-x-12 mr-96 ml-96">
          {/* Breakfast Button */}
          <div
            className="flex flex-col items-center cursor-pointer transform transition-transform duration-300 hover:scale-105 focus:scale-105"
            onClick={() => handleMealClick('breakfast')}
          >
            <div
              className="w-60 h-60 bg-cover bg-center rounded-full"
              style={{ backgroundImage: `url(${breakfastImage})` }}
            ></div>
            <p className="mt-4 text-white font-bold">Breakfast</p>
          </div>

          {/* Lunch Button */}
          <div
            className="flex flex-col items-center cursor-pointer transform transition-transform duration-300 hover:scale-105 focus:scale-105"
            onClick={() => handleMealClick('lunch')}
          >
            <div
              className="w-60 h-60 bg-cover bg-center rounded-full"
              style={{ backgroundImage: `url(${lunchImage})` }}
            ></div>
            <p className="mt-4 text-white font-bold">Lunch</p>
          </div>

          {/* Dinner Button */}
          <div
            className="flex flex-col items-center cursor-pointer transform transition-transform duration-300 hover:scale-105 focus:scale-105"
            onClick={() => handleMealClick('dinner')}
          >
            <div
              className="w-60 h-60 bg-cover bg-center rounded-full"
              style={{ backgroundImage: `url(${dinnerImage})` }}
            ></div>
            <p className="mt-4 text-white font-bold">Dinner</p>
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