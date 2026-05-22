import axios from 'axios';

// Uses Next.js rewrites proxy — all /api/v1/* calls are forwarded to the FastAPI backend
export const apiClient = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const mlClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ML_API_URL || 'http://localhost:8001',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptors for Auth & Error Handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);
