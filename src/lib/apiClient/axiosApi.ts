import axios, { AxiosError, type AxiosResponse } from "axios";

const API_BASE_URL = "http://localhost:8080/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptors for dynamic headers (e.g., auth tokens)
apiClient.interceptors.request.use(
  (config) => {
    const userToken = localStorage.getItem("myUserToken");
    if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },

  (error: AxiosError) => {
    // redirect to login if 401 Unauthorized
    if (error?.response?.status === 401) {
      console.log("Unauthorized request, redirecting to login...");
    }
    return Promise.reject(error);
  }
);

export default apiClient