import axios, { type AxiosInstance, AxiosError } from "axios";

// export const baseURL = import.meta.env.VITE_API_BASE_URL || "https://api.stg.legalclutch.com/api/v1";
export const baseURL = "http://localhost:8s000/api/v1";
// https://api.stg.legalclutch.com/api/v1
//  const baseURL = "https://staging.api.cw.smartimmigrant.com/api/v1";


const publicRequest: AxiosInstance = axios.create({ baseURL });

const privateRequest: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});



privateRequest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

privateRequest.interceptors.request.use(
  (res) => res,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

const instances = { publicRequest, privateRequest };

export default instances;

