import axios from "axios";

export const fetchListUseProbs = () => axios.get("/api/listuseprobs");
export const deleteListUseProb = (id) => axios.delete(`/api/listuseprobs/${id}`);
export const updateListUseProb = (id, payload) => axios.put(`/api/listuseprobs/${id}`, payload);
export const createListUseProb = (payload) => axios.post(`/api/listuseprobs`, payload);