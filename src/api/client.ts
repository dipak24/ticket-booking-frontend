import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL } from '@/constants/config';

// Create axios instance
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add timestamp to prevent caching
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        _t: Date.now()
      };
    }

    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    console.log(
      `[API Response] ${response.config.method?.toUpperCase()} ${
        response.config.url
      } - ${response.status}`
    );
    return response;
  },
  (error: AxiosError) => {
    console.error('[API Response Error]', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data
    });

    // Handle specific error cases
    if (error.response?.status === 409) {
      // Conflict - likely double booking or race condition
      throw new Error(
        'This action conflicts with another operation. Please try again.'
      );
    }

    if (error.response?.status === 404) {
      throw new Error('Resource not found.');
    }

    if (error.response?.status === 400) {
      const message =
        (error.response.data as any)?.message || 'Invalid request.';
      throw new Error(message);
    }

    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please check your connection.');
    }

    if (!error.response) {
      throw new Error('Network error. Please check your internet connection.');
    }

    throw error;
  }
);

export default apiClient;
