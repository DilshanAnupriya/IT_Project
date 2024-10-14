import axios from 'axios';

const API_URL = 'http://localhost:3000/api/adultcare/';  // Replace with your API base URL

// Fetch Profile Data
export const fetchProfileData = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};

// Fetch Residents Data
export const fetchResidents = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};

// Other API calls like add, edit, delete can also go here
