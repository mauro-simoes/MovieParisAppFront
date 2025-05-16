import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  // You can add headers or interceptors here if needed
});

export default api; 