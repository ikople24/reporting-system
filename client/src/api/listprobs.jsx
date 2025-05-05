// api/listprobs.js
import axios from "axios";

export const fetchListProbs = () => axios.get("/api/listprobs");
export const deleteListProb = (id) => axios.delete(`/api/listprobs/${id}`);
export const addListProb = (payload) => axios.post("/api/listprobs", payload);
export const updateListProb = (id, payload) => axios.put(`/api/listprobs/${id}`, payload);

