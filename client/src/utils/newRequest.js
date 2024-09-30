import axios from "axios";

const newRequest = axios.create({
  baseURL:"http://localhost:8000/api" || "https://fiveer-app.onrender.com/api/",
  withCredentials: true,
});

export default newRequest;