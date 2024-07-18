import axios from 'axios';
import { useRouter } from 'vue-router';

// Create an axios instance
const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add a request interceptor
httpClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
httpClient.interceptors.response.use(
  (response) => {
    return response?.data;
  },
  (error) => {
    const router = useRouter();
    if (error.response.status === 401) {
      // Redirect to login or handle unauthorized access
      router.push('/login');
    }
    return Promise.reject(error);
  }
);

export default httpClient;
