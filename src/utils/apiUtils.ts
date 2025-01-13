import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export const saveUserData = async (userId: string, data: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/save`, { userId, data });
    return response.data;
  } catch (error) {
    console.error('Error saving user data:', error);
    throw error;
  }
};

export const loadUserData = async (userId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/load/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error loading user data:', error);
    throw error;
  }
};

