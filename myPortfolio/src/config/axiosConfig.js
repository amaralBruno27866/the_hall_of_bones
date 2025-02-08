import axios from 'axios';

const token = localStorage.getItem('token') || import.meta.env.VITE_API_TOKEN;

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }
});

// Interceptar respostas 401 e redirecionar para a página de login
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login'; // Redirecionar para a página de login
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;