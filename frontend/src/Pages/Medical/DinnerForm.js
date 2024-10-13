import React, { useState } from 'react';
import axios from 'axios';

const DinnerForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/Dinner/add', {
        Nutrition_title: title,
        Nutrition_description: description,
      });
      alert('Dinner added successfully');
    } catch (error) {
      console.error('Error adding dinner:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Dinner</button>
    </form>
  );
};

export default DinnerForm;