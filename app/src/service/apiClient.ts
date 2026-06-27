import axios, { AxiosError } from 'axios';
import { BASE_URL } from './config.service';
import { getToken, setToken } from './storage';

export const apiClient = axios.create({
  baseURL: BASE_URL,
});

//Request Interceptor
apiClient.interceptors.request.use(
  async config => {
    const token = getToken('AccessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },

  error => Promise.reject(error),
);

// Response interceptor

apiClient.interceptors.response.use(
  response => response,
  async error => {
    if (error instanceof AxiosError) {
      if (error.response?.status === 403) {
        const refreshToken = getToken('RefreshToken');
        if (!refreshToken) {
          return Promise.reject(error.message);
        }
        try {
          const { data } = await axios.post(`${BASE_URL}/user/refresh`, {
            refreshToken,
          });
          setToken('RefreshToken', data?.newAccessToken);
          const failedRequest = error.config;
          if (!failedRequest) {
            return Promise.reject(error);
          }
          failedRequest.headers.Authorization = `Bearer ${data?.newAccessToken}`;
          return apiClient(failedRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  },
);
