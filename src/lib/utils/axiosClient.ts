import axios from 'axios';

// Define the base URL for your API
export const API_BASE_URL = process.env.REACT_APP_API_ENDPOINT;

// Create an Axios instance with default configurations
const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to get the token from storage (e.g., localStorage, sessionStorage)
const getToken = () => {
  // Replace this with your actual token retrieval logic
  return localStorage.getItem('token');
};

// Interceptor to add the token to the request headers
axiosClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor to handle API response errors
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(`[${error.response.status}] ${error.response.data.message}`);
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Network error:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Export the Axios client for use in your API handlers
export default axiosClient;