// Importing the axios library to make HTTP requests
import axios from 'axios';

// Get the token from local storage or environment variable
// The token is used to authenticate requests to the API
const token = localStorage.getItem('token') || import.meta.env.VITE_API_TOKEN;

// Create an axios instance with default configuration
// This instance will be used throughout the application to make API calls
const axiosInstance = axios.create({
  // Base URL for the API
  // This is the root URL where all API requests will be sent
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    // Default content type for requests
    'Content-Type': 'application/json',
    // Authorization header with the token for secure API access
    Authorization: `Bearer ${token}`
  }
});

// Intercept responses to handle errors globally
// Specifically, handle cases where the user is unauthorized (401 status)
axiosInstance.interceptors.response.use(
  // If the response is successful, simply return it
  response => response,
  // If an error occurs, check if it's a 401 Unauthorized error
  error => {
    if (error.response && error.response.status === 401) {
      // If unauthorized, remove the token from local storage
      localStorage.removeItem('token');
      // Redirect the user to the login page to re-authenticate
      window.location.href = '/login';
    }
    // Reject the promise with the error so it can be handled elsewhere
    return Promise.reject(error);
  }
);

// Export the configured axios instance for use in other parts of the application
export default axiosInstance;