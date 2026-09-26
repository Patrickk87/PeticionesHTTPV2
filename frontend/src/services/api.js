import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://peticioneshttpv2.onrender.com',
  timeout: 5000
});

export default api;