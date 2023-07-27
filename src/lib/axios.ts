import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_API_URL;

const token = import.meta.env.VITE_API_TOKEN;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    Authorization: token,
  },
});

export default axiosInstance;
