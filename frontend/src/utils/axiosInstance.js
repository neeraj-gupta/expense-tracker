import axios from 'axios';
import {
    BASE_URL
} from './apiPaths';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000, // Set a timeout of 10 seconds for requests
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the token in the headers
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    // Handle request error here if needed
    return Promise.reject(error);
});

// Add a response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle specific error responses here if needed
        if (error.response) {
            // Handle 401 Unauthorized error
            if (error.response.status === 401) {
                console.error('Unauthorized access - redirecting to login');
                window.location.href = '/login';
            } else if (error.response.status === 500) {
                console.error('Server Error');
            }
        } else if (error.code === 'ECONNABORTED') {
            // Handle timeout error
            console.error('Request Timeout Error. Please try again later.');
        }
        return Promise.reject(error);
    }
);


export default axiosInstance;