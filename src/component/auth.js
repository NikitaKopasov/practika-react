// src/api/auth.js
import axios from 'axios';

const API_URL = 'http://localhost:7000/auth';

export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};

export const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/registration`, userData);
};
