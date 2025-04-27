import axios from "axios";
import { getToken } from "@clerk/clerk-react"; // import getToken ตรง ๆ

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api", // เปลี่ยนตาม backend URL
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getToken(); // ดึง token Clerk

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
