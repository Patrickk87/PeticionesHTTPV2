import axios from 'axios';

export const API_URL = import.meta.env.VITE_API_URL || 'https://peticioneshttpv2.onrender.com';

const api = axios.create({
  baseURL: API_URL,
  timeout: 5000
});

export default api;