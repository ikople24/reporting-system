import axiosInstance from "../lib/axiosInstance";

export const createProfile = async (data, token) => {
  return await axiosInstance.post("/profile", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


