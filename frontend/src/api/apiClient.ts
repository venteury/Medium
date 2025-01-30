import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
