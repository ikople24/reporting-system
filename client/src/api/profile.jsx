import axiosInstance from "../lib/axiosInstance";

export const createProfile = async (data) => {
  return await axiosInstance.post("/profile", data);
};

