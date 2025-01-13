import axios from 'axios';
import { UserState } from '../../types/user';

const API_BASE_URL = 'https://your-api-endpoint.com'; // Replace with your backend API

export const saveUserData = async (userData: UserState) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user-data`, userData);
    return response.data;
  } catch (error) {
    console.error('Failed to save user data:', error);
    throw error;
  }
};

export const fetchUserData = async (userId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user-data/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    throw error;
  }
};

