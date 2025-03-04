import axios from 'axios';
import { useAuth } from '../auth';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/users',
  withCredentials: true,
});

// response Interceptor (Handles Expired Token)
api.interceptors.response.use(
  (response) => response, // ✅ return successful responses as is
  async (error) => {
    if (error.response?.status === 401) {
      try {
        // 1. attempt to refresh token
        const res = await axios.post(
          'http://127.0.0.1:8000/users/token/refresh/',
          {},
          { withCredentials: true }
        );

        // 2. retry the failed request with the new token
        return axios(error.config);
      } catch (refreshError) {
        // 3. refresh failed, log out the user
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
