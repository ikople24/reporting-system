import axios from "axios";

export const listStats = async(token) => {

  return await axios.get("http://localhost:4000/api/stats", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};