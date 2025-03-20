import axios from 'axios';

// Get the token from local storage or environment variable
const token = localStorage.getItem('token') || import.meta.env.VITE_API_TOKEN;

// Create an axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api', // Base URL for the API
  headers: {
    'Content-Type': 'application/json', // Default content type
    Authorization: `Bearer ${token}` // Authorization header with the token
  }
});

// Intercept 401 responses and redirect to the login page
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token'); // Remove the token from local storage
      window.location.href = '/login'; // Redirect to the login page
    }
    return Promise.reject(error); // Reject the promise with the error
  }
);

export default axiosInstance;