import axios, { AxiosInstance } from "axios";
import TokenManager from "./token.manager";

const backendClient: AxiosInstance = axios.create({
  baseURL: "https://backend-api.com",
  timeout: 10000,
});

backendClient.interceptors.request.use(
  async (config) => {
    const token = await TokenManager.getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

backendClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await TokenManager.getRefreshToken();
        if (refreshToken) {
          await TokenManager.refreshAccessToken(refreshToken);
          const newAccessToken = await TokenManager.getAccessToken();

          if (newAccessToken && originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          }

          return backendClient(originalRequest);
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default backendClient;
