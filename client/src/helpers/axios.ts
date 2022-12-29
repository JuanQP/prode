import axios from "axios";

export const LOCAL_STORAGE_JWT_NAME='_auth'

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(LOCAL_STORAGE_JWT_NAME)
    if (token && config.headers) {
      config.headers["Authorization"] =`Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
