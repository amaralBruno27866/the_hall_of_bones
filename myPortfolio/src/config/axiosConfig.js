import axios from 'axios';

const token = localStorage.getItem('token') || import.meta.env.VITE_API_TOKEN;

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }
});

export default axiosInstance;