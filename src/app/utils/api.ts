import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  // You can add headers or interceptors here if needed
});

export default api; 