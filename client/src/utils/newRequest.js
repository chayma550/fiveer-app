import axios from "axios";

const newRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:5000/api", // Fallback to localhost:5000
  withCredentials: true,
});

export default newRequest;
