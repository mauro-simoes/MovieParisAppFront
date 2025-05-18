import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true,
  // You can add headers or interceptors here if needed
});

// Add a request interceptor to include the access token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    console.log("token", token);
    if (token) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${token}`;
      console.log("config.headers", config.headers);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api; 